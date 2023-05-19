import { FC, useContext } from "react";

import DataGrid from "../components/DataGrid";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { PlayerContext } from "../context/PlayerContext";
import { formatNumber } from "../shared/utils";
import { getArtistInfo } from "../services/artist";
import { useParams } from "react-router-dom";
import useSWR from "swr";

const Artist: FC = () => {
  const { setPlayerId, setIsPlayerIdChanged } = useContext(PlayerContext);

  const { id } = useParams();

  const { data, error } = useSWR(`artist-${id}`, () =>
    getArtistInfo(id as string)
  );
  console.log(data)

  if (error) return <Error />;

  if (!data) return <Loader />;

  return (
    <div className="mx-[5vw] mb-5">
      <div className="flex flex-col md:flex-row items-center mt-8 gap-10">
        <img
          className="w-[250px] h-[250px] rounded-full"
          src={data.artist?.images?.[0]?.url}
          alt=""
        />
        <div className="flex flex-col justify-center md:items-start gap-3">
          <h1 className="text-4xl md:text-5xl text-center md:text-left font-semibold">
            {data.artist.name}
          </h1>
          <p className="text-xl text-center md:text-left">
            {formatNumber(data.artist.followers.total)} followers
          </p>
          <p className="text-xl text-center md:text-left">
            Popularity: {data.artist.popularity} / 100
          </p>
        </div>
      </div>

      <h1 className="mt-5 mb-3 text-2xl">Top Tracks</h1>

      <DataGrid
        type="button"
        handler={(id: string) => {
          setPlayerId(id);
          setIsPlayerIdChanged(true);
        }}
        data={data.topTracks.tracks
          .filter((track) => track.name)
          .map((track) => ({  
            
            id: track.id,
            image: (track as any)?.album?.images?.[0]?.url,
            title: track.name,
            description: track?.artists.map((artist) => artist.name).join(", "),
          }))}
      />

      <h1 className="mt-5 mb-3 text-2xl">Albums</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/album/${id}`}
        data={data.albums.items
          .filter((album) => album.name)
          .map((album) => ({
            id: album.id,
            image: album.images?.[0]?.url,
            title: album.name,
            description: (album as any)?.artists
              ?.map((artist: any) => artist?.name)
              ?.join(", "),
          }))}
      />

      <h1 className="mt-5 mb-2 text-2xl">Related Artists</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/artist/${id}`}
        data={
          data.relatedArtists.artists
            .filter((artist) => artist.name)
            .map((artist) => ({
              id: artist.id,
              image: artist.images?.[0]?.url,
              title: artist.name,
              description: `${formatNumber(artist.followers.total)} followers`,
            })) as any
        }
      />
    </div>
  );
};

export default Artist;
