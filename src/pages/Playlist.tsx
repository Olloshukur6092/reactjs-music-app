import { FC, useContext } from "react";
import { BsYoutube } from "react-icons/bs";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { PlayerContext } from "../context/PlayerContext";
import { formatDuration } from "../shared/utils";
import { getPlaylistInfo } from "../services/playlist";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Title } from "../utils/Title";
// import axios from "axios";

const Playlist: FC = () => {
  Title('SongS - Playlist!')

  const { setPlayerId, setIsPlayerIdChanged } = useContext(PlayerContext);

  const { id } = useParams();
  const { error, data } = useSWR(`playlist-${id}`, () =>
    getPlaylistInfo(id as string)
  );
  console.log(data);

  // const [url, setUrl] = useState("");
  

  const fetchY = (track :any) => {
    let arString = "";
    track.artists.forEach((artist :any) => {
      arString += artist.name + " ";
    })

    let url = track.name + " " + arString;
    window.open(`https://www.youtube.com/results?search_query=${url}`)
  }

  if (error) return <Error />;

  if (!data) return <Loader />;

  return (
    <div className="mx-[5vw] my-10 flex flex-col md:flex-row items-start gap-10">
      <div className="flex-shrink-0 md:sticky top-10 flex flex-col items-center w-full md:w-auto">
        <img
          className="w-[300px] h-[300px] object-cover"
          src={data.images?.[0]?.url}
          alt=""
        />
        <h1 className="text-center text-2xl font-semibold my-3">{data.name}</h1>
        <div className="flex flex-wrap justify-center text-gray-400">
          {data.owner.display_name}
        </div>
      </div>

      <div className="flex-grow w-full md:w-auto">
        {data.tracks.items
          .filter((track) => track.track)
          .map(({ track }, index) => (
            <button
              key={track.id}
              onClick={() => {
                setPlayerId(track.id);
                setIsPlayerIdChanged(true);
              }}
              className="w-full flex justify-between items-center p-2 text-left bg-dark hover:bg-dark-hovered transition duration-300"
            >
              <div className="flex items-center gap-5">
                <div className="text-xl text-gray-400 w-5 text-right">
                  {index + 1}
                </div>
                <div>
                  <h1 className="font-medium">{track.name}</h1>
                  <p className="text-slate-400">
                    {(track as any).artists
                      .map((artist: any) => artist.name)
                      .join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <span className="mr-3 text-red-600" onClick={() => fetchY(track)}>
                  <BsYoutube />
                </span>
                <span>
                  {formatDuration(track.duration_ms)}
                </span>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Playlist;
