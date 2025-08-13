import Link from 'next/link'
import React from 'react'

export const JoinNow = ({ small, pause, text, link, dark }:{small?:boolean,pause?:boolean,text?:string,link?:string,dark?:boolean}) => {
    return (
        <div className={`pb-2 px-1 w-fit border-b ${dark ? "border-b-primary-on-light" : "border-primary-dark-gradient"}  relative ${pause ? "" : "group"} overflow-hidden cursor-pointer`} >
            <Link href={link ? link : "/contact"}>
                <div className='group-hover:transform group-hover:translate-y-[-1.5rem] transition-transform duration-300' >

                    <p className={`font-medium ${small ? "md:text-base" : "md:text-lg"} md:leading-6  ${dark ? "text-primary-on-light" : "text-primary-dark-gradient"}`} >{text ? text : "Join Now"}</p>
                </div>
                <div className='absolute left-1 right-0 -bottom-5 group-hover:transform group-hover:translate-y-[-1.75rem] transition-transform duration-300'>

                    <p className={`font-medium ${small ? "md:text-base" : "md:text-lg"} md:leading-6  ${dark ? "text-primary-on-light" : "text-primary-dark-gradient"}`} >{text ? text : "Join Now"}</p>
                </div>
            </Link>
        </div>
    )
}
