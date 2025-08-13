// 'use client';
// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { AnimatedText } from './Common/animatedComponent/AnimatedText';
// import MaxWidthWrapper from './Common/MaxWidthWrapper';


// export const allMagazines = [
//   {
//       "title": "Diplomat Nepal Issue #1",
//       "description": "Vogue Is A Globally-Recognized Magazine That Covers Fashion, Beauty, Culture, And Lifestyle. It’s Known For Its Innovative Editorial Design And Iconic Covers.",
//       "image": "https://diplomatnepal.com/wp-content/uploads/2025/05/Get-Your-Copy.png",
//       "read_link": "/read_magazine_url_1",
//       "download_link": "/download_magazine_url_1"
//   },
//   // {
//   //     "title": "Business Magazine",
//   //     "description": "Vogue Is A Globally-Recognized Magazine That Covers Fashion, Beauty, Culture, And Lifestyle. It’s Known For Its Innovative Editorial Design And Iconic Covers.",
//   //     "image": "https://diplomatnepal.com/wp-content/uploads/2025/05/Get-Your-Copy.png",
//   //     "read_link": "/read_magazine_url_2",
//   //     "download_link": "/download_magazine_url_2"
//   // },
//   // {
//   //     "title": "Vogue Magazine",
//   //     "description": "Vogue Is A Globally-Recognized Magazine That Covers Fashion, Beauty, Culture, And Lifestyle. It’s Known For Its Innovative Editorial Design And Iconic Covers.",
//   //     "image": "https://diplomatnepal.com/wp-content/uploads/2025/05/Get-Your-Copy.png",
//   //     "read_link": "/read_magazine_url_3",
//   //     "download_link": "/download_magazine_url_3"
//   // },
//   // {
//   //     "title": "Vogue Magazine",
//   //     "description": "Vogue Is A Globally-Recognized Magazine That Covers Fashion, Beauty, Culture, And Lifestyle. It’s Known For Its Innovative Editorial Design And Iconic Covers.",
//   //     "image": "https://diplomatnepal.com/wp-content/uploads/2025/05/Get-Your-Copy.png",
//   //     "read_link": "/read_magazine_url_4",
//   //     "download_link": "/download_magazine_url_4"
//   // },
//   // {
//   //     "title": "Vogue Magazine",
//   //     "description": "Vogue Is A Globally-Recognized Magazine That Covers Fashion, Beauty, Culture, And Lifestyle. It’s Known For Its Innovative Editorial Design And Iconic Covers.",
//   //     "image": "https://diplomatnepal.com/wp-content/uploads/2025/05/Get-Your-Copy.png",
//   //     "read_link": "/read_magazine_url_5",
//   //     "download_link": "/download_magazine_url_5"
//   // },
//   // {
//   //     "title": "Vogue Magazine",
//   //     "description": "Vogue Is A Globally-Recognized Magazine That Covers Fashion, Beauty, Culture, And Lifestyle. It’s Known For Its Innovative Editorial Design And Iconic Covers.",
//   //     "image": "https://diplomatnepal.com/wp-content/uploads/2025/05/Get-Your-Copy.png",
//   //     "read_link": "/read_magazine_url_6",
//   //     "download_link": "/download_magazine_url_6"
//   // }
// ];

// export const Card = ({ data }:{data?:any}) => {
//   return (
//     <div className="w-full h-[17.6875rem] flex gap-6 items-center">
//       <div className="min-w-[13rem] h-full">
//         <Image
//           width={100}
//           height={100}
//           alt="magazine1"
//           src={data.image}
//           className="w-full h-full object-contain"
//         />
//       </div>
//       <div className="space-y-8">
//         <div className="space-y-4">
//           <div className="pb-4 border-b border-b-primary-on-light">
//             <p className="font-diamend text-2xl leading-8 text-primary-on-light">
//               {data.title}
//             </p>
//           </div>
//           <p className="text-base leading-8 text-on-surface-black text-justify">
//             {data.description}
//           </p>
//         </div>
//         <div className="flex gap-8">
//           {/* <Link target="_blank" href={`https://abcd.xyz${data.read_link}`}>
//             <p className="font-medium text-lg leading-6 text-primary-on-light">
//               <AnimatedText text={'Read Magazine'} />
//             </p>
//           </Link> */}
//           <Link href={data.download_link}>
//             <p className="font-medium text-lg leading-6 text-primary-on-light">
//               <AnimatedText text={'Download Magazine'} />
//             </p>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export const HeroMagazine = () => {
//   const [magazines, setMagazines] = useState(allMagazines);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (e:any) => {
//     const value = e.target.value;
//     // console.log(value)
//     setSearchQuery(value);

//     if (value.trim() === '') {
//       setMagazines(allMagazines);
//       return;
//     }

//     const regex = new RegExp(value, 'i');

//     const filtered = allMagazines.filter(
//       (item:any) => regex.test(item.title) || regex.test(item.description)
//     );

//     setMagazines(filtered.length > 0 ? filtered : []);
//   };

//   return (
//     <section className="pt-12 pb-[6.25rem] bg-on-surface-bright-white">
//       <MaxWidthWrapper>
//         <div className=" space-y-[4rem]">
//           <div className="border-b border-b-primary-on-light pb-6 flex flex-col md:flex-row justify-between">
//             <p className="font-diamend text-[2.25rem] md:text-[3rem] md:leading-[4rem] text-primary-on-light">
//               Magazines
//             </p>
//             <div className="pt-4 w-[17rem] relative">
//               <input
//                 type="search"
//                 name="search"
//                 id="search"
//                 placeholder="Search Magazines"
//                 className="h-full w-full py-3 px-12 text-base leading-6 placehoder:text-[#8F8FA3] text-on-surface-black outline-1 outline-primary-dark-gradient appearance-none no-clear-button "
//                 onChange={(e) => handleSearch(e)}
//               />
//               <Image
//                 width={50}
//                 height={50}
//                 alt="search"
//                 src={'/v1/Icons/search.svg'}
//                 className="absolute w-6 h-6 top-7 left-3 object-contain "
//               />
//             </div>
//           </div>
//           <div className="flex gap-[4rem]">
//             <div className="flex-1/2 space-y-[4rem]">
//               {magazines.slice(0, 3).map((item, idx) => (
//                 <Card data={item} key={idx} />
//               ))}
//             </div>
//             <div className="flex-1/2 space-y-[4rem]">
//               {magazines.slice(3, 6).map((item, idx) => (
//                 <Card data={item} key={idx} />
//               ))}
//             </div>
//           </div>
//         </div>
//         {magazines.length === 0 && (
//           <p className="text-lg leading-6 text-primary-on-light">
//             Stay tuned! Our latest magazines will be here soon
//           </p>
//         )}
//       </MaxWidthWrapper>
//     </section>
//   );
// };


'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedText } from './Common/animatedComponent/AnimatedText';
import MaxWidthWrapper from './Common/MaxWidthWrapper';

export const allMagazines = [
  {
    title: 'Diplomat Nepal Issue #1',
    description:
      'Vogue Is A Globally-Recognized Magazine That Covers Fashion, Beauty, Culture, And Lifestyle. It’s Known For Its Innovative Editorial Design And Iconic Covers.',
    image: 'https://diplomatnepal.com/wp-content/uploads/2025/05/Get-Your-Copy.png',
    read_link: '/read_magazine_url_1',
    download_link: 'https://diplomatnepal.com/magazine/diplomat-nepal-magazine/',
  },
  // Add more magazines here...
];

export const Card = ({ data }: { data?: any }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-6 items-start sm:items-center">
      <div className="w-full sm:min-w-[13rem] sm:w-[13rem] h-[17rem] sm:h-[17.6875rem]">
        <Image
          width={100}
          height={100}
          alt="magazine1"
          src={data.image}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="space-y-6 flex-1">
        <div className="space-y-4">
          <div className="pb-2 border-b border-b-primary-on-light">
            <p className="font-diamend text-xl sm:text-2xl text-primary-on-light">
              {data.title}
            </p>
          </div>
          <p className="text-sm sm:text-base leading-6 sm:leading-8 text-on-surface-black text-justify">
            {data.description}
          </p>
        </div>
        <div className="flex gap-6">
          {/* Uncomment if needed */}
          {/* <Link href={data.read_link}>
            <p className="font-medium text-sm sm:text-lg text-primary-on-light">
              <AnimatedText text={'Read Magazine'} />
            </p>
          </Link> */}
          <a href={data.download_link} target='__blank'>
            <p className="font-medium text-sm sm:text-lg text-primary-on-light">
              <AnimatedText text={'Read Magazine'} />
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export const HeroMagazine = () => {
  const [magazines, setMagazines] = useState(allMagazines);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === '') {
      setMagazines(allMagazines);
      return;
    }

    const regex = new RegExp(value, 'i');
    const filtered = allMagazines.filter(
      (item: any) => regex.test(item.title) || regex.test(item.description)
    );

    setMagazines(filtered.length > 0 ? filtered : []);
  };

  return (
    <section className="pt-12 pb-20 bg-on-surface-bright-white">
      <MaxWidthWrapper>
        <div className="space-y-16">
          {/* Title & Search */}
          <div className="border-b border-b-primary-on-light pb-6 flex flex-col md:flex-row justify-between gap-4">
            <p className="font-diamend text-3xl md:text-[3rem] leading-10 md:leading-[4rem] text-primary-on-light">
              Magazines
            </p>
            <div className="w-full md:w-[17rem] relative">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search Magazines"
                className="w-full py-3 pl-12 pr-4 text-sm sm:text-base leading-6 placeholder:text-[#8F8FA3] text-on-surface-black border border-primary-on-light rounded-md outline-none"
                onChange={(e) => handleSearch(e)}
              />
              <Image
                width={24}
                height={24}
                alt="search"
                src="/v1/Icons/search.svg"
                className="absolute w-5 h-5 top-3.5 left-3 object-contain"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {magazines.map((item, idx) => (
              <Card data={item} key={idx} />
            ))}
          </div>

          {/* Empty State */}
          {magazines.length === 0 && (
            <p className="text-center text-lg text-primary-on-light">
              Stay tuned! Our latest magazines will be here soon.
            </p>
          )}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
