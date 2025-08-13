import React from 'react'
import MaxWidthWrapper from '../Common/MaxWidthWrapper'

export const Hero = () => {
    return (
        <section className='bg-surface-main-bg pt-12 pb-[6.25rem]' >
            <MaxWidthWrapper>
                <div className='space-y-8' >
                    <div className='w-[52.5rem] pb-6 border-b-[1px] border-b-primary-on-light mx-auto' >
                        <p className='font-diamend text-[3rem] leading-[4rem] text-primary-on-light text-center' >Our Partners & Patrons</p>
                    </div>
                    <div className='w-[37.6875rem] capitalize text-center mx-auto' >
                        <p className='text-lg leading-9 text-on-surface-black' >The partners of the  Ambassadors Club provide support to our members and contribute to the success of our efforts. Their name, reputation, and practices reflect the spirit of our Club and help to enhance the relations around the world.</p>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}
