import { Heading } from '@/components/Common/Typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export const Header = ({title, addNew=true, addNewLink}:{title:string, addNew:boolean, addNewLink: string}) => {
  return (
    <div className='flex h-[5rem] items-center justify-between w-full pr-4'>
      <Heading variant='h2'>{title}</Heading>
      {addNew && <Link href={addNewLink}><Button >Add New</Button></Link>}
    </div>
  )
}

