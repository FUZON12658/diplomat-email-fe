import React from 'react'

export const Title = ({ text }:{text:string}) => {
    return (
        <p className='font-diamend text-[2rem] leading-[2rem] md:text-[3rem] md:leading-[4rem] text-primary-on-light' >{text}</p>
    )
}
