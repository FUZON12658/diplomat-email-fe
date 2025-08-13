import React from 'react'

export const AnimatedText = ({ text, pause, active, className }:{text?:string, pause?:boolean, active?:any, className?:string}) => {
    return (
        <span className={`inline-block overflow-hidden relative ${pause ? "" : "group"} pt-2 ${active && "text-primary-dark-gradient"} ${className}`} >
            <span className={`inline-block group-hover:transform group-hover:translate-y-[-1.875rem] transition-transform duration-300 ${active && "text-primary-dark-gradient"}`}>
                {text}
            </span>
            <span className={`inline-block absolute left-0 right-0 -bottom-7 group-hover:translate-y-[-1.75rem] transition-transform duration-300 ${active && "text-primary-dark-gradient"}`}>
                {text}
            </span>
        </span>
    )
}
