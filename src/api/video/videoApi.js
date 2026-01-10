import api from "../axiosInstance";

export const publishVideoApi = formData =>
  api.post("/video/publishAVideo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getAllVideosApi = (params = {}) =>
  api.get("/video/getAllVideos", { params });

export const getVideoByIdApi = videoId =>
  api.get(`/video/getVideoById/${videoId}`);

export const updateVideoApi = (videoId, data) =>
  api.patch(`/video/updateVideo/${videoId}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteVideoApi = videoId =>
  api.delete(`/video/deleteVideo/${videoId}`);

export const togglePublishStatusApi = videoId =>
  api.patch(`/video/togglePublishStatus/${videoId}`);

export const recordVideoViewApi = videoId =>
  api.post(`/video/recordVideoView/${videoId}`);
