import { ambclubAxios } from "..";

export const fetchGalleryDataApi = async(data:any)=>{
  const response = await ambclubAxios.get('/api/v1/gallery');
  return response.data.mainData;
}

export const fetchGalleryBySlug = async(slug:any)=>{
  const response = await ambclubAxios.get(`/api/v1/slug/gallery/${slug}`);
  return response.data;
}

export const fetchArtilcesBySlug = async(slug:any)=>{
  const response = await ambclubAxios.get(`/api/v1/articles/slug/${slug}`);
  return response.data.data;
}