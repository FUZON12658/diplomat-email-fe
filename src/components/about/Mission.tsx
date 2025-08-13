import React from "react";
import Image from "next/image";
import MaxWidthWrapper from "../Common/MaxWidthWrapper";
import { JoinText } from "../Common/animatedComponent/JoinText";

export const Mission = () => {
  return (
    <div className="bg-surface-two">
      <div
        className="w-full  opacity-100 mix-blend-multiply pt-[5rem] pb-[6.25rem]"
        style={{
          backgroundImage: "url('/v1/bgTexture.svg')",
        }}
      >
        <MaxWidthWrapper>
          <div className="space-y-[4.6875rem]">
            <div className="space-y-[9.25rem]">
              <div className="flex flex-col md:flex-row gap-[4rem] items-start">
                <div className="md:ps-[6.9375rem] space-y-8 pt-6">
                  <div className="space-y-6 w-[22.375rem] md:w-[25.5rem]   bg-transparent border-b-[.0625rem] border-primary-dark-gradient/50  pb-6">
                    <p className="font-diamend  text-[2.25rem] leading-[3rem]  text-primary-on-light">
                      Our Mission
                    </p>
                  </div>
                  <div className="pt-block md:hidden">
                    <div className='md:w-[30.8125rem] md:h-[17.3125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[1.125rem] before:bottom-[1.125rem] before:z-[-1] before:opacity-50 before:pointer-events-none group'>
                      <div className="overflow-hidden">
                        <Image
                          width={500}
                          height={500}
                          alt="event"
                          src={"/about/club-mission.jpg"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-lg leading-9 text-on-surface-black">
                    To foster global diplomatic relations and enhance
                    international cooperation by providing a dynamic platform
                    where ambassadors, dignitaries, and policy leaders can
                    convene to discuss and collaborate on global peace,
                    security, development, and address global challenges. The
                    Ambassadors' Club is committed to supporting the
                    professional growth of its members and amplifying their
                    impact in global diplomacy and humanitarian efforts.
                  </p>
                </div>
                <div className="pt-6 hidden md:block">
                  <div className='md:w-[30.8125rem] md:h-[17.3125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[1.125rem] before:bottom-[1.125rem] before:z-[-1] before:opacity-50 before:pointer-events-none group'>
                    <div className="overflow-hidden">
                      <Image
                        width={500}
                        height={500}
                        alt="event"
                        src={"/about/club-mission.jpg"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col md:flex-row gap-[4rem] items-center">
                  <div className='w-22.375rem min-w-[22.375rem] hidden md:block md:min-w-[44.6875rem] md:h-[25.125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[1.5594rem] before:bottom-[1.5594rem] before:z-[-1] before:opacity-50 before:pointer-events-none group mb-[.875rem]'>
                    <div className="overflow-hidden">
                      <Image
                        width={500}
                        height={500}
                        alt="event"
                        src={"/v1/events/cultural.png"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                      />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-6 w-[22.375rem] md:w-[25.5rem]   bg-transparent border-b-[.0625rem] border-primary-dark-gradient/50  pb-6">
                      <p className="font-diamend text-[2.25rem] leading-[3rem]  text-primary-on-light">
                        Our Vision
                      </p>
                      <div className='w-[20.375rem] min-w-[20.375rem] ml-6 mt-10 block md:hidden md:min-w-[44.6875rem] md:h-[25.125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[1.5594rem] before:bottom-[1.5594rem] before:z-[-1] before:opacity-50 before:pointer-events-none group mb-[.875rem]'>
                        <div className="overflow-hidden">
                          <Image
                            width={500}
                            height={500}
                            alt="event"
                            src={"/v1/events/cultural.png"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                          />
                        </div>
                      </div>
                    </div>
                    <p className=" text-lg leading-9 text-on-surface-black">
                      To be recognized as a premier global community of
                      diplomatic leaders, dedicated to advancing world peace,
                      intercultural dialogue, and international cooperation.
                      Through collective and strategic efforts, the club aspires
                      to shape a connected, peaceful, and resilient world, with
                      a focus on building understanding and unity among nations.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col md:flex-row-reverse gap-[4rem] items-center">
                  <div className='w-22.375rem min-w-[22.375rem] hidden md:block md:min-w-[44.6875rem] md:h-[25.125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[1.5594rem] before:bottom-[1.5594rem] before:z-[-1] before:opacity-50 before:pointer-events-none group mb-[.875rem]'>
                    <div className="overflow-hidden">
                      <Image
                        width={500}
                        height={500}
                        alt="event"
                        src={"/v1/events/cultural.png"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                      />
                    </div>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-6 w-[22.375rem] md:w-[25.5rem]   bg-transparent border-b-[.0625rem] border-primary-dark-gradient/50  pb-6">
                      <p className="font-diamend text-[2.25rem] leading-[3rem]  text-primary-on-light">
                        Our Objectives
                      </p>
                      <div className='w-[20.375rem] min-w-[20.375rem] ml-6 mt-10 block md:hidden md:min-w-[44.6875rem] md:h-[25.125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[1.5594rem] before:bottom-[1.5594rem] before:z-[-1] before:opacity-50 before:pointer-events-none group mb-[.875rem]'>
                        <div className="overflow-hidden">
                          <Image
                            width={500}
                            height={500}
                            alt="event"
                            src={"/v1/events/cultural.png"}
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                          />
                        </div>
                      </div>
                    </div>
                    <p className=" text-lg leading-9 text-on-surface-black">
                      The Ambassadors Club brings together resident and
                      non-resident diplomats in a unified effort to foster
                      trust, dialogue, and cooperation dedicated in its pursuit
                      of strengthening Nepal’s role on the global stage.
                    </p>
                        <div className="-mt-6 md:mt-0 text-right flex justify-end">
                                  <JoinText text={'Read More'} link={'/objectives'} />
                                </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
};
