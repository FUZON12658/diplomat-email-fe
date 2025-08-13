"use client";
import { useQuery } from "@tanstack/react-query";
import { GalleryCard } from "./GalleryCard";
import { Heading } from "../Common/Typography";
import { fetchGalleryDataApi } from "@/api/gallery/gallery";


const data = [
  {
    image: "https://picsum.photos/3840/2160",
    title: "Gallery Section Title",
    desc: "Dr. Koirala talks about the incompetance of the current dals or this is the description of the video",
    slug: "gallery-section-title",
  },
  {
    image: "https://picsum.photos/3840/2160",
    title: "Gallery Section Title",
    desc: "Dr. Koirala talks about the incompetance of the current dals or this is the description of the video",
    slug: "gallery-section-title",
  },
  {
    image: "https://picsum.photos/3840/2160",
    title: "Gallery Section Title",
    desc: "Dr. Koirala talks about the incompetance of the current dals or this is the description of the video",
    slug: "gallery-section-title",
  },
  {
    image: "https://picsum.photos/3840/2160",
    title: "Gallery Section Title",
    desc: "Dr. Koirala talks about the incompetance of the current dals or this is the description of the video",
    slug: "gallery-section-title",
  },
  {
    image: "https://picsum.photos/3840/2160",
    title: "Gallery Section Title",
    desc: "Dr. Koirala talks about the incompetance of the current dals or this is the description of the video",
    slug: "gallery-section-title",
  },
  {
    image: "https://picsum.photos/3840/2160",
    title: "Gallery Section Title",
    desc: "Dr. Koirala talks about the incompetance of the current dals or this is the description of the video",
    slug: "gallery-section-title",
  },
  {
    image: "https://picsum.photos/3840/2160",
    title: "Gallery Section Title",
    desc: "Dr. Koirala talks about the incompetance of the current dals or this is the description of the video",
    slug: "gallery-section-title",
  },
  {
    image: "https://picsum.photos/3840/2160",
    title: "Gallery Section Title",
    desc: "Dr. Koirala talks about the incompetance of the current dals or this is the description of the video",
    slug: "gallery-section-title",
  },
  {
    image: "https://picsum.photos/3840/2160",
    title: "Gallery Section Title",
    desc: "Dr. Koirala talks about the incompetance of the current dals or this is the description of the video",
    slug: "gallery-section-title",
  },
];

export const AllGallery = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["galleries"],
    queryFn: fetchGalleryDataApi,
  });

  if(isLoading||isError||!data){
    return <div>Loading...</div>
  }

  return (
    <section className="py-20 w-[80rem] mx-auto">

        <div className="space-y-6">
          <Heading
            variant="h2"
          >
            Gallery
          </Heading>
          <div className="grid grid-cols-3 gap-6">
            {data &&  data?.map((item: any, idx: number) => {
              return (
                <GalleryCard
                  gallery
                  key={idx}
                  data={item}
                />
              );
            })}
          </div>
        </div>
    </section>
  );
};