import { ambclubAxios } from "..";

export const saveContactFormDataApi = async(data:any) => {
  const response = await ambclubAxios.post('/api/v1/contact',data);
  return response.data;
} 