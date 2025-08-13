import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({ bgColor, children }:{bgColor?:string, children:ReactNode}) => {
    return (
        <div className={`w-full max-w-[79.5rem] mx-auto px-5 md:px-8 xl:px-0 bg-[${bgColor}]`}>{children}</div>
    )
}

export default MaxWidthWrapper