import { ambclubAxios } from "..";

export const logoutApi = async () => {
  const { data } = await ambclubAxios.post("/api/v1/user/logout");
  return data;
};

export const getUserApi = async() => {
  const { data } = await ambclubAxios.get('/api/v1/user');
  return data;
}