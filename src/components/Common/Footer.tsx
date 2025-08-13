import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download01,
  Mail01,
  MarkerPin01,
  Phone,
  MessagePlusSquare,
} from "@untitled-ui/icons-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { AnimatedText } from "./animatedComponent/AnimatedText";

export const Footer = () => {
  return (
    <footer className="bg-[#17171C] border-t border-t-primary-dark-gradient">
      <MaxWidthWrapper bgColor={"#17171C"}>
        <div className="md:py-[3.75rem] md:space-y-[3.75rem]">
          <div className="flex flex-col md:flex-row md:gap-[7.5rem] ">
            <div className="space-y-4">
              <div className="logoLevel flex flex-col items-center justify-start pt-6 md:pt-0 md:max-w-min">
                <div className=" md:w-[3.375rem] md:h-[2.5rem] flex flex-col items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    src={"/v1/logo/ambassador-club-logo.svg"}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </div>
                <p className="whitespace-nowrap font-diamend text-primary-dark-gradient font-bold">
                  Ambassadors Club
                </p>
              </div>
              <div className="text-on-surface-white w-[16.875rem] text-[0.875rem] text-center md:text-start font-normal">
                <p>
                  A neutral platform for resident and non-resident Ambassadors,
                  Heads of Mission, and Diplomats accredited to Nepal to foster
                  diplomacy, sustainability, and cooperation.
                </p>
                <br />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center md:flex-row md:items-start">
              <div className="mt-10 md:mt-0 md:space-y-6  text-center md:text-start w-[17rem]">
                <div>
                  <p className="font-diamend text-xl leading-6 text-on-surface-bright-white">
                    Quick Links
                  </p>
                </div>
                <div className="text-base leading-6 text-on-surface-white cursor-pointer">
                  <p>
                    <Link href={"/message"}>
                      <AnimatedText text={"Message From Founder President"} />
                    </Link>
                  </p>
                  <p>
                    <a
                      href={"https://irgdd.com"}
                      target="__blank"
                      className="pt-4"
                    >
                      <AnimatedText text={"Research & Development"} />
                    </a>
                  </p>
                  {/* <p>
                    <Link href={"/"}>
                      <AnimatedText text={'Partners'} />
                    </Link>
                  </p> */}
                  <p>
                    <a
                      href={"https://diplomatnepal.com"}
                      target="__blank"
                      className="pt-4"
                    >
                      <AnimatedText text={"Media Partner"} />
                    </a>
                  </p>
                </div>
              </div>
              {/* <div className="space-y-6 w-[17rem]">
                <div>
                  <p className="font-diamend text-xl leading-6 text-on-surface-bright-white">
                    Navigation
                  </p>
                </div>
                <div className="space-y-4 text-base leading-6 text-on-surface-white cursor-pointer">
                  <p>
                    <Link href={"/"}>
                      <AnimatedText text={'Back To Top'} />
                    </Link>
                  </p>
                  <p>
                    <Link href={"/"}>
                      <AnimatedText text={'About The Club'} />
                    </Link>
                  </p>
                  <p>
                    <Link href={"/"}>
                      <AnimatedText text={'Partners'} />
                    </Link>
                  </p>
                  <p>
                    <Link href={"/"}>
                      <AnimatedText text={'Honorary Members'} />
                    </Link>
                  </p>
                  <p>
                    <Link href={"/"}>
                      <AnimatedText text={'News & Updates'} />
                    </Link>
                  </p>
                </div>
              </div> */}

              <div className="right mt-10 md:mt-0 w-[20.75rem] flex flex-col gap-2 md:gap-0 items-center md:items-start">
                <p className="font-diamend text-xl leading-6 text-on-surface-bright-white">
                  Get Connected
                </p>
                <Link
                  href={`/contact`}
                  className="flex items-center gap-2 md:gap-3 mt-4 md:mt-6 "
                >
                  <MessagePlusSquare
                    width={`1.5rem`}
                    height={`1.5rem`}
                    color="#e4a924"
                  />
                  <span className="text-on-surface-bright-white text-[0.875rem] leading-[1.3125rem] md:text-[1rem] md:leading-[1.75rem] tracking-0">
                    Contact Us
                  </span>
                </Link>
                <a
                  href="https://maps.app.goo.gl/mYTyrEt4jcPn41xT8"
                  target="_blank"
                  className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3"
                >
                  <MarkerPin01
                    width={`1.5rem`}
                    height={`1.5rem`}
                    color="#e4a924"
                  />
                  <span className="text-on-surface-bright-white text-[0.875rem] leading-[1.3125rem] md:text-[1rem] md:leading-[1.75rem] tracking-0">
                    Kathmandu, Nepal
                  </span>
                </a>
                <a
                  href="tel:+977014500300"
                  className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3"
                >
                  <Phone width={`1.5rem`} height={`1.5rem`} color="#e4a924" />
                  <span className="text-on-surface-white text-[0.875rem] leading-[1.3125rem] md:text-[1rem] md:leading-[1.75rem] tracking-0">
                    +977 01-4500300
                  </span>
                </a>
                <a
                  href="mailto:info@ambassadorsclubnepal.com"
                  className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3"
                >
                  <Mail01 width={`1.5rem`} height={`1.5rem`} color="#e4a924" />
                  <span className="text-on-surface-bright-white text-[0.875rem] leading-[1.3125rem] md:text-[1rem] md:leading-[1.75rem] tracking-0">
                    info@ambassadorsclubnepal.com
                  </span>
                </a>
              </div>
              <div className="right mt-10 md:mt-0 w-[20.75rem] flex flex-col items-center md:items-start">
                <p className="font-diamend text-xl leading-6 text-on-surface-bright-white">
                  Get In Touch
                </p>
                <div className="flex flex-wrap w-[8rem] gap-[2rem] my-6 ">
                  <a
                    target="__blank"
                    href={`https://linkedin.com/`}
                    className="w-5 h-5"
                  >
                    <Image
                      width={50}
                      height={50}
                      alt="linkedin"
                      src={"/v1/Icons/linkedin.png"}
                    />
                  </a>
                  <a
                    target="__blank"
                    href={`https://www.instagram.com/ambassadorsclub.nepal/`}
                    className="w-5 h-5"
                  >
                    <Image
                      width={50}
                      height={50}
                      alt="instagram"
                      src={"/v1/Icons/instagram.png"}
                    />
                  </a>
                  <a
                    target="__blank"
                    href={`https://www.facebook.com/ambassadorsclub.nepal`}
                    className="w-5 h-5"
                  >
                    <Image
                      width={50}
                      height={50}
                      alt="facebook"
                      src={"/v1/Icons/facebook.png"}
                    />
                  </a>
                  <a href="https://x.com/ambclubnepal" target="__blank">
                  <div className="w-5 h-5">
                    <Image
                      width={50}
                      height={50}
                      alt="twitter"
                      color="white"
                      src={"/v1/Icons/twitter.png"}
                    />
                  </div>
                  </a>
                  <a
                    href="https://www.youtube.com/@diplomacynepal"
                    target="__blank"
                  >
                    <div className="w-7 h-7 -mt-1">
                      <Image
                        width={50}
                        height={50}
                        alt="youtube"
                        color="white"
                        src={"/v1/Icons/youtubeee.png"}
                      />
                    </div>
                  </a>
                </div>
                {/* <p>
                    <a target='__blank' href={'https://maps.app.goo.gl/wnwrjzgL75A4XEy69'} className='pt-2        text-on-surface-bright-white'>
                      <AnimatedText text={'Go To Map'} />
                    </a>
                  </p> */}
              </div>
            </div>
          </div>
          <div className="border-t-[.0625rem] border-t-primary-dark-gradient md:pt-6 flex justify-between">
            <div className="w-full flex  items-center justify-between">
              <p className="text-base text-center md:text-start leading-6 py-6 md:py-0 text-surface-main">
                Ambassadors Club Nepal &copy; 2025 All Rights Reserved
              </p>
              <div className="flex gap-10">
                <Link href={`/terms-and-conditions`} className="text-white">
                  Terms & Conditions
                </Link>
                <Link href={`/privacy`} className="text-white">
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* <div>
              <p className="text-base leading-6 text-surface-main">
                Tech Partner:{' '}
                <strong>
                  <a
                    target="_blank"
                    href="https://sunbi.com.np"
                    className="text-primary-dark-gradient"
                  >
                    SunBi
                  </a>
                </strong>
              </p>
            </div> */}
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};
