"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import MaxWidthWrapper from '../Common/MaxWidthWrapper'
import { BodyText, Heading, SubHeading } from '../Common/Typography'
import Link from 'next/link'

// const allmembers = [
//     {
//         image: "/v1/boardmembers/image.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image2.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image3.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image2.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image3.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image2.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image3.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image2.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image3.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image2.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image3.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image2.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
//     {
//         image: "/v1/boardmembers/image3.png",
//         designation: "President",
//         name: "Hon Jeffrey Kin-fung Lam"
//     },
// ]

// export const Members = () => {

//     const [members, setMembers] = useState(allmembers)
//     const [searchQuery, setSearchQuery] = useState("");

//     const handleSearch = (e:any) => {

//         const value = e.target.value;
//         setSearchQuery(value);

//         if (value.trim() === "") {
//             setMembers(allmembers);
//             return;
//         }

//         const regex = new RegExp(value, "i");

//         const filtered = allmembers.filter(
//             (item) => regex.test(item.name) || regex.test(item.designation)
//         );

//         setMembers(filtered.length > 0 ? filtered : []);

//     }



//     return (
//         <div className='pt-[3rem] pb-[6.25rem] bg-on-surface-bright-white' >
//             <MaxWidthWrapper>
//                 <div className='space-y-[2.6875rem]' >
//                     <div className='w-[52.5rem] pb-6 border-b-[.0625rem] border-b-primary-on-light mx-auto' >
//                         <p className='font-diamend text-[3rem] leading-[4rem] text-primary-on-light text-center' >
//                             Honorary Members Of The Club</p>
//                     </div>
//                     <div className='space-y-[4rem]' >
//                         <div className='flex gap-[3rem] items-center' >
//                             <div><p className='text-2xl leading-8 text-on-surface-black ' >159 <span className='font-diamend' >Members in Total</span></p></div>
//                             <div className='relative w-[23.8125rem]'>
//                                 <input type="search" name="members" id="members" placeholder='Search for Members' className='outline outline-primary-dark-gradient bg-transparent py-3 ps-12  w-full text-base leading-6 placeholder:text-[#8F8FA3] no-clear-button text-on-surface-black' onChange={(e) => handleSearch(e)} />
//                                 <Image width={50} height={50} alt='search' src={"/v1/Icons/search.svg"} className='absolute w-6 h-6 top-3 left-3 ' />
//                             </div>
//                         </div>
//                         <div className='grid grid-cols-3 gap-x-[4rem] gap-y-[3.9375rem]' >
//                             {
//                                 members?.map((item, idx) => {
//                                     return <div className='flex gap-2 col-span-1 h-[13.3125rem]' key={idx} >
//                                         <div className='w-[13.3125rem] h-[13.3125rem] aspect-square' >
//                                             <Image width={500} height={500} src={item.image} alt='member1' className=' h-full object-cover' />
//                                         </div>
//                                         <div className='p-4 space-y-2' >
//                                             <div className='space-y-2 pb-4 border-b-[.0625rem] border-b-primary-on-light' >
//                                                 <p className='font-medium text-base leading-6 text-primary-on-light' >{item.designation}</p>
//                                                 <p className='font-diamend text-lg leading-6 text-on-surface-black' >{item.name}</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 })
//                             }
//                             {
//                                 members.length === 0 && <p className='text-lg leading-6 text-primary-on-light' >Member Not Found</p>
//                             }

//                         </div>
//                     </div>
//                 </div>
//             </MaxWidthWrapper>
//         </div>
//     )
// }


const membershipTypes = [
  {
    id: 'honorary',
    title: 'Honorary Member',
    eligibility: [
      'Diplomats, Ambassadors, Senior Government Officials, and Eminent Dignitaries',
      'International delegates and prominent global figures',
      'Awarded by the Club President or Board'
    ],
    privileges: [
      'Lifetime membership (no fee)',
      'Priority access to exclusive Ambassador Club events',
      'Featured profile in The Diplomat Nepal',
      'Voice and country elements featured in the magazine and digital platforms',
      'Digital and physical access to The Diplomat Nepal',
      'Unlimited access to Ambassador Club Lounge (café, boardroom, library)',
      'Concierge assistance for events, meetings, conference planning and travel assistance'
    ],
    color: 'text-primary-dark-gradient',
    bgColor: 'bg-gradient-to-br from-primary-on-light/5 to-primary-on-light/10'
  },
  // {
  //   id: 'business',
  //   title: 'Business Executive Member',
  //   eligibility: [
  //     'Business leaders, academics, and professionals in diplomacy or international relations',
  //     'Application or invitation-based'
  //   ],
  //   privileges: [
  //     'One-year renewable membership',
  //     'Access to selected events and forums',
  //     'Networking with the Ambassador Club community',
  //     'Digital and physical access to The Diplomat Nepal',
  //     'Lounge access upon prior booking',
  //     'Opportunity to be featured in selected media content',
  //     'Official member badge and card'
  //   ],
  //   color: 'text-on-surface-black',
  //   bgColor: 'bg-surface-two'
  // },
  // {
  //   id: 'institutional',
  //   title: 'Institutional Member',
  //   eligibility: [
  //     'Embassies, think tanks, universities, and foundations',
  //     'Application or invitation-based'
  //   ],
  //   privileges: [
  //     'Two representatives per institution may attend events',
  //     'Lounge access upon prior booking',
  //     'Complimentary booths or stalls during selected Club events',
  //     'Joint research, roundtables, and cultural promotion opportunities',
  //     'Digital and physical access to The Diplomat Nepal',
  //     'Facilitated B2B Networking Opportunities',
  //     'Eligibility to co-host sectoral forums, trade missions, and policy dialogues under the Club\'s institutional platform'
  //   ],
  //   color: 'text-on-surface-black',
  //   bgColor: 'bg-on-surface-white/20'
  // },
  // {
  //   id: 'associate',
  //   title: 'Associate Member',
  //   eligibility: [
  //     'Students, young professionals, and researchers',
  //     'Aspiring diplomats, young diplomats'
  //   ],
  //   privileges: [
  //     'Access to youth-focused and public programs',
  //     'Mentorship and internship opportunities',
  //     'Opportunity to actively engage with and lead initiatives within the Ambassador Club\'s youth community',
  //     'Digital access to The Diplomat Nepal',
  //     'Volunteer opportunities in events and publications',
  //     'Certificate of Membership'
  //   ],
  //   color: 'text-on-surface-black',
  //   bgColor: 'bg-surface-main'
  // },
  // {
  //   id: 'resident',
  //   title: 'Resident Member',
  //   eligibility: [
  //     'Diplomats, former ambassadors, senior officials, and dignitaries residing in Nepal',
  //     'Residents of Nepal involved in diplomacy, international relations, academia, or business',
  //     'Individuals with notable contributions to diplomacy, peace, or international cooperation'
  //   ],
  //   privileges: [
  //     'Access to monthly networking events and speaker sessions',
  //     'Digital and physical access to The Diplomat Nepal',
  //     'Opportunity to publish in Diplomat Nepal',
  //     'Use of Club Lounge facilities upon prior booking',
  //     'Eligible for media features and speaking engagements'
  //   ],
  //   color: 'text-on-surface-black',
  //   bgColor: 'bg-surface-two'
  // },
  // {
  //   id: 'nonresident',
  //   title: 'Non-Resident Member',
  //   eligibility: [
  //     'Non-residents, including members of the international diplomatic community and Nepalese nationals living abroad',
  //     'Prominent international dignitaries with a demonstrated interest in Nepal and regional engagement'
  //   ],
  //   privileges: [
  //     'Access to selected virtual events and forums',
  //     'Digital access to The Diplomat Nepal',
  //     'Invitations to international gatherings and diplomatic events hosted abroad',
  //     'Eligibility for cultural and consular collaboration programs'
  //   ],
  //   color: 'text-on-surface-black',
  //   bgColor: 'bg-on-surface-white/10'
  // }
];

export const MembershipPrivileges = () => {
  const [selectedMembership, setSelectedMembership] = useState('honorary');
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e:any) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const filteredMemberships = membershipTypes.filter(membership =>
    membership.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    membership.eligibility.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
    membership.privileges.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedMembershipData = membershipTypes.find(m => m.id === selectedMembership);

  return (
    <div className='pt-[3rem] pb-[6.25rem] bg-on-surface-bright-white'>
      <MaxWidthWrapper>
        <div className='space-y-[2.6875rem]'>
          {/* Header */}
          <div className='w-full max-w-[52.5rem] pb-6 border-b-[.0625rem] border-b-primary-on-light mx-auto'>
            <Heading variant="h1" className='font-diamend text-primary-on-light text-center'>
              Ambassador Club Membership
            </Heading>
            <SubHeading className='text-center text-on-surface-black mt-4'>
              Exclusive privileges and benefits for diplomatic and business communities
            </SubHeading>
          </div>

          {/* Search and Stats */}
          <div className='flex flex-col md:flex-row gap-[2rem] md:gap-[3rem] items-start md:items-center'>
            <div>
              <BodyText variant="medium" className='text-on-surface-black'>
                <span className='font-diamend text-2xl'>{membershipTypes.length}</span> Membership Categories Available
              </BodyText>
            </div>
            <div className='relative w-full max-w-[23.8125rem]'>
              <input 
                type="search" 
                name="memberships" 
                id="memberships" 
                placeholder='Search membership types or privileges' 
                className='outline outline-primary-dark-gradient bg-transparent py-3 ps-12 w-full text-base leading-6 placeholder:text-[#8F8FA3] no-clear-button text-on-surface-black' 
                onChange={handleSearch}
                value={searchQuery}
              />
              <Image width={50} height={50} alt='search' src={"/v1/Icons/search.svg"} className='absolute w-6 h-6 top-3 left-3' />
            </div>
          </div>

          {/* Membership Categories */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-[2rem]'>
            {/* Membership List */}
            <div className='lg:col-span-1 space-y-4'>
              <Heading variant="h3" className='text-on-surface-black border-b border-primary-on-light pb-2'>
                Membership Categories
              </Heading>
              <div className='space-y-2'>
                {filteredMemberships.map((membership) => (
                  <button
                    key={membership.id}
                    onClick={() => setSelectedMembership(membership.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${
                      selectedMembership === membership.id 
                        ? 'border-primary-on-light bg-primary-on-light/5' 
                        : 'border-transparent hover:border-primary-on-light/30 hover:bg-primary-on-light/5'
                    }`}
                  >
                    <BodyText variant="mediumbold" className={selectedMembership === membership.id ? 'text-primary-on-light' : 'text-on-surface-black'}>
                      {membership.title}
                    </BodyText>
                    <BodyText variant="small" className='text-on-surface-black/70 mt-1'>
                      {membership.eligibility[0]}
                    </BodyText>
                  </button>
                ))}
              </div>
            </div>

            {/* Membership Details */}
            <div className='lg:col-span-2'>
              {selectedMembershipData && (
                <div className={`p-6 rounded-lg ${selectedMembershipData.bgColor} border border-primary-on-light/20`}>
                  <div className='space-y-6'>
                    <div>
                      <Heading variant="h2" className={`${selectedMembershipData.color} mb-4`}>
                        {selectedMembershipData.title}
                      </Heading>
                    </div>

                    {/* Eligibility */}
                    <div>
                      <Heading variant="h4" className='text-on-surface-black mb-3 border-b border-primary-on-light/30 pb-2'>
                        Eligibility Requirements
                      </Heading>
                      <div className='space-y-2'>
                        {selectedMembershipData.eligibility.map((item, idx) => (
                          <div key={idx} className='flex items-start gap-3'>
                            <div className='w-2 h-2 bg-primary-on-light rounded-full mt-2 flex-shrink-0'></div>
                            <BodyText variant="regular" className='text-on-surface-black'>
                              {item}
                            </BodyText>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Privileges */}
                    <div>
                      <Heading variant="h4" className='text-on-surface-black mb-3 border-b border-primary-on-light/30 pb-2'>
                        Member Privileges & Benefits
                      </Heading>
                      <div className='grid grid-cols-1 gap-3'>
                        {selectedMembershipData.privileges.map((privilege, idx) => (
                          <div key={idx} className='flex items-start gap-3 p-3 bg-on-surface-bright-white/50 rounded-md'>
                            <div className='w-1.5 h-1.5 bg-primary-on-light rounded-full mt-2 flex-shrink-0'></div>
                            <BodyText variant="regular" className='text-on-surface-black'>
                              {privilege}
                            </BodyText>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Membership Process */}
          <div className='mt-12 p-6 bg-surface-two rounded-lg border border-primary-on-light/20'>
            <Heading variant="h3" className='text-on-surface-black mb-6 text-center'>
              Membership Renewal & Application Process
            </Heading>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <Heading variant="h5" className='text-primary-on-light'>
                  Application Process
                </Heading>
                <div className='space-y-3'>
                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 bg-primary-on-light text-on-surface-bright-white rounded-full flex items-center justify-center text-sm font-bold'>1</div>
                    <BodyText variant="regular" className='text-on-surface-black'>
                      Complete application through online form or official nomination
                    </BodyText>
                  </div>
                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 bg-primary-on-light text-on-surface-bright-white rounded-full flex items-center justify-center text-sm font-bold'>2</div>
                    <BodyText variant="regular" className='text-on-surface-black'>
                      Review and approval by the Membership Committee
                    </BodyText>
                  </div>
                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 bg-primary-on-light text-on-surface-bright-white rounded-full flex items-center justify-center text-sm font-bold'>3</div>
                    <BodyText variant="regular" className='text-on-surface-black'>
                      Digital ID issued upon acceptance
                    </BodyText>
                  </div>
                  <div className='flex items-start gap-3'>
                    <div className='w-6 h-6 bg-primary-on-light text-on-surface-bright-white rounded-full flex items-center justify-center text-sm font-bold'>4</div>
                    <BodyText variant="regular" className='text-on-surface-black'>
                      Privileges package sent via email, post, or delivered in person
                    </BodyText>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                <Heading variant="h5" className='text-primary-on-light'>
                  Renewal Information
                </Heading>
                <div className='space-y-3'>
                  <BodyText variant="regular" className='text-on-surface-black'>
                    Annual members will receive renewal notice one month prior to expiration. Honorary members enjoy lifetime privileges with no renewal required.
                  </BodyText>
                  <div className='p-4 bg-primary-on-light/10 rounded-lg'>
                    <BodyText variant="small-medium" className='text-on-surface-black'>
                      <strong>Note:</strong> All membership applications are subject to review and approval by the Ambassador Club Membership Committee.
                    </BodyText>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link href={`/contact`} className='text-center mt-8'>
            <button className='bg-border-primary-dark-gradient text-on-surface-bright-white px-8 py-3 rounded-lg font-medium hover:opacity-75 hover:scale-110 active:scale-90 duration-200 transition-all ease-in-out cursor-pointer'>
              Apply for Membership
            </button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};