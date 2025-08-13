"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import MaxWidthWrapper from '../Common/MaxWidthWrapper'



const Card = ({ image, designation, name, desc, link, handleSelect, index }:{image:string,designation:string,name:string,desc:string,link?:any,handleSelect:any,index:any}) => {
    return <div className='flex gap-2 items-center '>
        <div>
            <div className='md:w-[15.9269rem] md:h-[16.1431rem]  relative z-[1]  before:contents-[""] before:w-full before:h-full before:absolute before:bg-transparent before:border-[.125rem] before:border-[#C2A75A] before:right-[.4544rem] before:top-[.4544rem] before:z-[-1] before:opacity-50 before:pointer-events-none group' >
                <div className='overflow-hidden h-full w-full' >
                    <Image width={500} height={500} alt='event' src={image || "/v1/boardmembers/image.png"} className='w-full h-full object-cover group-hover:scale-105 transition-all duration-200 ease-linear' />
                </div>
            </div>
        </div>
        <div className='p-4 space-y-8' >
            <div className='space-y-4' >
                <div className='space-y-2' >
                    <p className='font-medium text-lg leading-6 text-primary-on-light' >{designation}</p>
                    <p className='font-diamend text-2xl leading-8 text-on-surface-black' >{name}</p>
                </div>
                <div className='w-full h-[.0625rem] bg-primary-on-light opacity-50 ' />
                <div>
                    <p className='text-base leading-6 text-on-surface-black line-clamp-4' >
                        {desc}
                    </p>
                </div>
            </div>
            <div>

                <div className={`pb-2 px-1 w-fit border-b border-primary-dark-gradient relative group overflow-hidden cursor-pointer`} onClick={() => handleSelect(index)} >
                    <div className='group-hover:transform group-hover:translate-y-[--1.5rem] transition-transform duration-300' >

                        <p className={`font-medium text-lg md:leading-6  text-primary-dark-gradient`} >Real All</p>
                    </div>
                    <div className='absolute left-1 right-0 -bottom-5 group-hover:transform group-hover:translate-y-[--1.75rem] transition-transform duration-300'>

                        <p className={`font-medium text-lg md:leading-6  text-primary-dark-gradient`} >Real All</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
}

function preventScroll(event:any) {
    event.preventDefault();
}

export const AdvisoryBoardMembers = ({ board }:{board:any}) => {

    const [selectedMember, setSelectedMember] = useState(null);


    const handleSelect = (index:any) => {
        setSelectedMember(index);

        // Add event listeners
        window.addEventListener("wheel", preventScroll, { passive: false });
        window.addEventListener("touchmove", preventScroll, { passive: false });
    };

    const handleDeSelect = () => {
        setSelectedMember(null);

        // Remove event listeners
        window.removeEventListener("wheel", preventScroll);
        window.removeEventListener("touchmove", preventScroll,);
    };

    return (
        <div className=' bg-on-surface-bright-white' >
            {<div className={`bg-on-surface-black/60 w-[100vw] h-[100vh] fixed inset-0 z-[99] ${selectedMember !== null ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} transition-all `} >
                <div className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] p-10 bg-surface-two border border-primary-on-light  space-y-6 w-[42rem]' >
                    <div className='pb-4 border-b border-b-primary-on-light  relative ' >
                        <p className='capitalize font-diamend text-2xl leading-8 text-primary-on-light  ' >Words by {selectedMember !== null && board[selectedMember]?.name}</p>
                        <X size={"1.5rem"} color='#A88C3E' strokeWidth={1} className='absolute top-[.375rem] right-[.375rem] cursor-pointer' onClick={() => handleDeSelect()} />
                    </div>
                    <div>
                        <p className='text-lg leading-7 text-on-surface-black' >{selectedMember !== null && board[selectedMember]?.desc}</p>
                    </div>
                </div>
            </div>}
            <MaxWidthWrapper>
                <div className='space-y-[3rem]' >
                    {/* <div className='space-y-6 w-[25.5rem]   bg-transparent border-b-[1px] border-primary-dark-gradient/50  pb-6'>
                        <p className='font-diamend text-[2.25rem] leading-[3rem]  text-primary-on-light whitespace-nowrap' >Advisory Board Members</p>

                    </div> */}
                    <div className='flex gap-[4rem]' >
                        <div className='flex-1/2 space-y-[6rem] transition-opacity duration-300' >
                            {
                                board.slice(0, 3).map((item:any, idx:any) => {
                                    return <Card key={idx} image={item.image} designation={item.designation} name={item.name} desc={item.desc} handleSelect={handleSelect} index={idx} />
                                })
                            }



                        </div>
                        <div className='flex-1/2 space-y-[6rem] transition-opacity duration-300 ' >
                            {
                                board.slice(3, 6).map((item:any, idx:any) => {
                                    return <Card key={idx} image={item.image} designation={item.designation} name={item.name} desc={item.desc} handleSelect={handleSelect} index={idx} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}
