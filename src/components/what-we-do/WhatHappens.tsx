import React from 'react';
import Image from 'next/image';
import MaxWidthWrapper from '../Common/MaxWidthWrapper';

export const WhatHappens = () => {
  return (
    <section className="bg-surface-two">
      <div
        className="w-full  opacity-100 mix-blend-multiply pt-[5rem] pb-[6.25rem]"
        style={{
          backgroundImage: "url('/bgTexture.svg')",
        }}
      >
        <MaxWidthWrapper>
          <div className="space-y-[5rem]">
            <div className="space-y-6 w-fit mx-auto  bg-transparent border-b-[1px] border-primary-dark-gradient/50  pb-6">
              <p className="font-diamend text-[2.25rem] leading-[3rem] text-center text-primary-on-light whitespace-nowrap">
                What Happens In Our Club
              </p>
            </div>
            <div className="space-y-[4rem]">
              <div className="flex gap-[4rem] items-center">
                <div className="flex-1/2">
                  <div className='md:min-w-[37.75rem] md:h-[21.25rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[.8438rem] before:bottom-[.8438rem] before:z-[-1] before:opacity-50 before:pointer-events-none group'>
                    <div className="overflow-hidden h-full w-full">
                      <Image
                        width={500}
                        height={500}
                        alt="event"
                        src={'/v1/events/cultural.png'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1/2 space-y-6">
                  <p className="font-diamend text-2xl leading-8 text-on-surface-black">
                    Events
                  </p>
                  <div className="w-full h-[.0625rem] bg-primary-on-light" />
                  <p className="line-clamp-4 text-lg leading-9 text-on-surface-black">
                  We gather voices from around the globe, in conferences, forums, and cultural exchanges. Each event is a tapestry of tradition and innovation, where ambassadors, thinkers, and changemakers unite. From quiet reflections to bold ideas, we celebrate the shared spirit of humanity

                  </p>
                </div>
              </div>
              <div className="flex gap-[4rem] items-center">
                <div className="flex-1/2 order-2">
                  <div className='md:min-w-[37.75rem] md:h-[21.25rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[.8438rem] before:bottom-[.8438rem] before:z-[-1] before:opacity-50 before:pointer-events-none group'>
                    <div className="overflow-hidden h-full w-full">
                      <Image
                        width={500}
                        height={500}
                        alt="event"
                        src={'/v1/events/cultural.png'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1/2 space-y-6">
                  <p className="font-diamend text-2xl leading-8 text-on-surface-black">
                    Social Work
                  </p>
                  <div className="w-full h-[.0625rem] bg-primary-on-light" />
                  <p className="line-clamp-4 text-lg leading-9 text-on-surface-black ">
                  Beyond protocol and policy, we act with heart, standing beside communities in need. With compassion as our compass, we champion dignity, inclusion, and care. In every act of service, we affirm our belief — that diplomacy begins with humanity.
                  </p>
                </div>
              </div>
              <div className="flex gap-[4rem] items-center">
                <div className="flex-1/2">
                  <div className='md:min-w-[37.75rem] md:h-[21.25rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[.8438rem] before:bottom-[.8438rem] before:z-[-1] before:opacity-50 before:pointer-events-none group'>
                    <div className="overflow-hidden h-full w-full">
                      <Image
                        width={500}
                        height={500}
                        alt="event"
                        src={'/v1/events/cultural.png'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex-1/2 space-y-6">
                  <p className="font-diamend text-2xl leading-8 text-on-surface-black">
                    Training / Diplomacy
                  </p>
                  <div className="w-full h-[.0625rem] bg-primary-on-light" />
                  <p className="line-clamp-4 text-lg leading-9 text-on-surface-black ">
                  We shape the diplomats of tomorrow, empowering minds with knowledge and values. Through workshops, mentorship, and real-world exposure, we nurture voices that will carry Nepal forward. Diplomacy, for us, is not a career — It is a calling to serve with dignity and insight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </section>
  );
};
