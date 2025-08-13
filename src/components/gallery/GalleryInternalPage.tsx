"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { BodyText, Heading } from "../Common/Typography";
import { fetchGalleryBySlug } from "@/api/gallery/gallery";
import { ChevronLeft, X } from "@untitled-ui/icons-react";
import { ChevronRight } from "lucide-react";

const IMAGES_PER_PAGE = 9;

export const GalleryInternalPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["gallery", slug],
    queryFn: () => fetchGalleryBySlug(slug),
  });

  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [imageLoadStates, setImageLoadStates] = useState<
    Record<number, boolean>
  >({});

  const images = data?.images || [];
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  const start = page * IMAGES_PER_PAGE;
  const pageImages = images.slice(start, start + IMAGES_PER_PAGE);

  // Preload adjacent images when modal opens or index changes
  useEffect(() => {
    if (modalOpen && currentIndex !== null) {
      const preloadIndexes = [currentIndex - 1, currentIndex + 1].filter(
        (i) => i >= 0 && i < images.length
      );

      preloadIndexes.forEach((index) => {
        if (!imageLoadStates[index]) {
          const img = new window.Image();
          img.src = `${process.env.NEXT_PUBLIC_API_HOST}${images[index].url}`;
          img.onload = () => {
            setImageLoadStates((prev) => ({ ...prev, [index]: true }));
          };
        }
      });
    }
  }, [modalOpen, currentIndex, images, imageLoadStates]);

  const openModal = (index: number) => {
    setCurrentIndex(start + index);
    setModalOpen(true);
  };

  const navigate = (dir: -1 | 1) => {
    if (currentIndex === null) return;
    const next = currentIndex + dir;
    if (next >= 0 && next < images.length) {
      setCurrentIndex(next);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (modalOpen) {
        if (e.key === "ArrowLeft") navigate(-1);
        if (e.key === "ArrowRight") navigate(1);
        if (e.key === "Escape") setModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [modalOpen, currentIndex]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading gallery.</p>;

  return (
    <section className="pb-20 pt-16 max-w-[80rem] mx-auto px-4">
      <div className="space-y-12">
        <div className="space-y-6 text-start max-w-xl">
          <Heading variant="h2">{data.title}</Heading>
          <BodyText variant="medium">{data.description}</BodyText>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pageImages.map((item: any, idx: any) => (
            <button
              key={item.id}
              className="h-[18rem] bg-line-1 rounded-lg overflow-hidden focus:outline-none hover:opacity-90 transition-opacity"
              onClick={() => openModal(idx)}
            >
              <Image
                width={600}
                height={600}
                className="w-full h-full object-cover object-top rounded-lg"
                src={item.url.startsWith("http")?item.url:`${process.env.NEXT_PUBLIC_API_HOST}${item.url}`}
                alt={item.altText || "gallery image"}
                priority={idx === 0} // Prioritize first image
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />
            </button>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded transition-colors ${
                  i === page
                    ? "bg-primary text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && currentIndex !== null && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="relative w-[90vw] max-w-4xl rounded-lg overflow-hidden">
            {/* Loading indicator */}
            {!imageLoadStates[currentIndex] && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            )}

            <Image
              src={
                images[currentIndex].url.startsWith("http")
                  ? images[currentIndex].url
                  : `${process.env.NEXT_PUBLIC_API_HOST}${images[currentIndex].url}`
              }
              alt={images[currentIndex].altText || "large gallery image"}
              width={1200}
              height={800}
              className="w-full h-auto object-contain bg-black"
              priority
              onLoad={() =>
                setImageLoadStates((prev) => ({
                  ...prev,
                  [currentIndex]: true,
                }))
              }
            />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 focus:outline-none cursor-pointer bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => setModalOpen(false)}
              aria-label="Close modal"
            >
              <X width={`1rem`} height={`1rem`} />
            </button>

            {/* Navigation buttons */}
            {currentIndex > 0 && (
              <button
                className="absolute cursor-pointer left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                onClick={() => navigate(-1)}
                aria-label="Previous image"
              >
                <ChevronLeft width={`1rem`} height={`1rem`} />
              </button>
            )}
            {currentIndex < images.length - 1 && (
              <button
                className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 focus:outline-none bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                onClick={() => navigate(1)}
                aria-label="Next image"
              >
                <ChevronRight width={`1rem`} height={`1rem`} />
              </button>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Hidden preload images */}
          {modalOpen &&
            [currentIndex - 1, currentIndex + 1].map(
              (index) =>
                index >= 0 &&
                index < images.length && (
                  <Image
                    key={`preload-${index}`}
                    src={
                      images[index].url.startsWith("http")
                        ? images[index].url
                        : `${process.env.NEXT_PUBLIC_API_HOST}${images[index].url}`
                    }
                    alt=""
                    width={1200}
                    height={800}
                    className="hidden"
                    priority={Math.abs(index - currentIndex) === 1}
                  />
                )
            )}
        </div>
      )}
    </section>
  );
};
