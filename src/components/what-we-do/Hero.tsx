import React from 'react';
import Image from 'next/image';
import { Title } from '../Common/Title';
import { JoinText } from '../Common/animatedComponent/JoinText';
import MaxWidthWrapper from '../Common/MaxWidthWrapper';

export const Hero = () => {
  return (
    <section className="pt-[5rem] pb-[6.25rem] bg-surface-main-bg">
      <MaxWidthWrapper>
        <div className="space-y-4">
          <div>
            <div className="w-[30.5625rem]  pb-6 border-b-[.0625rem] border-primary-dark-gradient">
              <Title text={'What We Do'} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-[4rem]">
            <div className="flex-[40%] space-y-12 pt-8">
              <div className="space-y-8">
                <p className="text-lg leading-9 text-on-surface-black">
                  A non-partisan, not-for-profit organization, Ambassadors&apos; Club
                  is dedicated to strengthening global diplomacy, promoting
                  peace, and driving sustainable development through
                  collaboration, dialogue, and strategic partnerships. Founded
                  and chaired by Former Ambassador Dr. Sarmila Parajuli Dhakal,
                  the Club amplifies Nepal&apos;s unique role in international
                  cooperation while fostering unity and mutual respect among
                  nations.
                  <br/>
                  <br/>
                   Dr. Sarmila Parajuli Dhakal, in voicing the founding
                  purpose of the Ambassadors Club, states, &quot;Driven by the
                  principles of neutrality and inclusivity, the Ambassadors&apos;
                  Club Nepal was founded to provide a collaborative platform for
                  addressing global challenges through diplomacy, dialogue,
                  and innovation.&quot;
                </p>
                <div>
                  <JoinText text={'Contact Us'} link={'/'} />
                </div>
              </div>
            </div>
            <div className="flex-[60%]">
              <div className='md:min-w-[44.6875rem] md:h-[29.8125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[1.0106rem] before:bottom-[1.0106rem] before:z-[-1] before:opacity-50 before:pointer-events-none group'>
                <div className="overflow-hidden h-full w-full">
                  <Image
                    width={500}
                    height={500}
                    alt="event"
                    src={'/about/whatwedo.jpg'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};
