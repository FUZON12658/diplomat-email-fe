'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, Award, Globe, Heart, BookOpen } from 'lucide-react';

export const InsideOurClub=()=> {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  const cards = [
    {
      id: 1,
      title: "Events & Diplomacy",
      subtitle: "High-Level Relations",
      category: "EXCLUSIVE",
      icon: <Globe className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      link: "#events"
    },
    {
      id: 2,
      title: "Social Work",
      subtitle: "Community Impact",
      category: "PREMIUM",
      icon: <Heart className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
      link: "#social"
    },
    {
      id: 3,
      title: "Training & Development",
      subtitle: "Diplomatic Excellence",
      category: "ELITE",
      icon: <BookOpen className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      link: "#training"
    },
    {
      id: 4,
      title: "Cultural Exchange",
      subtitle: "International Relations",
      category: "ROYAL",
      icon: <Award className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=250&fit=crop",
      link: "#culture"
    },
    {
      id: 5,
      title: "Leadership Forum",
      subtitle: "Strategic Governance",
      category: "PREMIER", 
      icon: <Users className="w-4 h-4" />,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      link: "#leadership"
    }
  ];

  const scrollLeft = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => Math.max(0, prev - 1));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const scrollRight = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => Math.min(cards.length - 4, prev + 1));
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < cards.length - 4;

  return (
    <div className="py-20 px-6 bg-[#17171C]" >
      <div className="max-w-7xl mx-auto">
        
        {/* Premium Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-3">
            <h2 className="font-diamend text-4xl md:text-5xl font-normal text-primary-dark-gradient">
              Diplomacy In Motion
            </h2>
            <div className="w-20 h-px bg-border-primary-dark-gradient"></div>
            <p className="font-sans text-base opacity-70 tracking-wide max-w-md" style={{ color: 'var(--color-on-surface-black)' }}>
              Diplomatic Excellence & Cultural Heritage
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex gap-3">
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`w-10 h-10 cursor-pointer rounded-full flex items-center justify-center transition-all duration-300 ${
                  canScrollLeft 
                    ? 'bg-border-primary-dark-gradient-hover text-white' 
                    : 'text-white opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 ${
                  canScrollRight 
          ? 'bg-border-primary-dark-gradient-hover text-white' 
                    : 'text-white opacity-50 cursor-not-allowed'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Premium Carousel */}
        <div className="relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ 
              transform: `translateX(-${currentIndex * 25}%)`,
              width: `${(cards.length / 4) * 100}%`
            }}
          >
            {cards.map((card) => (
              <div key={card.id} className="flex-shrink-0 w-1/4">
                <div className="cursor-pointer rounded-2xl overflow-hidden" style={{ backgroundColor: 'var(--color-surface-two)' }}>
                  
                  {/* Premium Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x250/f8f9fa/6c757d?text=${encodeURIComponent(card.title)}`;
                      }}
                    />
                    
                    {/* Premium Badge */}
               
                    
                    {/* Premium Icon */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>

                    {/* Premium Category Icon */}
                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary-dark-gradient">
                      {card.icon}
                    </div>
                  </div>
                  
                  {/* Premium Content */}
                  <div className="p-6 space-y-4 bg-black">
                    <div className="space-y-2">
                      <h3 className="font-diamend text-xl font-normal text-primary-dark-gradient line-clamp-1">
                        {card.title}
                      </h3>
                      <p className="font-sans text-sm opacity-70 line-clamp-2" style={{ color: 'var(--color-on-surface-black)' }}>
                        {card.subtitle}
                      </p>
                    </div>
                    
                    {/* Premium Separator */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    
                    {/* Premium CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-medium text-xs text-primary-dark-gradient">
                        Learn More
                      </span>
                
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`w-12 cursor-pointer h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
              canScrollLeft 
                ? 'hover:bg-border-primary-dark-gradient text-white' 
                : 'border border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`w-12 h-12 cursor-pointer  rounded-full flex items-center justify-center transition-all duration-300 ${
              canScrollRight 
                ? 'hover:bg-border-primary-dark-gradient text-white' 
                : 'border border-gray-300 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Premium Progress Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: Math.max(1, cards.length - 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-500 ${
                index === currentIndex 
                  ? 'w-8 h-2 bg-border-primary-dark-gradient rounded-full shadow-sm' 
                  : 'w-2 h-2 bg-gray-300 rounded-full'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}