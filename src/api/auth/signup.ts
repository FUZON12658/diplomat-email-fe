import { ambclubAxios } from "..";


export const signupWithEmailApi = async ({
  firstName,
  lastName,
  email,
  password,
}:{
  firstName:string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const { data } = await ambclubAxios.post("/api/v1/users/email/signup", {
    fullName: `${firstName} ${lastName}`,
    email,
    password,
  });
  return data;
};

export const signupWithPhoneApi = async ({
  firstName,
  lastName,
  phoneNumber,
  password,
}:{
  firstName:string;
  lastName: string;
  phoneNumber: string;
  password: string;
}) => {
  const { data } = await ambclubAxios.post(
    "/api/v1/users/phone/signup",
    {
      fullName: `${firstName} ${lastName}`,
      phoneNumber,
      password,
    }
  );
  return data;
};
