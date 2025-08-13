import React from 'react';
import Image from 'next/image';
import { JoinNow } from '../Common/animatedComponent/JoinNow';
import MaxWidthWrapper from '../Common/MaxWidthWrapper';
import {  LinkExternal01 } from '@untitled-ui/icons-react';
import Link from 'next/link';

const ImageComponent = ({ image, right }:{image?:any,right?:any}) => {
  return (
    <div
      className={`w-[22.375rem] mx-1 h-[14.125rem] md:w-[32.25rem] md:h-[18.125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-[#C2A75A] ${right ? 'before:left-[1.125rem]' : 'before:right-[1.125rem]'} before:bottom-[1.125rem] before:z-[-1] before:opacity-50 before:pointer-events-none group`}
    >
      <div className="w-[22.375rem] h-[14.125rem] md:w-[32.25rem] md:h-[18.125rem] relative overflow-hidden">
        <Image
        layout='fill'
          alt="event"
          src={image}
          className="wobject-cover group-hover:scale-105 transition-all duration-200 ease-linear"
        />
      </div>
    </div>
  );
};

// ${dark ? "bg-on-surface-black " : "bg-surface-two"}

export const EventAndInitiatives = ({ dark }:{dark?:any}) => {
  return (
    <div className={``}>
      <div
        className={`w-full  opacity-100  pt-[6.25rem] pb-[8.75rem] ${dark ? 'bg-on-surface-black bg-blend-color-burn ' : 'bg-white bg-blend-multiply '}`}
        // style={{
        //   backgroundImage: dark
        //     ? "url('/v1/bgTexturedark.png')"
        //     : "url('/v1/bgTexture.svg')",
        // }}
      >
        <div className='w-full md:max-w-[79.5rem] mx-auto px-5 md:px-8 xl:px-0'>
          <div className="space-y-[5.25rem]">
            <div className="space-y-6 w-fit mx-auto px-[2rem] bg-transparent border-b-[1px] border-primary-dark-gradient/50  pb-6">
              <p className="font-diamend text-[2.25rem] leading-[3rem] text-center text-primary-on-light">
                Events and Initiatives
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="space-y-[7.5rem]">
                <div className="space-y-4 md:w-[32.25rem] group">
                  <ImageComponent image={'/v1/events/cultural.png'} />
                  <div className='flex items-center justify-between'>
                  <h5
                    className={`font-diamend text-2xl leading-8 ${dark ? 'text-on-surface-white' : 'text-on-surface-black'} group-hover:text-primary-on-light transition-all`}
                  >
                    Events
                  </h5>
                  <Link href={`/events`} className='hover:text-black/70'>
                  <LinkExternal01 className='w-6 h-6' />
                  </Link>
                  
                  </div>
                  <div className="w-full h-[.0625rem] bg-primary-on-light/50" />
                  <p
                    className={`text-md md:text-lg leading-9 ${dark ? 'text-on-surface-white' : 'text-on-surface-black'} `}
                  >
                    We gather voices from around the globe, in conferences,
                    forums, and cultural exchanges. Each event is a tapestry of
                    tradition and innovation, where ambassadors, thinkers, and
                    changemakers unite. From quiet reflections to bold ideas, we
                    celebrate the shared spirit of humanity
                  </p>
                </div>

                <div className="space-y-4 w-[22.375rem] md:w-[32.25rem] group">
                  {/* <div className='md:w-[32.25rem] md:h-[18.125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-[#C2A75A] before:right-[1.125rem] before:bottom-[1.125rem] before:z-[-1] before:opacity-50 before:pointer-events-none ' >
                                        <Image width={500} height={500} alt='event' src={"/events/cultural2.png"} className='w-full h-full object-cover' />
                                    </div> */}
                  <ImageComponent image={'/v1/events/cultural2.png'} />
                 <div className='flex items-center justify-between'>
                  <h5
                    className={`font-diamend text-2xl leading-8 ${dark ? 'text-on-surface-white' : 'text-on-surface-black'} group-hover:text-primary-on-light transition-all`}
                  >
                    Social Work
                  </h5>
                  <Link href={`/social-work`} className='hover:text-black/70'>
                  <LinkExternal01 className='w-6 h-6' />
                  </Link>
                  
                  </div>
                  <div className="w-full h-[.0625rem] bg-primary-on-light/50" />
                  <p
                    className={`text-md md:text-lg leading-9 ${dark ? 'text-on-surface-white' : 'text-on-surface-black'} `}
                  >
                    Beyond protocol and policy, we act with heart, standing
                    beside communities in need. With compassion as our compass,
                    we champion dignity, inclusion, and care. In every act of
                    service, we affirm our belief — that diplomacy begins with
                    humanity.
                  </p>
                </div>
              </div>
              <div className="space-y-[7.5rem] pt-[7.5rem]">
                <div className="space-y-4 w-[22.375rem]  md:w-[32.25rem] group">
                  <div className='-ml-4'>
                  <ImageComponent
                    right={true}
                    image={'/v1/events/cultural3.png'}
                  />
                  </div>
              <div className='flex items-center justify-between'>
                  <h5
                    className={`font-diamend text-2xl leading-8 ${dark ? 'text-on-surface-white' : 'text-on-surface-black'} group-hover:text-primary-on-light transition-all`}
                  >
                    Training / Diplomacy
                  </h5>
                  <Link href={`/careers`} className='hover:text-black/70'>
                  <LinkExternal01 className='w-6 h-6' />
                  </Link>
                  
                  </div>
                  <div className="w-full h-[.0625rem] bg-primary-on-light/50" />
                  <p
                    className={`text-md md:text-lg leading-9 ${dark ? 'text-on-surface-white' : 'text-on-surface-black'}`}
                  >
                    We shape the diplomats of tomorrow, empowering minds with
                    knowledge and values. Through workshops, mentorship, and
                    real-world exposure, we nurture voices that will carry Nepal
                    forward. Diplomacy, for us, is not a career — It is a
                    calling to serve with dignity and insight.
                  </p>
                </div>

                <div className="space-y-10 w-[22.375rem] md:w-[32.25rem]">
                  <div className="space-y-4">
                    <div className="pb-6 border-b-[1px] border-primary-on-light/50">
                      <p
                        className={`font-diamend text-2xl leading-8 text-primary-on-light`}
                      >
                        Take the Initiative
                      </p>
                    </div>
                    <p
                      className={`text-sm md:text-lg leading-9 ${dark ? 'text-on-surface-white' : 'text-on-surface-black'}`}
                    >
                      Be part of a global initiative fostering diplomacy,
                      leadership, and cross-cultural understanding.
                    </p>
                  </div>
                  <JoinNow text={`Contact Us`} dark={!dark} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
