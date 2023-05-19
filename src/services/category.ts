import client from "../shared/spotify-client";

export const getCategoryInfo = async (id: string) => {
  const [playlists, category] = await Promise.all([
    client.getCategoryPlaylists(id),
    client.getCategory(id),
  ]);

  return {
    category,
    playlists: playlists.playlists,
  };
};
