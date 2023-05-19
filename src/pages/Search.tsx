import { FC, useContext, useMemo } from "react";

import DataGrid from "../components/DataGrid";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { PlayerContext } from "../context/PlayerContext";
import { formatNumber } from "../shared/utils";
import { searchByKeywords } from "../services/search";
import { useLocation } from "react-router-dom";
import useSWR from "swr";

const Search: FC = () => {
  const { setPlayerId, setIsPlayerIdChanged } = useContext(PlayerContext);

  const location = useLocation();
  const { q } = useMemo(
    () => Object.fromEntries(new URLSearchParams(location.search)),
    [location.search]
  );

  const { data, error } = useSWR(`search-${q}`, () => searchByKeywords(q));

  if (error) return <Error />;

  if (!data) return <Loader />;

  return (
    <div className="mx-[5vw] mb-5">
      <h1 className="text-3xl mt-5">Search result for: {q}</h1>

      <h1 className="mt-5 mb-2 text-2xl">Artists</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/artist/${id}`}
        data={
          data.artists?.items
            .filter((artist) => artist.name)
            .map((artist) => ({
              id: artist.id,
              image: artist?.images?.[0]?.url,
              title: artist.name,
              description: `${formatNumber(artist.followers.total)} followers`,
            })) as any
        }
      />

      <h1 className="mt-5 mb-2 text-2xl">Tracks</h1>

      <DataGrid
        type="button"
        handler={(id: string) => {
          setPlayerId(id);
          setIsPlayerIdChanged(true);
        }}
        data={
          data.tracks?.items
            ?.filter((track) => track.name)
            .map((track) => ({
              id: track.id,
              image: (track as any)?.album?.images?.[0]?.url,
              title: track.name,
              description: track?.artists
                .map((artist) => artist.name)
                .join(", "),
            })) as any
        }
      />

      <h1 className="mt-5 mb-3 text-2xl">Albums</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/album/${id}`}
        data={
          data.albums?.items
            .filter((album) => album.name)
            .map((album) => ({
              id: album.id,
              image: album?.images?.[0]?.url,
              title: album.name,
              description: (album as any)?.artists
                ?.map((artist: any) => artist?.name)
                ?.join(", "),
            })) as any
        }
      />

      <h1 className="mt-10 mb-3 text-2xl">Playlists</h1>

      <DataGrid
        type="link"
        handler={(id: string) => `/playlist/${id}`}
        data={
          data.playlists?.items
            .filter((playlist) => playlist.name)
            .map((playlist) => ({
              id: playlist.id,
              image: playlist?.images[0]?.url,
              title: playlist.name,
              description: playlist?.owner?.display_name,
            })) as any
        }
      />
    </div>
  );
};

export default Search;
