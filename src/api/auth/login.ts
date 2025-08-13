import { ambclubAxios } from "..";

export const loginAdminApi = async ({ username, password }:{username:string; password:string}) => {
  const { data } = await ambclubAxios.post("/api/v1/admin/login", {
    username,
    password,
  });
  return data;
};

export const loginApi = async ({ username, password }:{username:string; password:string}) => {
  const { data } = await ambclubAxios.post("/api/v1/users/login", {
    username,
    password,
  });
  return data;
};

export const getUserIdApi = async () => {
  const { data } = await ambclubAxios.get("/api/user");
  return data;
};

export const refreshTokenAdminApi = async () => {
  const { data } = await ambclubAxios.get("/api/v1/admin/refresh");
  return data;
};


export const refreshTokenApi = async () => {
  const { data } = await ambclubAxios.get("/api/v1/user/refresh");
  return data;
};
