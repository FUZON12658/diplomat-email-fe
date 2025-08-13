import { ambclubAxios } from "..";

export const registerForMiniEventApi = async(data:any) => {
  const response = await ambclubAxios.post('/api/v1/mini-event-reg',data);
  return response.data;
} 

export const fetchLatestEventDataApi = async(data:any) => {
  const response = await ambclubAxios.get('/api/v1/articles');
  return response.data.mainData;
}

export const fetchArtilcesBySlug = async(slug:any)=>{
  const response = await ambclubAxios.get(`/api/v1/articles/slug/${slug}`);
  return response.data.data;
}

export const fetchLatestEventsDataApi = async(data:any) => {
  const response = await ambclubAxios.get('/api/v1/events');
  return response.data.mainData;
}

export const fetchEventsBySlug = async(slug:any)=>{
  const response = await ambclubAxios.get(`/api/v1/events/slug/${slug}`);
  return response.data.data;
}

export const fetchLatestSocialWorkDataApi = async(data:any) => {
  const response = await ambclubAxios.get('/api/v1/social-work');
  return response.data.mainData;
}

export const fetchSocialWorkBySlug = async(slug:any)=>{
  const response = await ambclubAxios.get(`/api/v1/social-work/slug/${slug}`);
  return response.data.data;
}

export const fetchLatestJobsDataApi = async(data:any) => {
  const response = await ambclubAxios.get('/api/v1/jobs');
  return response.data.mainData;
}

export const fetchJobsBySlug = async(slug:any)=>{
  const response = await ambclubAxios.get(`/api/v1/jobs/slug/${slug}`);
  return response.data.data;
}


export const submitJobApplication = async (applicationData: any) => {
  const response = await ambclubAxios.post("/api/v1/job-applications", applicationData );
  return response.data;
};