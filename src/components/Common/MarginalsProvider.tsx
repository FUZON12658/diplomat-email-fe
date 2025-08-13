'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MarginalsProvider = ({ children, session }:{children:ReactNode, session:any}) => {
  const pathname = usePathname();
  console.log(pathname)
  
  const shouldHideNavbarFooter = pathname.startsWith('/dashboard') || 
                                pathname.startsWith('/member/') || 
                                pathname === '/member' ||
                                pathname.startsWith('/admin') || 
                                pathname.startsWith('/add-to-contacts');
  
  return (
    <>
      {!shouldHideNavbarFooter && <Navbar session={session} />}
      {children}
      {!shouldHideNavbarFooter && <Footer />}
    </>
  );
};