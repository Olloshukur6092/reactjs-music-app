import { FC, Fragment, useEffect, useRef, useState } from "react";
import { MdRepeat, MdVolumeOff, MdVolumeUp } from "react-icons/md";

import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { Link } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { RiExternalLinkLine } from "react-icons/ri";
import { BsYoutube } from "react-icons/bs";
import Slider from "./Slider";
import Spinner from "./Spinner";
import { formatDuration } from "../shared/utils";
import { getTrackInfo } from "../services/track";
import { useContext } from "react";
import useSWR from "swr";

const Player: FC = () => {
  const { playerId, setIsPlayerIdChanged } = useContext(PlayerContext);

  const { data, error } = useSWR(`track-${playerId}`, () =>
    getTrackInfo(playerId)
  );

  const isLoading = !data;
  const isError = data && (error || !data.preview_url);

  const [isPaused, setIsPaused] = useState(!setIsPlayerIdChanged);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(
    Number(localStorage.getItem("minizing-volume")) || 0.5
  );
  const [isMuted, setIsMuted] = useState(
    !!Number(localStorage.getItem("minizing-muted")) || false
  );
  const [isLoop, setIsLoop] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isPaused) audioRef.current?.pause();
    else audioRef.current?.play().catch(() => setIsPaused(true));
  }, [isPaused]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    localStorage.setItem("minizing-volume", String(volume));
    localStorage.setItem("minizing-muted", String(+isMuted));
  }, [volume, isMuted]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setIsPaused((prev) => !prev);
      }
    };

    const spacePressedHandler = (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault();
    };

    window.addEventListener("keyup", handler);
    window.addEventListener("keydown", spacePressedHandler);

    return () => {
      window.removeEventListener("keyup", handler);
      window.removeEventListener("keydown", spacePressedHandler);
    };
  }, []);

  const h1 = useRef<HTMLHeadingElement>(null);
  const p = useRef<HTMLParagraphElement>(null);

  const redirectYoutube = () => {
    // console.log(h1.current?.innerText, p.current?.innerText);
    let url = h1.current?.innerText + " " + p.current?.innerText;
    window.open(`https://www.youtube.com/results?search_query=${url}`);
  }


  return (
    <>
      {data?.preview_url !== null ? (
        <audio
          ref={audioRef}
          onTimeUpdateCapture={() => {
            if (audioRef.current) {
              setCurrentTime(audioRef.current.currentTime);
            }
          }}
          onLoadedDataCapture={() => {
            if (audioRef.current) {
              setCurrentTime(0);
              setDuration(audioRef.current.duration);
            }
          }}
          onEndedCapture={() => {
            if (!isLoop) {
              setCurrentTime(0);
              setIsPaused(true);
            }
          }}
          className="hidden"
          hidden
          src={data?.preview_url}
          loop={isLoop}
          autoPlay={false}
        ></audio>
      ) : (
        ""
      )}

      <div className="sticky bottom-0 left-0 right-0 h-20 flex items-center bg-dark border-t-2 border-gray-800 px-[5vw]">
        <div className="flex-1 flex justify-start gap-3 items-center">
          {!isLoading && !isError && (
            <>
              <img
                className="w-14 h-14 object-cover"
                src={data.album?.images?.[0]?.url}
                alt=""
              />
              <div className="hidden md:block">
                <h1 ref={h1} className="line-clamp-1">{data.name}</h1>
                <p ref={p} className="text-gray-400 line-clamp-1">
                  {data.artists.map((artist, index) => (
                    <Fragment key={artist.id}>
                      {index !== 0 && <span>, </span>}
                      <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                    </Fragment>
                  ))}
                </p>
              </div>
            </>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-5">
            <button
              data-tooltips={isLoop ? "Disable repeat" : "Enable repeat"}
              onClick={() => setIsLoop(!isLoop)}
              disabled={isLoading || isError}
            >
              <MdRepeat
                className={`${isLoop ? "fill-sky-500" : "fill-white"} w-5 h-5`}
              />
            </button>
            <button
              data-tooltips={
                isError
                  ? "Error"
                  : isLoading
                  ? "Loading"
                  : isPaused
                  ? "Play"
                  : "Pause"
              }
              disabled={isLoading || isError}
              className={`h-8 w-8 border rounded-full flex justify-center items-center ${
                isError ? "border-red-500" : ""
              }`}
              onClick={() => setIsPaused((prev) => !prev)}
            >
              {isError ? (
                <span className="text-red-500">{`!`}</span>
              ) : isLoading ? (
                <Spinner />
              ) : isPaused ? (
                <FaPlay className="fill-white w-3 h-3" />
              ) : (
                <IoMdPause className="fill-white w-3 h-3" />
              )}
            </button>
            <a
              data-tooltips="Open in Spotify"
              href={data?.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className={
                (isLoading || isError) && !data?.external_urls.spotify
                  ? "pointer-events-none"
                  : ""
              }
            >
              <RiExternalLinkLine className="fill-white w-5 h-5" />
            </a>
            <span onClick={redirectYoutube} className="text-red-600 cursor-pointer">
              <BsYoutube />
            </span>
          </div>
          <div
            className={`hidden md:flex justify-center items-center gap-4 text-sm w-full ${
              isLoading || isError ? "pointer-events-none" : ""
            }`}
          >
            <span className="flex-shrink-0">
              {formatDuration(currentTime * 1000)}
            </span>
            <Slider
              className="flex-grow max-w-[400px]"
              width={duration !== 0 ? (currentTime / duration) * 100 : 0}
              setWidth={(val: number) => {
                setCurrentTime((val / 100) * duration);
                if (audioRef.current) {
                  audioRef.current.currentTime = (val / 100) * duration;
                }
              }}
            />
            <span className="flex-shrink-0">
              {formatDuration(duration * 1000)}
            </span>
          </div>
          
        </div>
        
        <div className="flex-1 flex justify-end items-center gap-3">
          {!isLoading && !isError && (
            <>
              <button
                data-tooltips={isMuted || volume === 0 ? "Unmute" : "Mute"}
                onClick={() => {
                  if (volume === 0) {
                    setIsMuted(false);
                    setVolume(1);
                  } else setIsMuted((prev) => !prev);
                }}
              >
                {isMuted || volume === 0 ? (
                  <MdVolumeOff className="fill-white w-5 h-5" />
                ) : (
                  <MdVolumeUp className="fill-white w-5 h-5" />
                )}
              </button>
              <div className="hidden md:block">
                <Slider
                  className="w-[100px]"
                  width={isMuted ? 0 : volume * 100}
                  setWidth={(val: number) => {
                    setVolume(val / 100);
                    setIsMuted(false);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
