import MaxWidthWrapper from '@/components/Common/MaxWidthWrapper';
import { Title } from '@/components/Common/Title';
import React from 'react';

const coreValues = [
  {
    title: 'Inclusivity',
    desc: 'Ensuring equal representation across all nations and cultures.',
  },
  {
    title: 'Neutrality',
    desc: ' Providing an unbiased platform for open dialogue.',
  },
  {
    title: 'Sustainability',
    desc: 'Focusing on actions aligned with the Sustainable Development Goals for a better future of the world. ',
  },
  {
    title: 'Peacebuilding',
    desc: 'Advocating for mutual understanding, conflict resolution, and security.',
  },
  {
    title: 'Transparency',
    desc: 'Operating with integrity as a not-for-profit organization.',
  },
];

const Card = ({ data }:{data:any}) => {
  return (
    <div className="relative w-fit h-fit">
      <div
        className="absolute w-full h-full top-[-0.5394rem] left-[.5413rem] border-[.125rem] border-primary-on-light/50 "
        style={{ top: '-0.5394rem', left: '0.5413rem', zIndex: 0 }}
      />
      <div className="bg-[#DCD4BC] px-8 pt-8 pb-[3.0625rem] space-y-6 relative ">
        <div className="z-10 bg-[#DCD4BC]" style={{ zIndex: 1 }}>
          <p className="font-diamend text-2xl leading-8 text-on-surface-black">
            {data.title}
          </p>
          <div className="w-full h-[.0625rem] bg-primary-on-light" />
          <p className=" text-lg leading-9 text-on-surface-black">
            {data.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export const CoreValues = () => {
  return (
    <div className="py-[6.25rem] bg-surface-main-bg">
      <MaxWidthWrapper>
        <div className="space-y-12">
          <div
            className={`mx-auto w-[25.5rem] pb-4 border-b border-primary-dark-gradient `}
          >
            <Title text={'Our Core Values'} />
          </div>
          <div className="space-y-[4rem]">
            <div className="flex flex-col md:flex-row gap-[4rem]">
              <div>
                <Card data={coreValues[0]} />
              </div>
              <div className="md:pt-[8rem]">
                <Card data={coreValues[1]} />
              </div>
              <div className="md:pt-[4rem]">
                <Card data={coreValues[2]} />
              </div>
            </div>
            <div className="flex md:flex-row flex-col justify-evenly">
              <div className="w-[22.375rem] md:w-[23.75rem]">
                <Card data={coreValues[3]} />
              </div>
              <div className="mt-[4rem] md:pt-[1.3125rem] w-[22.375rem] md:w-[23.75rem]">
                <Card data={coreValues[4]} />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
