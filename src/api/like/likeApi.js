import api from "../axiosInstance";

export const getLikedVideosApi = () =>
  api.get("/like/getLikedVideos");

export const toggleVideoLikeApi = videoId =>
  api.post(`/like/toggleVideoLike/${videoId}`);

export const toggleTweetLikeApi = tweetId =>
  api.post(`/like/toggleTweetLike/${tweetId}`);