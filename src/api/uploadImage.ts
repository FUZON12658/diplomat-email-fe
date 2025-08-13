// import axios from "axios";
// const CLOUDFRONT_URL = "https://dsawdtb87ya57.cloudfront.net";
// export const uploadImageApi = async (image:any) => {
//   try {
//     // First, get the pre-signed URL
//     const urlResponse = await axios.post(
//       "http://localhost:3000/api/v1/generate-upload-url",
//       {
//         fileName: image.name,
//         fileType: image.type
//       }
//     );
//     console.log(image);
//     // Extract the pre-signed URL
//     const { url } = urlResponse.data;

//     // Upload the file directly to S3 using the pre-signed URL
//     await axios.put(url, image, {
//       headers: {
//         'Content-Type': image.type
//       }
//     });
//     const s3Path = url.split('.com/')[1].split('?')[0];  // Get the path without query parameters
//     const cloudFrontUrl = `${CLOUDFRONT_URL}/${s3Path}`;
//     // Return the URL where the file was uploaded
//     console.log(cloudFrontUrl);
//     return { url: cloudFrontUrl };
    
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     throw new Error("Image upload failed");
//   }
// };


import { ambclubAxios } from ".";
export const uploadImageApi = async (images: File[] | File): Promise<{ url: string }> => {
  try {
    // If a single file is passed, convert it to an array
    const filesArray = Array.isArray(images) ? images : [images];

    // Prepare FormData for the request
    const formData = new FormData();
    filesArray.forEach((image) => {
      formData.append("images", image); // Append each image to FormData
    });

    // Make the POST request to your backend's /upload-image endpoint
    const response = await ambclubAxios.post("/api/v1/upload-image-profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Tell the backend we're sending files
      },
      withCredentials: true,
    });
    
    const finalReturningData = response.data.map((data:any)=>({url:`${process.env.NEXT_PUBLIC_API_HOST}${data.url}`}));
    console.log(finalReturningData);
    // Return the array of image URLs received from the backend
    return finalReturningData[0]; // Assuming backend returns the image URLs in the response body

  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Image upload failed");
  }
};
