import axios from "../utils/axiosCustomize";

const postLogin = (userName, password) => {
  const data = new FormData();
  data.append("userName", userName);
  data.append("password", password);
  return axios.post(`/api/Auth/login`, data);
};

const postForgotPassword = (email, newPassword, confirmPassword) => {
  return axios.post(`/v1/api/forgot-password`, {
    email,
    newPassword,
    confirmPassword,
  });
};

const postRegister = (
  fullName,
  iD_Number,
  phone,
  email,
  gender,
  birthday,
  image,
  username,
  password
) => {
  const data = new FormData();
  data.append("fullName", fullName);
  data.append("iD_Number", iD_Number);
  data.append("phone", phone);
  data.append("email", email);
  data.append("gender", gender);
  data.append("birthday", birthday);
  data.append("image", image);
  data.append("username", username);
  data.append("password", password);
  return axios.post(`/api/Auth/signup`, data);
};

const postLogout = () => {
  return axios.post(`/v1/api/logout`);
};

const putChangeProfile = (id, name, email, address, gender, phone, image) => {
  const data = new FormData();
  data.append("name", name);
  data.append("email", email);
  data.append("address", address);
  data.append("gender", gender);
  data.append("phone", phone);
  data.append("image", image);
  return axios.put(`/v1/api/change-profile?id=${id}`, data);
};

const putChangePassword = (id, oldPassword, newPassword, confirmPassword) => {
  const data = new FormData();
  data.append("oldPassword", oldPassword);
  data.append("newPassword", newPassword);
  data.append("confirmPassword", confirmPassword);
  return axios.put(`/v1/api/change-password?id=${id}`, data);
};

export {
  postLogin,
  postLogout,
  putChangeProfile,
  putChangePassword,
  postRegister,
  postForgotPassword,
};
