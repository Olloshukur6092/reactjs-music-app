import client from "../shared/spotify-client";

export const getArtistInfo = async (id: string) => {
  const [artist, topTracks, albums, relatedArtists] = await Promise.all([
    client.getArtist(id),
    client.getArtistTopTracks(id, "VN"),
    client.getArtistAlbums(id),
    client.getArtistRelatedArtists(id),
  ]);

  return { artist, topTracks, albums, relatedArtists };
};
