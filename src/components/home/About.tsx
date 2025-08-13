import Image from 'next/image'
import MaxWidthWrapper from '../Common/MaxWidthWrapper'


const clients = [
    "/v1/clients/client1.png",
    "/v1/clients/client2.png",
    "/v1/clients/client3.png",
    "/v1/clients/client4.png",
    "/v1/clients/client5.png",
    "/v1/clients/client6.png",
    "/v1/clients/client7.png",
    "/v1/clients/client8.png",
    "/v1/clients/client2.png",
]

export const About = () => {
    return (
        <section className=' bg-white relative overflow-hidden' >
            <div className='md:pb-[6.25rem] py-10 md:space-y-[5rem]' >
                <MaxWidthWrapper>
                    <div className='w-full md:w-full times-new-roman' >
                        <h4 className=' md:text-[2.25rem] md:leading-[3.75rem] text-on-surface-black ' >The Ambassadors Club is Nepal's first exclusive platform that brings together resident and non-resident Ambassadors, Heads of Mission, and Diplomats. It fosters global dialogue, cultural exchange, and international cooperation through high-level engagements. The Club promotes diplomatic collaboration, supports peace and development, and works to enhanceNepal's global presence.</h4>
                    </div>
                </MaxWidthWrapper>
                <div>

                    {/* <div className=' flex py-10 gap-[3.75rem] overflow-x-scroll scrollbar-none' >
                        <Marquee className='' >

                            {
                                [...clients, ...clients]?.map((item, idx) => {
                                    return <div className='h-[3rem] w-fit min-w-fit me-[3.75rem]' key={idx} >
                                        <Image width={100} height={100} alt='client' src={item} className='w-full h-full' />
                                    </div>
                                })
                            }
                        </Marquee>

                    </div> */}
                    <div className='w-[40rem] h-[40rem] absolute -right-[23rem] top-0'>
                        <Image src={`/ambinverted.svg`} alt='ambassadors-club-logo-inverted' layout='fill'/>
                    </div>
                </div>
            </div>

        </section>
    )
}
