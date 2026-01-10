import api from "../axiosInstance";

export const getUserPlaylistsApi = userId =>
  api.get(`/playlist/getUserPlaylists/${userId}`);
