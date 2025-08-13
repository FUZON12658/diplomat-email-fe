import { ambclubAxios } from "..";

export const getQrContactsUsingSlug = async (slug: any) => {
 const { data } = await ambclubAxios.get(`/api/v1/slug/qrcontact/${slug}`);
 return data; 
}