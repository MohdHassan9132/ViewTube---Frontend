import api from "../axiosInstance";

// Auth
export const registerUserApi = form => api.post("/user/register", form);
export const loginUserApi = data => api.post("/user/login", data);
export const logoutUserApi = () => api.post("/user/logout");
export const refreshAccessTokenApi = () => api.post("/user/refreshAccessToken");

// User Profile
export const getUserApi = () => api.get("/user/getUser");
export const updateUserDetailsApi = data =>
  api.patch("/user/updateUserDetails", data);
export const changePasswordApi = data =>
  api.post("/user/changeCurrentPassword", data);

// Avatars / Cover
export const updateAvatarApi = form =>
  api.patch("/user/updateUserAvatar", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateCoverImageApi = form =>
  api.patch("/user/updateUserCoverImage", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Channel Profile
export const getUserChannelProfileApi = username =>
  api.get(`/user/getUserChannelProfile/${username}`);

// Watch History
export const getWatchHistoryApi = () =>
  api.get("/user/getUserWatchHistory");
