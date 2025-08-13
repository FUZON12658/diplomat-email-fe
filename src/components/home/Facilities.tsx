"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BodyText, Heading } from "../Common/Typography";
import { ArrowRight } from "lucide-react";
import { ArrowNarrowRight } from "@untitled-ui/icons-react";

export const Facilities = ({
  className,
  numberOfItemsToDisplay = -1,
}: {
  className?: string;
  numberOfItemsToDisplay?: number;
}) => {
  const serviceItems = [
    {
      id: "1",
      image: "/home/membership.jpg",
      link: "/members",
      title: "Membership",
      subtitle: "Join Our Diplomatic Community",
      description:
        "Become part of an exclusive network of diplomats, professionals, and leaders fostering international relations and cultural exchange.",
    },
    {
      id: "2",
      image: "/home/social.jpg",
      title: "Social Work",
      link: "/social-work",
      subtitle: "Global Diplomatic Network",
      description:
        "Explore our extensive network of participating nations and their diplomatic missions contributing to Nepal's international relations.",
    },
    {
      id: "3",
      image: "/home/irgdd.jpg",
      title: "Global Dialogues & Exchanges",
      link: "https://irgdd.com",
      subtitle: "Voices from around the world",
      description:
        "We bring together voices from around the world through conferences, forums, and cultural exchanges.",
    },
    {
      id: "4",
      image: "/home/events.JPG",
      title: "Media for Diplomacy",
      link: "https://diplomatnepal.com",
      subtitle: "Support Diplomatic Excellence",
      description:
        "The Diplomat Nepal is our official media house, featuring a monthly magazine and a dynamic online daily news portal.",
    },
  ];

  const filteredServiceItems =
    numberOfItemsToDisplay !== -1 &&
    numberOfItemsToDisplay < serviceItems.length
      ? serviceItems.slice(0, numberOfItemsToDisplay)
      : serviceItems;

  return (
    <div className={`w-full bg-white ${className}`}>
      <div className="mx-3 h-full rounded-[1.25rem] pt-15 pb-24">
        <div className="w-[80rem] mx-auto max-w-full md:max-w-none px-4 md:px-0">
          <div className="topLayer">
            <div className="topBottomLayer flex items-center justify-between mt-6 flex-col md:flex-row gap-6 md:gap-0">
              <Heading variant="h2">Diplomacy In Motion</Heading>
              <div className="right w-full md:w-[30rem]">
                <BodyText variant="medium">
                  From membership to partnerships—we build bridges for
                  diplomatic excellence, cultural exchange, and international
                  cooperation in Nepal.
                </BodyText>
              </div>
            </div>
          </div>
          <div className="contentLayer mt-20 overflow-x-auto md:overflow-x-visible">
            <div className="flex gap-4 w-max md:w-full">
              {filteredServiceItems.map((item: any, index: number) => {
                return (
                  <Link
                    href={item.link}
                    key={item.id}
                    className="w-[19rem] h-[19rem] rounded-md relative overflow-hidden group cursor-pointer flex-shrink-0"
                  >
                    {/* Background Image */}
                    <div className="w-full bg-black/60 h-full relative">
                      <Image
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        fill
                        src={item.image}
                        alt={item.title}
                      />
                      {/* Default title overlay */}
                      <Heading
                        variant="h6"
                        className="text-white absolute bottom-10 left-10 transition-opacity duration-300 group-hover:opacity-0"
                      >
                        {item.title}
                      </Heading>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 flex flex-col justify-center p-8">
                      <Heading variant="h6" className="text-gray-900 mb-2">
                        {item.title}
                      </Heading>
                      <BodyText
                        variant="small"
                        className="text-gray-700 mb-1 font-semibold"
                      >
                        {item.subtitle}
                      </BodyText>
                      <BodyText
                        variant="small"
                        className="text-gray-600 mb-6 leading-relaxed"
                      >
                        {item.description}
                      </BodyText>
                      <Link
                        href={item.link}
                        className="py-2 hover:scale-105 active:scale-90 duration-200 ease-in-out transition-all w-[10.5rem] bg-border-primary-dark-gradient text-base leading-6 text-on-surface-black cursor-pointer px-4 gap-4 flex items-center justify-center"
                      >
                        <span>Explore More </span>
                        <ArrowNarrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
