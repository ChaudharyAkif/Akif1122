import API from "./axios";

export const RegisterApi = async (userData) => {
  return await API.post("/auth/register", userData);
};
export const LoginApi = async (userData) => {
  return await API.post("/auth/login", userData);
};
