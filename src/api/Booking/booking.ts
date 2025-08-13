import { ambclubAxios } from "..";

export const saveBookingFormDataApi = async (data:any) => {
  const response = await ambclubAxios.post('/api/v1/booking', data);
  return response.data
}

export const getBookedSlots = async(date:string)=>{
  const response = await ambclubAxios.get('/api/v1/booked-slots', {
    params:{
      date: date
    }
  })
  return response;
}