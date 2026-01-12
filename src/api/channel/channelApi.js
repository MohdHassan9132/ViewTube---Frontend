import api from "../axiosInstance";

// Profile (by username)
export const getChannelProfileApi = username =>
  api.get(`/user/getUserChannelProfile/${username}`);

// Channel Videos (by userId)
export const getChannelVideosApi = (userId, sortBy = "views") =>
  api.get("/video/getAllVideos", {
    params: { userId, sortBy }
  });

// Channel Playlists (by userId)
export const getChannelPlaylistsApi = userId =>
  api.get(`/playlist/getUserPlaylists/${userId}`);

// Channel Tweets (by userId)
export const getChannelTweetsApi = ({
  userId,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortType = "desc",
  query = ""
}) =>
  api.get(`/tweet/getUserTweets`, {
    params: { userId, page, limit, sortBy, sortType, query }
  });

export const toggleChannelSubscriptionApi = channelId => 
  api.post(`/subscription/toggleSubscription/${channelId}`);
