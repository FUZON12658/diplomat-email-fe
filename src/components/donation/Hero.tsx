import MaxWidthWrapper from "../Common/MaxWidthWrapper"

export const Hero = () => {
    return (

        <section className='bg-on-surface-black bg-blend-color-burn pt-8 pb-[6.25rem]' style={{
            backgroundImage: "url('/bgTexturedark.png')"
        }}>
            <MaxWidthWrapper>
                <div className='space-y-12' >

                    <div className='w-[52.5rem] space-y-8 mx-auto' >

                        <div className=' border-b border-b-primary-on-light/50 pb-6 ' >
                            <p className='font-diamend text-[3rem] leading-[4rem] text-center text-primary-dark-gradient' >Be A Part Of The Club</p>

                        </div>
                        <div className='w-[70%] mx-auto' >
                            <p className='text-lg leading-9 text-on-surface-white text-center'>Donate on ongoing projects to support our movement for the well being of our countries, culture and more.</p>
                        </div>
                    </div>
                    <div className='mx-auto w-[51.6875rem] bg-on-surface-black border border-primary-dark-gradient p-10' >
                        <div className='space-y-10' >
                            <div className='pb-4 border-b border-b-primary-on-light' >
                                <p className='font-diamend text-2xl leading-8 text-primary-dark-gradient'>Donation</p>
                            </div>
                            <div className='flex gap-6 ' >
                                <div className='space-y-3' >
                                    <p className='text-base leading-6 text-on-surface-white'>Donation Amount</p>
                                    <div className=' flex gap-6 items-center' >
                                        <div className='min-w-[17rem]' >

                                            <input type="number" name="amount" id="amount" placeholder='Enter Your Donation Amount' className='outline outline-primary-dark-gradient p-3 text-base leading-6 text-on-surface-bright-white placeholder:text-[#8F8FA3] w-full appearance-none ' />
                                        </div>
                                        <div className='flex items-center   ' >

                                            <div className=' grid place-content-center p-2 pe-3' >
                                                <input type="checkbox" defaultChecked name="" id="" className='w-[1.125rem] h-[1.125rem] custom-checkbox ' />

                                            </div>
                                            <p className=' text-base leading-6 text-on-surface-white' >All donations that I have made till today and will make in the future is declared as a donation until I notify it as otherwise. </p>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className='w-full h-[.0625rem] bg-primary-on-light/50 ' />

                            <div className='pt-2 space-y-[.875rem] ' >

                                <p className='text-lg leading-9 text-on-surface-white ' >Select Projects that you want to donate in:</p>
                                <div className='flex flex-wrap gap-x-10 gap-y-4' >
                                    <div className='flex gap-2 items-center py-2' >
                                        <div className=' grid place-content-center p-3' >
                                            <input type="checkbox" defaultChecked name="" id="" className='w-[1.125rem] h-[1.125rem] custom-checkbox   ' />

                                        </div>
                                        <p className='font-diamend text-xl leading-8 text-on-surface-white' >General Donation</p>
                                    </div>
                                    <div className='flex gap-2 items-center py-2' >
                                        <div className=' grid place-content-center p-3' >
                                            <input type="checkbox" name="" id="" className='w-[1.125rem] h-[1.125rem] custom-checkbox    ' />

                                        </div>
                                        <p className='font-diamend text-xl leading-8 text-on-surface-white' >Street Children </p>
                                    </div>
                                    <div className='flex gap-2 items-center py-2' >
                                        <div className=' grid place-content-center p-3' >
                                            <input type="checkbox" name="" id="" className='w-[1.125rem] h-[1.125rem] custom-checkbox    ' />

                                        </div>
                                        <p className='font-diamend text-xl leading-8 text-on-surface-white' >Old Age Support</p>
                                    </div>
                                    <div className='flex gap-2 items-center py-2' >
                                        <div className=' grid place-content-center p-3' >
                                            <input type="checkbox" name="" id="" className='w-[1.125rem] h-[1.125rem] custom-checkbox    ' />

                                        </div>
                                        <p className='font-diamend text-xl leading-8 text-on-surface-white' >Humanitarian Aid and Disaster Relief</p>
                                    </div>
                                    <div className='flex gap-2 items-center py-2' >
                                        <div className=' grid place-content-center p-3' >
                                            <input type="checkbox" name="" id="" className='w-[1.125rem] h-[1.125rem] custom-checkbox    ' />

                                        </div>
                                        <p className='font-diamend text-xl leading-8 text-on-surface-white' >Youth Ambassador Community</p>
                                    </div>

                                </div>
                            </div>



                        </div>
                        <div className='mt-10 flex justify-end' >

                            <div className='w-fit'>

                                <button className='py-3 px-9 bg-border-primary-dark-gradient text-base leading-6 text-on-surface-black whitespace-nowrap cursor-pointer' >Proceed To Payment</button>
                            </div>

                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}
