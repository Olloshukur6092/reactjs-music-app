import client from "../shared/spotify-client";

export const getAlbumInfo = async (albumId: string) => {
  const album = await client.getAlbum(albumId);

  return album;
};
