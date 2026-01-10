import api from "../axiosInstance";

export const fetchCommentsApi = videoId =>
  api.get(`/comment/getVideoComments/${videoId}`);

export const addCommentApi = (videoId, content) =>
  api.post(`/comment/addcomment/${videoId}`, { content });

export const deleteCommentApi = (videoId, commentId) =>
  api.delete(`/comment/deleteComment/${videoId}/${commentId}`);

export const updateCommentApi = (videoId, commentId, content) =>
  api.patch(`/comment/updateComment/${videoId}/${commentId}`, { content });
