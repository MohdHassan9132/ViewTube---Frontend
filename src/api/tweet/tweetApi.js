import api from "../axiosInstance";

export const getUserTweetsApi = ({
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

export const createTweetApi =  formData => 
  api.post("/tweet/createTweet",formData,{
    headers:{"Content-Type": "multipart/form-data"},
  });

export const updateTweetApi = (tweetId,data) =>
  api.patch(`/tweet/updateTweet/${tweetId}`,data);

export const deleteTweetApi = tweetId =>
  api.delete(`/tweet/deleteTweet/${tweetId}`)