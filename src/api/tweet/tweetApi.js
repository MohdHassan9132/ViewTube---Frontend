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
