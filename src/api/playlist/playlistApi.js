import api from "../axiosInstance";

export const getUserPlaylistsApi = userId =>
  api.get(`/playlist/getUserPlaylists/${userId}`);

export const createPlaylistApi = (formdata) => 
  api.post(`/playlist/createPlaylist`,formdata,{
    headers:{"Content-Type": "multipart/form-data"},
  });

export const getUserPlaylistByIdApi = playlistId => 
  api.get(`/playlist/getPlaylistById/${playlistId}`);

export const addVideoToPlaylistApi = (playlistId,videoId) =>
  api.patch(`/playlist/addVideoToPlaylist/${videoId}/${playlistId}`);

export const removeVideoFromPlaylistApi = (playlistId,videoId) => api.patch(`/playlist/removeVideoFromPlaylist/${videoId}/${playlistId}`)

export const deletePlaylistApi = playlistId =>
  api.delete(`/playlist/deletePlaylist/${playlistId}`);

export const updatePlaylistApi = (playlistId,formdata) =>
  api.patch(`/playlist/updatePlaylist/${playlistId}`,formdata,
    {headers:{"Content-Type":"mutipart/form-data"}
  });