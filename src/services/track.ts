import client from "../shared/spotify-client";

export const getTrackInfo = async (id: string) => {
  const track = await client.getTrack(id);
  return track;
};
