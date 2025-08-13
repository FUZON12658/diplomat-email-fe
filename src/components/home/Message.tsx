import Image from 'next/image';
import React from 'react';
import { JoinText } from '../Common/animatedComponent/JoinText';
import MaxWidthWrapper from '../Common/MaxWidthWrapper';


export const Message = () => {
  return (
    <div className="bg-[#17171C] py-16 md:py-[6.25rem] ">
      <MaxWidthWrapper>
        <div className="flex flex-col md:flex-row items-center md:gap-6">
          <div className="min-w-[40.56%] hidden md:grid place-content-center">
            <div className='md:w-[21.75rem] md:h-[30rem] relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-[#C2A75A] before:right-4 before:top-4 before:z-[-1] before:opacity-50 before:pointer-events-none '>
              <Image
                width={1000}
                height={1000}
                src={'/v1/ambassador.png'}
                alt="Sarmila Parajuli Dhakal"
                className="w-full h-full z-[10]  "
              />
            </div>
          </div>
          <div className="md:w-fit min-w-[57.56%] md:space-y-8">
            <div>
              <p className="text-[1.5rem] leading-[2rem] md:text-[2.25rem] md:leading-[3rem] font-diamend text-primary-dark-gradient ">
                Message from the Founder President
              </p>
              <div className="min-w-[40.56%] py-4 md:hidden grid place-content-center">
            <div className='md:w-[21.75rem] md:h-[30rem] relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-[#C2A75A] before:right-4 before:top-4 before:z-[-1] before:opacity-50 before:pointer-events-none '>
              <Image
                width={1000}
                height={1000}
                src={'/v1/ambassador.png'}
                alt="Sarmila Parajuli Dhakal"
                className="w-full h-full z-[10]  "
              />
            </div>
          </div>
              <div className="mt-4 hidden md:flex w-full bg-border-primary-dark-gradient h-[.0625rem]" />
            </div>
            <div className="text-md mt-10 md:mt-0 md:text-lg md:leading-9 text-surface-main ">
              <p>
              Ambassador&apos;s Club: A Platform of Diplomats, For Diplomats
                <br /><br/>
                As the former Ambassador of Nepal to the Sultanate of Oman and the Kingdom of Spain, I understand that diplomacy is not only about statecraft—it is about human connection, shared understanding, and strategic vision. In today&apos;s complex and interdependent world, ambassadors and heads of missions are not just representatives of their nations; they are trusted custodians of peace, partnership, and progress.
              </p>
              <br />

              <p className="font-medium ">- Dr. Sarmila Parajuli Dhakal</p>
            </div>
            <div className="mt-4 md:mt-0 text-right flex justify-start">
              <JoinText text={'Read More'} link={'/message'} />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
