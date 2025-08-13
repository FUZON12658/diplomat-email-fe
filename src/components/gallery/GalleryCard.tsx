// "use client";
// import { Dot } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRef } from "react";
// import { BodyText, Heading } from "../Common/Typography";
// import { Button } from "../ui/button";

// export const GalleryCard = ({
//   data,
//   buttonText,
//   greenHeading,
//   gallery = true,
//   dark,
// }: {
//   data: any;
//   buttonText: string;
//   greenHeading?: boolean;
//   gallery?: boolean;
//   dark?: boolean;
// }) => {
//   const tooltipRef = useRef<HTMLSpanElement>(null);

//   const handleCopy = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       const tooltip = tooltipRef.current;
//       if (tooltip) {
//         tooltip.style.visibility = "visible";
//         tooltip.style.opacity = "1";

//         setTimeout(() => {
//           tooltip.style.opacity = "0";
//           setTimeout(() => {
//             tooltip.style.visibility = "hidden";
//           }, 300); // matches transition
//         }, 1500);
//       }
//     });
//   };

//   return (
//     data && (
//       <div
//         className={`p-3 rounded-[.5rem] ${
//           dark ? "bg-bg-4" : "bg-essential-white"
//         } space-y-2`}
//       >
//         <figure className=" h-[13.4375rem] bg-line-1 rounded-[.5rem]  ">
//           <Image
//             width={350}
//             height={250}
//             src={(() => {
//               const image =
//                 data.images?.length > 0
//                   ? data.images[0].url
//                   : data.featuredImage;
//               return image.startsWith("http")
//                 ? image
//                 : `${process.env.NEXT_PUBLIC_API_HOST}${image}`;
//             })()}
//             alt={data.title || "abcd"}
//             className="object-cover w-full h-full rounded-[.5rem]"
//           />
//         </figure>
//         <div className=" p-2">
//           <div className="space-y-3">
//             <Heading variant="h4">{data?.title}</Heading>
//             <BodyText variant="small-trimmed" className="line-clamp-3">
//               {data?.description}
//             </BodyText>
//             {!gallery && data.author && (
//               <div className="flex gap-1 items-center ">
//                 <BodyText variant="small-trimmed">
//                   {data?.author.fullName}
//                 </BodyText>
//                 <Dot className="text-essential-disabled" />
//                 <BodyText variant="small-trimmed">{`Arpil 1`}</BodyText>
//               </div>
//             )}

//             <BodyText
//               variant="medium"
//               className="text-essential-black line-clamp-3 "
//             >
//               {data?.description}
//             </BodyText>
//           </div>
//           <Link
//             href={
//               gallery ? `/gallery/${data.slug}` : `/press-release/${data.slug}`
//             }
//             className="  flex items-center justify-between"
//           >
//             <Button className="w-[6.75rem] md:py-4 rounded-sm cursor-pointer">
//               See Gallery
//             </Button>
//           </Link>
//         </div>
//       </div>
//     )
//   );
// };

"use client";
import Image from "next/image";
import Link from "next/link";
import { BodyText, Heading } from "../Common/Typography";

export const GalleryCard = ({
  data,
  gallery = true,
}: {
  data: any;
  gallery?: boolean;
}) => {
  const img = data.images?.[0]?.url ?? data.featuredImage;
  const src = img.startsWith("http")
    ? img
    : `${process.env.NEXT_PUBLIC_API_HOST}${img}`;
  const href = gallery
    ? `/gallery/${data.slug}`
    : `/press-release/${data.slug}`;

  return (
    <Link href={href} className="block max-w-[24rem]">
      <div
        className="relative group rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300
                      border border-transparent hover:border-2 hover:border-amber-400 shine-hover"
      >
        {/* Portrait Image (16rem × 24rem) */}
        <div className="relative h-[24rem] w-[24rem] overflow-hidden">
          <Image
            src={src}
            alt={data.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 p-4">
            <Heading
              variant="h3"
              className="text-white text-[1.5rem] drop-shadow-lg line-clamp-3"
            >
              {data.title}
            </Heading>
            <BodyText
              variant="small-trimmed"
              className="text-white text-[1rem] line-clamp-2"
            >
              {data.description}
            </BodyText>
          </div>
        </div>

        {/* 45° Arrow */}
        <div
          className="absolute top-4 right-4 h-10 w-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center
                        transform rotate-45 transition-transform duration-300 group-hover:scale-110"
        >
          <svg
            className="h-5 w-5 transform -rotate-45 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};
