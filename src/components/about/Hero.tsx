import React from 'react'
import Image from 'next/image'
import { AboutTitle } from './AboutTitle'
import MaxWidthWrapper from '../Common/MaxWidthWrapper'
import { Title } from '../Common/Title'

export const Hero = () => {
    return (
        <div className='bg-surface-main-bg pt-[3rem] pb-[6.25rem]'>
            <MaxWidthWrapper>
                <div className='space-y-[5.5rem]' >


                    <AboutTitle text={"About Ambassadors Club"} />

                    <div className='flex flex-col md:flex-row'>

                        <div className='w-full md:w-[47%] pe-[5rem]' >
                            <div className='w-[22.375rem] md:w-[32.25rem] md:h-[21.5rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-dark-gradient before:right-[1.125rem] before:bottom-[1.125rem] before:z-[-1] before:opacity-50 before:pointer-events-none group' >
                                <div className='overflow-hidden h-full' >
                                    <Image width={500} height={500} alt='event' src={"/v1/events/cultural.png"} className='w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear' />
                                </div>
                            </div>

                        </div>
                        <div className='md:w-[53%] space-y-8' >
                            <div className='pb-6 border-b-[1px] border-b-primary-on-light w-[22.375rem] md:w-[60%]' >
                                <p className='font-diamend mt-[2rem] md:mt-0 text-[2.25rem] leading-12 text-primary-on-light' >Ambassadors Club</p>
                            </div>
                            <div className='text-lg leading-9 text-on-surface-black' >
                                <p>The Ambassadors&apos; Club is pivotal in fostering international understanding and collaboration. We are a non-partisan, not-for-profit organisation, working towards strengthening global diplomacy, promoting global peace, and driving sustainable development through collaboration, dialogue, and strategic partnerships.  


                                </p>
                                <br />
                                {/* <p>
                                    Today, under the Honorary Presidency of H.S.H. Prince Albert II of Monaco, our members continue to act as ambassadors not only of their own culture but of Monegasque culture too. With such a rich history and diverse network of members, the MAC continues to actively bring together communities of different backgrounds and cultures whilst maintaining political and religious neutrality, in the spirit of international friendship and cooperation.</p> */}
                            </div>
                        </div>

                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}
