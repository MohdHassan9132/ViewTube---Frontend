import api from "../axiosInstance";

export const publishVideoApi = (formData) => {
  return api.post("/video/publishAVideo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getAllVideosApi = (params = {}) => {
  return api.get("/video/getAllVideos", { params });
};

export const getVideoByIdApi = (videoId) => {
  return api.get(`/video/getVideoById/${videoId}`);
};

export const updateVideoApi = (videoId, formData) => {
  return api.patch(`/video/updateVideo/${videoId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteVideoApi = (videoId) => {
  return api.delete(`/video/deleteVideo/${videoId}`);
};

export const togglePublishStatusApi = (videoId) => {
  return api.patch(`/video/togglePublishStatus/${videoId}`);
};

export const recordVideoViewApi = (videoId) => {
  return api.post(`/video/recordVideoView/${videoId}`);
};
