import api from "../axiosInstance";

export const registerUserApi = (form) => api.post("/user/register", form);
export const loginUserApi = (data) => api.post("/user/login", data);
export const logoutUserApi = () => api.post("/user/logout");
export const getUserApi = () => api.get("/user/getUser");
export const refreshAccessTokenApi = () => api.post("/user/refreshAccessToken");
export const updateUserDetailsApi = (data) => {
  return api.patch("/user/updateUserDetails", data);
};
export const changePasswordApi = (data) => {
  return api.post("/user/changeCurrentPassword", data);
};
export const updateAvatarApi = (formData) => {
  return api.patch("/user/updateUserAvatar", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
export const updateCoverImageApi = (formData) => {
  return api.patch("/user/updateUserCoverImage", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
export const getUserChannelProfileApi = (username) => {
  return api.get(`/user/getUserChannelProfile/${username}`);
};
export const getWatchHistoryApi = () => {
  return api.get("/user/getUserWatchHistory");
};




