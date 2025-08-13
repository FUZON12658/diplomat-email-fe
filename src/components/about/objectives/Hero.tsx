import React from 'react';
import { AboutTitle } from '../AboutTitle';
import { Check, Minus } from 'lucide-react';
import MaxWidthWrapper from '@/components/Common/MaxWidthWrapper';

const Card = ({ data }:{data:any}) => {
  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-b-primary-on-light">
        <p className="font-diamend text-2xl md:text-[2.25rem] md:leading-[3rem] text-primary-on-light">
          {data?.title}
        </p>
      </div>
      <div className="space-y-4">
        {data?.points?.map((item:any, idx:any) => {
          return (
            <div className="flex gap-4 items-start" key={idx}>
              <div className="pt-1">
                <Minus
                  size={'1.75rem'}
                  color="#A88C3E"
                  strokeWidth={'.125rem'}
                />
              </div>
              <div>
                <p className="text-lg leading-9 text-on-surface-black">
                  {item}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const data = [
    {
      title: 'Diplomatic Engagement and International Relations',
      points: [
        `Enhance Nepal's diplomatic presence by strengthening bilateral and multilateral ties.`,` Host forums and roundtable discussions for ambassadors and international stakeholders to foster strategic partnerships and address global challenges.`,
      ],
    },
    {
      title: 'Economic and Trade Diplomacy',
      points: [
        'Drive economic growth by promoting trade, tourism, and investment through diplomatic channels.',
        'Promote economic growth by facilitating trade, tourism, and investment through diplomatic channels and collaborative partnerships.',
      ],
    },
    {
      title: 'Peace and Security Initiatives',
      points: [
        `Advocate for global peace and security, leveraging Nepal's historical role in peacekeeping and its stance as a neutral mediator in conflict resolution.`,
        'Organize peace dialogues and conflict resolution workshops to contribute to regional and international stability.',
      ],
    },
    {
      title: 'Environmental and Climate Diplomacy',
      points: [
        'Promote sustainable development and environmental protection through active participation in global climate advocacy.',
        `Partner with international entities to implement climate action projects and enhance Nepal's resilience to environmental changes.`,
      ],
    },
    {
      title: 'Cultural and Public Diplomacy',
      points: [
        `Showcase Nepal's rich cultural heritage globally through organized cultural exchanges and events.`,
        `Enhance Nepal's soft power by engaging in cultural festivals, arts exhibitions, and international cultural collaborations.`,
      ],
    },
    {
      title: 'Humanitarian Efforts and Global Health',
      points: [
        'Coordinate with international organizations to deliver humanitarian aid and support disaster recovery efforts.',
        'Engage in health diplomacy by collaborating with global health institutions to improve healthcare accessibility and crisis management.',
      ],
    },
    {
      title: 'Education and Capacity Building',
      points: [
        'Offer comprehensive training and mentorship programs for diplomats and international relations professionals.',
        'Partner with global academic institutions to facilitate knowledge exchange and scholarly research on diplomacy and international affairs.',
      ],
    },
    {
      title: 'Women and Youth Empowerment',
      points: [
        'Support initiatives for greater inclusion of women and youth in diplomacy and international governance.',
        'Develop leadership programs and workshops to empower women and young professionals in the field of international relations.',
      ],
    },
    {
      title: 'Digital and Cyber Diplomacy',
      points: [
        `Utilize digital platforms to expand Nepal’s diplomatic reach and engage in global conversations on cybersecurity and digital governance.`,
        'Innovate in digital diplomacy strategies to maintain and strengthen international relations in the digital age.',
      ],
    },
    {
      title: 'Diaspora and Expatriate Engagement',
      points: [
        `Harness the influence and resources of the Nepalese diaspora to further Nepal’s foreign relations and development goals.`,
      ],
    },
  ];

export const Hero = () => {
  return (
    <div className="bg-surface-main-bg pt-12 pb-[6.25rem]">
      <MaxWidthWrapper>
        <div className="space-y-[4rem]">
          <AboutTitle text={'Objectives Of The Club'} />
          <div className="flex flex-col md:flex-row gap-[4rem]">
            <div className="md:flex-1/2 space-y-[6.25rem]">
              {data.slice(0, 5).map((item, idx) => (
                <Card key={idx} data={item} />
              ))}
            </div>
            <div className="md:flex-1/2 space-y-[6.25rem] pt-[4rem]">
              {data.slice(5, 10).map((item, idx) => (
                <Card key={idx} data={item} />
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
