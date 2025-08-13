"use client";
import { formatDate } from "@/utils/formatDate";
import { Dot,  Share2 } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { BodyText, Heading } from "../Common/Typography";

export const FeaturedCard = ({ data }: { data: any }) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);



  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      const tooltip = tooltipRef.current;
      if (tooltip) {
        tooltip.style.visibility = "visible";
        tooltip.style.opacity = "1";

        setTimeout(() => {
          tooltip.style.opacity = "0";
          setTimeout(() => {
            tooltip.style.visibility = "hidden";
          }, 300); // matches transition
        }, 1500);
      }
    });
  };

  return data && (
    <div className="flex gap-6 items-start justify-between">
      <figure className="flex-1/2 h-[21.875rem] ">
        <Image
          width={600}
          height={350}
          src={`${data?.featuredImage}`}
          alt={data?.title}
          className="object-cover w-full h-full rounded-[.5rem]"
        />
      </figure>
      <div className="flex-1/2 ps-6 space-y-8">
        <div className="space-y-2">
          <div className="">
            <Heading
              variant="h3"
            >
              { data?.title }
            </Heading>
            <div className="flex gap-1 items-center ">
              <BodyText
                variant="small"
                
              >{data.author && data.author.fullName}</BodyText>
              <Dot className="text-essential-disabled" />
              <BodyText

                variant="small"
              >
                {formatDate(data?.dateCreated)}
              </BodyText>
            </div>
          </div>

          <BodyText
            variant="medium"
          >
            <span className="line-clamp-7 default-styles" dangerouslySetInnerHTML={{__html:data.content}}></span>
          </BodyText>
        </div>
        <Link href={`/press-release/${data.slug}`} className="w-full flex items-end justify-between">
          <Button
          className="md:py-3 rounded-sm cursor-pointer"
          >Read More</Button>
        </Link>
      </div>
    </div>
  );
};
