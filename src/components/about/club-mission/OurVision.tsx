import React from 'react';
import MaxWidthWrapper from '@/components/Common/MaxWidthWrapper';
import { HeroCardSection } from './HeroCardSection';

const data = {
  title: 'Our Vision',
  desc: 'To be recognized as a premier global community of diplomatic leaders, dedicated to advancing world peace, intercultural dialogue, and international cooperation. Through collective and strategic efforts, the club aspires to shape a connected, peaceful, and resilient world, focusing on building understanding and unity among nations.',
  image: '/about/vision.jpg',
};

export const OurVision = () => {
  return (
    <div className="bg-surface-two pb-[11.375rem] ">
      <MaxWidthWrapper>
        <div>
          <HeroCardSection data={data} reverse={true} />
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
