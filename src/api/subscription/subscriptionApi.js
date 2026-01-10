import api from "../axiosInstance";

export const toggleSubscriptionApi = channelId =>
  api.post(`/subscription/toggleSubscription/${channelId}`);

export const getSubscribedChannelsApi = () =>
  api.get("/subscription/getSubscribedChannels");
