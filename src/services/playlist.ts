import client from "../shared/spotify-client";

export const getPlaylistInfo = async (id: string) => {
  const playlist = await client.getPlaylist(id);
  return playlist;
};
