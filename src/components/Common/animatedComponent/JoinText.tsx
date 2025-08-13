import Link from 'next/link'
import React from 'react'

export const JoinText = ({ text, link, onLight }:{text?:string,link?:string,onLight?:boolean}) => {
    return (
        <div className={`pb-2 px-1 w-fit border-b border-primary-dark-gradient relative group overflow-hidden cursor-pointer`} >
            <Link href={link?link:"/"}>
                <div className={`group-hover:transform group-hover:translate-y-[-1.5rem] transition-transform duration-300`} >

                    <p className={`font-medium md:text-lg md:leading-6  ${onLight ? "text-primary-on-light" : "text-primary-dark-gradient"}`} >{text}</p>
                </div>
                <div className={`absolute  ps-1 left-0 -bottom-5 group-hover:transform group-hover:translate-y-[-1.75rem] transition-transform duration-300`}>

                    <p className={`font-medium md:text-lg md:leading-6  ${onLight ? "text-primary-on-light" : "text-primary-dark-gradient"}`} >{text}</p>
                </div>
            </Link>
        </div>
    )
}
