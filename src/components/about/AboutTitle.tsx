import React from 'react'
import { Title } from '../Common/Title'

export const AboutTitle = ({ text }:{text:string}) => {
    return (
        <div className='md:w-[52.5rem] mx-auto text-center pb-6 border-b-[.0625rem] border-primary-dark-gradient' >
            <Title text={text} />
        </div>
    )
}
