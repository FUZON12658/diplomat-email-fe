'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Users, Camera, Crown, Handshake, Newspaper } from 'lucide-react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { AnimatedText } from './animatedComponent/AnimatedText';
import { JoinNow } from './animatedComponent/JoinNow';

// Dynamic navigation menu with dropdown support
const navMenu = [
  {
    name: 'About The Club',
    pathname: '/about',
    hasDropdown: false,
    icon: Users,
  },
  {
    name: 'Gallery',
    pathname: '/gallery',
    hasDropdown: false,
    icon: Camera,
  },
  {
    name: 'Membership',
    pathname: '/members',
    hasDropdown: false,
    icon: Crown,
  },
  // {
  //   name: 'Partners',
  //   pathname: '/partners',
  //   hasDropdown: false,
  //   icon: Handshake,
  // },
  {
    name: 'Events',
    pathname: '/events',
    hasDropdown: false,
    icon: Handshake,
  },
  // {
  //   name: 'Social Works',
  //   pathname: '/social-work',
  //   hasDropdown: false,
  //   icon: Handshake,
  // },
  {
    name: 'Career',
    pathname: '/careers',
    hasDropdown: false,
    icon: Handshake,
  },
  {
    name: 'Media',
    pathname: '/media',
    hasDropdown: true,
    icon: Newspaper,
    dropdownItems: [
      {
        name: 'Media Coverage',
        pathname: '/press-release',
        image: '/about/vision.jpg',
        desc: 'Visual highlights from our events and activities.',
        icon: Camera,
      },
      {
        name: 'Publications',
        pathname: '/magazine',
        image: '/about/whatwedo.jpg',
        desc: 'Resources for media professionals and journalists.',
        icon: Users,
      },
    ]
  }
];

export const Navbar = ({ session }: { session: any }) => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverItem, setHoverItem] = useState<{menu: string, item: number} | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  // Handle scroll effect with improved direction detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for styling
      setScrolled(currentScrollY > 10);

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set scrolling state
      setIsScrolling(true);

      // Handle navbar visibility based on scroll position and direction
      if (currentScrollY <= 10) {
        // Always show navbar at the top of the page
        setIsVisible(true);
      } else {
        // Determine scroll direction
        const scrollingDown = currentScrollY > lastScrollY;
        const scrollingUp = currentScrollY < lastScrollY;
        
        // Only change visibility based on scroll direction, not when scrolling stops
        if (scrollingDown && currentScrollY > 100) {
          // Scrolling down - hide navbar
          setIsVisible(false);
          // Close any open dropdowns when hiding
          if (activeDropdown) {
            setActiveDropdown(null);
            setHoverItem(null);
          }
        } else if (scrollingUp) {
          // Scrolling up - show navbar
          setIsVisible(true);
        }
        // If neither scrollingDown nor scrollingUp (same position), don't change visibility
      }

      setLastScrollY(currentScrollY);

      // Set timeout to detect when scrolling stops
      const newTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
      
      setScrollTimeout(newTimeout);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, activeDropdown, scrollTimeout]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const openDropdown = (menuName: string) => {
    setActiveDropdown(menuName);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    setHoverItem(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (activeDropdown) closeDropdown();
  };

  const toggleMobileDropdown = (menuName: string) => {
    setMobileDropdownOpen(mobileDropdownOpen === menuName ? null : menuName);
  };

  // Render dropdown content
  const renderDropdown = (menuItem: typeof navMenu[0]) => {
    if (!menuItem.hasDropdown || !menuItem.dropdownItems) return null;

    const isOpen = activeDropdown === menuItem.name;

    return (
      <div
        className={`absolute left-0 top-full w-[30rem] bg-[#17171C] border border-[#C2A75A]/20 rounded-lg shadow-2xl overflow-hidden transition-all duration-300 transform ${
          isOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        style={{
          background: 'linear-gradient(135deg, #17171C 0%, #1a1a20 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(194,167,90,0.1)',
          zIndex: 99999
        }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#C2A75A]/20">
          <div className="flex items-center gap-3">
            {menuItem.icon && (
              <menuItem.icon size={20} className="text-[#C2A75A]" />
            )}
            <h3 className="text-lg font-semibold text-transparent bg-gradient-to-r from-[#C2A75A] to-[#D3BA6D] bg-clip-text">
              {menuItem.name}
            </h3>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="py-2">
          {menuItem.dropdownItems.map((subItem, subIdx) => (
            <Link
              key={subIdx}
              href={subItem.pathname}
              className="group block px-6 py-4 hover:bg-[#C2A75A]/5 transition-all duration-200"
              onMouseEnter={() => setHoverItem({menu: menuItem.name, item: subIdx})}
              onMouseLeave={() => setHoverItem(null)}
            >
              <div className="flex items-start gap-4">
                {/* Image */}
                <div className="w-16 h-12 rounded-md overflow-hidden flex-shrink-0 bg-[#C2A75A]/10 relative">
                  <Image
                    width={64}
                    height={48}
                    alt={subItem.name}
                    src={subItem.image}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Icon overlay */}
                  <div className="absolute inset-0 bg-[#17171C]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {subItem.icon && (
                      <subItem.icon size={16} className="text-[#C2A75A]" />
                    )}
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm mb-1 group-hover:text-[#C2A75A] transition-colors duration-200 flex items-center gap-2">
                    {subItem.name}
                    {pathname === subItem.pathname && (
                      <div className="w-2 h-2 bg-[#C2A75A] rounded-full animate-pulse"></div>
                    )}
                  </h4>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                    {subItem.desc}
                  </p>
                </div>
                
                {/* Arrow indicator */}
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-x-1">
                  <ChevronDown 
                    size={16} 
                    className="text-[#C2A75A] rotate-[-90deg]" 
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-3 bg-[#C2A75A]/5 border-t border-[#C2A75A]/20 capitalize">
          <p className="text-xs text-gray-400 text-center ">
            {menuItem.name.toLowerCase()} options
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <nav
        className={`bg-[#17171C] py-[1.85rem] md:py-4 fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${
          scrolled ? 'shadow-lg backdrop-blur-sm bg-[#17171C]/95' : 'bg-[#17171C]'
        } ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        style={{
          zIndex: 99999
        }}
      >
        <MaxWidthWrapper>
          <div className="flex justify-between items-center">
            <div className="flex md:gap-[3.75rem] items-center">
              <div className="z-[99] flex relative flex-col items-center justify-center">
                <Link
                  href={'/'}
                  className="w-[8rem] h-[2rem] md:w-[10.375rem] md:h-[2.5rem] z-[99] flex relative flex-col items-center justify-center"
                >
                  <Image
                    layout="fill"
                    src={'/v1/logo/ambassador-club-logo.svg'}
                    alt="Logo"
                    className="w-full h-full"
                  />
                </Link>
                <span className="text-[0.75rem] md:text-[0.875rem] font-diamend text-primary-dark-gradient font-bold">
                  Ambassadors Club
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <ul className="flex gap-[1.25rem] items-center">
                  {navMenu.map((item, idx) => {
                    const isActive = pathname === item.pathname || 
                      (item.dropdownItems && item.dropdownItems.some(subItem => pathname === subItem.pathname));

                    return (
                      <li
                        className="text-base font-medium leading-6 tracking-normal text-on-surface-white cursor-pointer"
                        key={idx}
                      >
                        <div
                          className={item.hasDropdown ? 'group relative' : ''}
                          onMouseEnter={item.hasDropdown ? () => openDropdown(item.name) : undefined}
                          onMouseLeave={item.hasDropdown ? closeDropdown : undefined}
                        >
                          <div className="flex gap-2 items-center justify-center">
                            {item.hasDropdown ? (
                              <span className="flex items-center justify-center gap-2">
                                <AnimatedText
                                  className='-mt-2'
                                  text={item.name}
                                  pause={isActive}
                                  active={isActive}
                                />
                                <ChevronDown
                                  strokeWidth={1}
                                  stroke="#C2A75A"
                                  size={'1.5rem'}
                                  className={`transition-all duration-300 ${
                                    activeDropdown === item.name ? 'rotate-180' : ''
                                  }`}
                                />
                              </span>
                            ) : (
                              <Link href={item.pathname}>
                                <AnimatedText
                                  text={item.name}
                                  pause={isActive}
                                  active={isActive}
                                />
                              </Link>
                            )}
                          </div>
                          
                          {/* Render dropdown if item has dropdown */}
                          {item.hasDropdown && renderDropdown(item)}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Desktop Authentication & Contact */}
            <div className="hidden md:flex md:gap-[2rem] lg:gap-[3.75rem] items-center">
              <p className="text-base font-medium leading-6 tracking-normal cursor-pointer text-on-surface-white">
                {session === null ? (
                  <Link href={'/auth/login'}>
                    <AnimatedText
                      text={'Log In'}
                      pause={pathname === '/auth/login'}
                      active={pathname === '/auth/login'}
                    />
                  </Link>
                ) : (
                  <Link href={'/dashboard'}>
                    <AnimatedText
                      text={'Dashboard'}
                      pause={pathname === '/dashboard'}
                      active={pathname === '/dashboard'}
                    />
                  </Link>
                )}
              </p>
              <JoinNow
                small={true}
                pause={pathname === '/contact'}
                text={'Contact Us'}
                link={'/contact'}
              />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white z-[100000] relative"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </MaxWidthWrapper>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[99998] transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#17171C] z-[99999] transform transition-transform duration-300 ease-in-out md:hidden overflow-y-auto ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, #17171C 0%, #1a1a20 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#C2A75A]/20">
          <div className="flex flex-col items-center">
            <Image
              width={120}
              height={30}
              src={'/v1/logo/ambassador-club-logo.svg'}
              alt="Logo"
              className="w-auto h-auto"
            />
            <span className="text-xs font-bold text-[#C2A75A] mt-1">
              Ambassadors Club
            </span>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-[#C2A75A] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col p-6 space-y-4">
          {navMenu.map((item, idx) => {
            const isActive = pathname === item.pathname || 
              (item.dropdownItems && item.dropdownItems.some(subItem => pathname === subItem.pathname));

            return (
              <div key={idx} className="text-white">
                {item.hasDropdown ? (
                  <div className="space-y-3">
                    <div
                      className="flex justify-between items-center cursor-pointer group py-2"
                      onClick={() => toggleMobileDropdown(item.name)}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <item.icon size={18} className="text-[#C2A75A]" />
                        )}
                        <span
                          className={`text-base font-medium transition-colors ${
                            isActive ? 'text-[#C2A75A]' : 'text-white group-hover:text-[#C2A75A]'
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      <ChevronDown
                        strokeWidth={1}
                        stroke="#C2A75A"
                        size={'1.25rem'}
                        className={`transition-all duration-300 ${
                          mobileDropdownOpen === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <div
                      className={`pl-6 space-y-3 border-l border-[#C2A75A]/30 overflow-hidden transition-all duration-300 ${
                        mobileDropdownOpen === item.name
                          ? 'max-h-screen opacity-100'
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      {item.dropdownItems?.map((subItem, subIdx) => (
                        <Link
                          key={subIdx}
                          href={subItem.pathname}
                          className={`flex items-center gap-3 text-sm py-2 px-3 rounded transition-all hover:bg-[#C2A75A]/10 ${
                            pathname === subItem.pathname 
                              ? 'text-[#C2A75A] bg-[#C2A75A]/10' 
                              : 'text-gray-300 hover:text-white'
                          }`}
                          onClick={toggleMobileMenu}
                        >
                          {subItem.icon && (
                            <subItem.icon size={16} className="text-[#C2A75A]" />
                          )}
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.pathname}
                    className={`flex items-center gap-3 text-base font-medium py-3 px-3 rounded transition-all hover:bg-[#C2A75A]/10 ${
                      isActive 
                        ? 'text-[#C2A75A] bg-[#C2A75A]/10' 
                        : 'text-white hover:text-[#C2A75A]'
                    }`}
                    onClick={toggleMobileMenu}
                  >
                    {item.icon && (
                      <item.icon size={18} className="text-[#C2A75A]" />
                    )}
                    {item.name}
                  </Link>
                )}
              </div>
            );
          })}

          {/* Mobile Auth & Contact Section */}
          <div className="pt-6 mt-6 border-t border-[#C2A75A]/20 flex flex-col space-y-4">
            {session === null ? (
              <Link
                href="/auth/login"
                className={`flex items-center gap-3 text-base font-medium py-3 px-3 rounded transition-all hover:bg-[#C2A75A]/10 ${
                  pathname === '/auth/login' ? 'text-[#C2A75A] bg-[#C2A75A]/10' : 'text-white hover:text-[#C2A75A]'
                }`}
                onClick={toggleMobileMenu}
              >
                <Users size={18} className="text-[#C2A75A]" />
                Log In
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 text-base font-medium py-3 px-3 rounded transition-all hover:bg-[#C2A75A]/10 ${
                  pathname === '/dashboard' ? 'text-[#C2A75A] bg-[#C2A75A]/10' : 'text-white hover:text-[#C2A75A]'
                }`}
                onClick={toggleMobileMenu}
              >
                <Users size={18} className="text-[#C2A75A]" />
                Dashboard
              </Link>
            )}
            
            <Link
              href="/contact"
              className="bg-gradient-to-r from-[#C2A75A] to-[#D3BA6D] text-black py-3 px-4 rounded text-center font-medium transition-all hover:scale-105 hover:shadow-lg"
              onClick={toggleMobileMenu}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};