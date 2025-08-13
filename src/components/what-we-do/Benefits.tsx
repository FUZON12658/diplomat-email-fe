import React from 'react';
import Image from 'next/image';
import { Minus } from 'lucide-react';
import MaxWidthWrapper from '../Common/MaxWidthWrapper';
import { JoinText } from '../Common/animatedComponent/JoinText';

const benefits = [
  {
    title: 'Networking Opportunities',
    description:
      'Connect with fellow ambassadors, diplomats, international delegates, and Nepali counterparts.',
  },
  {
    title: 'Platform for Dialogue & Collaboration',
    description:
      'Engage in formal and informal conversations on regional and global issues.',
  },
  {
    title: 'Promotion of Bilateral and Multilateral Relations',
    description:
      'Highlight national interests, explore partnerships, and share policy perspectives.',
  },
  {
    title: 'Access to Think-Tank Resources',
    description:
      'Participate in research, policy discussions, and publications through IRGDD and affiliated institutions.',
  },
  {
    title: 'Cultural Exchange & Public Diplomacy Support',
    description:
      'Collaborate on cultural events, exhibitions, and language/culture promotion programs.',
  },
  {
    title: 'Visibility & Outreach',
    description:
      'Be featured in Diplomat Nepal magazine and digital version and to amplify diplomatic initiatives.',
  },
  {
    title: 'Participation in High-Level Forums & Conferences',
    description:
      'Join flagship events , dialogues, and ambassadorial roundtables.',
  },
  {
    title: 'Youth Engagement & Mentorship',
    description:
      'Inspire and mentor young aspiring diplomats, scholars, and future leaders.',
  },
  {
    title: 'Capacity Building & Training',
    description:
      'Attend seminars, workshops, and training on diplomacy, international affairs, and foreign policy.',
  },
  {
    title: 'Humanitarian & Development Diplomacy',
    description:
      'Engage in social impact programs, climate action, and sustainable development partnerships.',
  },
  {
    title: 'Bilateral Diplomacy',
    description:
      'Nation-to-nation diplomatic engagement through embassies and official channels.',
  },
  {
    title: 'Multilateral Diplomacy',
    description:
      'Collaboration through international organizations such as the UN, SAARC, and BIMSTEC.',
  },
  {
    title: 'Track I Diplomacy',
    description: 'Government-to-government formal diplomacy.',
  },
  {
    title: 'Track II Diplomacy',
    description:
      'Informal diplomacy through think tanks, scholars, and civil society actors.',
  },
  {
    title: 'Cultural , sports Diplomacy',
    description:
      'Fostering mutual understanding through cultural exchange and promotion.',
  },
  {
    title: 'Economic Diplomacy',
    description: 'Encouraging trade, investment, and economic cooperation.',
  },
  {
    title: 'Digital Diplomacy (E-diplomacy)',
    description:
      'Leveraging social media and digital tools to advance diplomatic goals.',
  },
  {
    title: 'Climate Diplomacy',
    description:
      'Addressing environmental and climate issues on a global scale.',
  },
  {
    title: 'Public Diplomacy',
    description:
      'Engaging with foreign publics to influence public opinion and build soft power.',
  },
  {
    title: 'Defense & Military Diplomacy',
    description:
      'Promoting trust and cooperation through military and UN peace keeping.',
  },
  {
    title: 'Humanitarian Diplomacy',
    description: 'Advocating and acting in response to humanitarian crises.',
  },
  {
    title: 'Science , technology & Health Diplomacy',
    description:
      'Coordinating efforts on global ICT, health challenges like pandemics.',
  },
];

export const Benefits = () => {
  return (
    <div className="pt-[5rem] pb-[6.25rem] bg-surface-two relative">
      <MaxWidthWrapper>
        <div className="space-y-[3.75rem]">
          <div className="space-y-6 w-fit mx-auto px-[2rem] bg-transparent border-b-[1px] border-primary-dark-gradient/50  pb-6">
            <p className="font-diamend text-[2.25rem] leading-[3rem] text-center text-primary-on-light">
              Benefits to Our Members
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-[4rem] items-start relative ">
            <div className="flex-1/2 md:sticky md:top-[10.5rem]">
              <div className='md:w-[37.75rem] md:h-[25.1875rem]  z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-on-light before:right-[.8544rem] before:bottom-[.8544rem] before:z-[-1] before:opacity-50 before:pointer-events-none group '>
                <div className="overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    alt="event"
                    src={'/about/vision.jpg'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1/2 space-y-[3.75rem]">
              <div>
                <ul className="space-y-6">
                  {benefits.map((item, index) => (
                    <li key={index} className="flex gap-4 items-center">
                      <Minus
                        size={'2.75rem'}
                        color="#A88C3E"
                        strokeWidth={'.125rem'}
                        className="min-w-[2rem] max-w-[2rem]"
                      />
                      <p className="font-diamend md:text-lg md:leading-8 text-on-surface-black">
                        <strong>{item.title}:</strong> {item.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <JoinText text={'Contact Us'} />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
