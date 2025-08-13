'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MaxWidthWrapper from '../Common/MaxWidthWrapper';
import { JoinNow } from '../Common/animatedComponent/JoinNow';

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Array of background images - you can add more images here
  const backgroundImages = [
    '/herobg.jpg',
    '/home/1.jpg', // Add your additional images
    '/home/2.jpg',
    '/home/3.jpg',
    '/home/4.JPG', // Add your additional images
    '/home/5.JPG',
    '/home/6.JPG',
    '/home/7.JPG',
    '/home/8.JPG'
  ];

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [backgroundImages.length]);

  const goToSlide = (index:any) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? backgroundImages.length - 1 : prev - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
  };

  return (
    <div className="relative mt-[5.75rem] h-[100vh] md:h-[38.6875rem] overflow-hidden">
      <MaxWidthWrapper>
        <div className="md:space-y-[3.75rem] relative z-40 md:pt-[6.75rem]">
          <div className="contents-[''] w-full md:h-[.0625rem] bg-border-primary-dark-gradient" />
          <div className="pt-[7rem] md:pt-0 md:space-y-[3rem]">
            <div className="md:space-y-[1.5rem]">
              <h1 className="text-[2rem] leading-[2.5rem] md:text-[4rem] md:leading-[5rem] text-primary-dark-gradient font-diamend">
                Welcome to the Ambassadors Club
              </h1>
              <p className="font-medium text-lg md:text-lg md:leading-6 text-on-surface-white mt-4 md:mt-0">
                A non-partisan, shared platform for resident and non-resident
                Ambassadors, Heads of Mission, and Diplomats accredited to Nepal
                to foster diplomacy and cooperation.
              </p>
            </div>
            <div className="mt-12">
              <JoinNow text={`Explore About Us`} link='/about' />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Background Image Slider */}
      <div className="absolute h-full w-full top-0 left-0 z-0">
        <div className="absolute w-full h-full bg-black z-50 opacity-75"></div>
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              layout="fill"
              src={image}
              alt={`Hero background ${index + 1}`}
              className="w-full h-full object-cover"
              priority={index === 0} // Prioritize loading the first image
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 cursor-pointer top-1/2 transform -translate-y-1/2 z-60 bg-black/50  text-white p-3 rounded-full hover:bg-black hover:border hover:scale-110 active:scale-90 hover:border-white transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNextSlide}
        className="absolute right-4 cursor-pointer top-1/2 transform -translate-y-1/2 z-60 bg-black/50  text-white p-3 rounded-full hover:bg-black hover:border hover:scale-110 active:scale-90 hover:border-white transition-all duration-300"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-60 flex space-x-3">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-gray-600 bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};