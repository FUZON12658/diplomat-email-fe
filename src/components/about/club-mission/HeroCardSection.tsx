import MaxWidthWrapper from '@/components/Common/MaxWidthWrapper'
import { Title } from '@/components/Common/Title'
import Image from 'next/image'
import React from 'react'

export const HeroCardSection = ({ data, reverse }:{data?:any,reverse?:any}) => {
    return (


        <div className={`mt-10 md:pt-[6.25rem] relative  ${reverse && "flex flex-col-reverse md:flex-row justify-end"}`} >
            <div className={`bg-[#9D8A54] p-10 space-y-8 max-w-[44.6875rem] relative z-20 ${reverse ? "" : ""}`} >
                <div className='pb-6 border-b border-b-on-surface-bright-white' >
                    <p className='font-diamend text-[2.25rem] leading-12 text-on-surface-bright-white' >{data?.title}</p>
                </div>
                <div>
                    <p className='text-lg leading-9 text-on-surface-bright-white' >
                        {data?.desc}
                    </p>
                </div>
            </div>
            <div className={`relative md:absolute max-w-[39.1875rem]  z-10 ${reverse ? "left-0 mb-20" : "right-0 mt-20"}  md:mt-0 md:top-[10.25rem]`}>
                <div className='md:w-[39.1875rem] md:h-[26.125rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-primary-dark-gradient before:left-[1rem] before:bottom-[1rem] before:z-[-1] before:opacity-50 before:pointer-events-none group' >
                    <div className='overflow-hidden h-full' >
                        <Image width={500} height={500} alt='event' src={data?.image} className='w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear' />
                    </div>
                </div>

            </div>

        </div>
    )
}
