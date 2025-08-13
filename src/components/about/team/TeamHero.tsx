"use client"
import React, { useEffect, useRef, useState } from 'react'
import { AboutTitle } from '../AboutTitle'
import { AdvisoryBoardMembers } from '../AdvisoryBoardMembers'
import MaxWidthWrapper from '@/components/Common/MaxWidthWrapper'

const board = [
    {
        designation: "President",
        name: "Hon Jeffrey Kin-fung Lam",
        desc: "Jeffrey Lam is Managing Director of Forward Winsome Industries and Vice Chairman of the Business and Professionals Alliance for Hong Kong. He is also a member of the General Committee of the Hong Kong General Chamber of Commerce and the Federation of Hong Kong Industries. He also serves as a member of the Executive Council and the Legislative Council. He was awarded the Gold Bauhinia Star in 2011 and Grand Bauhinia Medal, the highest award under the HKSAR Honours and Awards System, in 2023 respectively.",
        image: "/v1/boardmembers/image.png",
        link: "/"
    },
    {
        designation: "President",
        name: "Hon Jeffrey Kin-fung Lam",
        desc: "Jeffrey Lam is Managing Director of Forward Winsome Industries and Vice Chairman of the Business and Professionals Alliance for Hong Kong. He is also a member of the General Committee of the Hong Kong General Chamber of Commerce and the Federation of Hong Kong Industries. He also serves as a member of the Executive Council and the Legislative Council. He was awarded the Gold Bauhinia Star in 2011 and Grand Bauhinia Medal, the highest award under the HKSAR Honours and Awards System, in 2023 respectively.",
        image: "/v1/boardmembers/image.png",
        link: "/"
    },
    {
        designation: "President",
        name: "Hon Jeffrey Kin-fung Lam",
        desc: "Jeffrey Lam is Managing Director of Forward Winsome Industries and Vice Chairman of the Business and Professionals Alliance for Hong Kong. He is also a member of the General Committee of the Hong Kong General Chamber of Commerce and the Federation of Hong Kong Industries. He also serves as a member of the Executive Council and the Legislative Council. He was awarded the Gold Bauhinia Star in 2011 and Grand Bauhinia Medal, the highest award under the HKSAR Honours and Awards System, in 2023 respectively.",
        image: "/v1/boardmembers/image.png",
        link: "/"
    },
    {
        designation: "President",
        name: "Hon Jeffrey Kin-fung Lam",
        desc: "Jeffrey Lam is Managing Director of Forward Winsome Industries and Vice Chairman of the Business and Professionals Alliance for Hong Kong. He is also a member of the General Committee of the Hong Kong General Chamber of Commerce and the Federation of Hong Kong Industries. He also serves as a member of the Executive Council and the Legislative Council. He was awarded the Gold Bauhinia Star in 2011 and Grand Bauhinia Medal, the highest award under the HKSAR Honours and Awards System, in 2023 respectively.",
        image: "/v1/boardmembers/image.png",
        link: "/"
    },
    {
        designation: "President",
        name: "Hon Jeffrey Kin-fung Lam",
        desc: "Jeffrey Lam is Managing Director of Forward Winsome Industries and Vice Chairman of the Business and Professionals Alliance for Hong Kong. He is also a member of the General Committee of the Hong Kong General Chamber of Commerce and the Federation of Hong Kong Industries. He also serves as a member of the Executive Council and the Legislative Council. He was awarded the Gold Bauhinia Star in 2011 and Grand Bauhinia Medal, the highest award under the HKSAR Honours and Awards System, in 2023 respectively.",
        image: "/v1/boardmembers/image.png",
        link: "/"
    },
    {
        designation: "President",
        name: "Hon Jeffrey Kin-fung Lam",
        desc: "Jeffrey Lam is Managing Director of Forward Winsome Industries and Vice Chairman of the Business and Professionals Alliance for Hong Kong. He is also a member of the General Committee of the Hong Kong General Chamber of Commerce and the Federation of Hong Kong Industries. He also serves as a member of the Executive Council and the Legislative Council. He was awarded the Gold Bauhinia Star in 2011 and Grand Bauhinia Medal, the highest award under the HKSAR Honours and Awards System, in 2023 respectively.",
        image: "/v1/boardmembers/image.png",
        link: "/"
    },
]

export const TeamHero = () => {
    const [active, setActive] = useState("Board Members");
    const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

    const tabs = ["Board Members", "Advisory Board Members", "Management Team Members"];
    // Fix: Properly type the refs array with HTMLDivElement
    const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const activeIndex = tabs.indexOf(active);
        const activeTab = tabRefs.current[activeIndex];

        if (activeTab) {
            setUnderlineStyle({
                width: activeTab.offsetWidth,
                left: activeTab.offsetLeft,
            });
        }
    }, [active]);

    return (
        <div className="bg-surface-main-bg pt-12 pb-[6.25rem]">
            <MaxWidthWrapper>
                <div className="space-y-[1.1875rem]">
                    <AboutTitle text={"Ambassador's Club Team"} />
                    <div className="space-y-12 relative">
                        {/* Tab container */}
                        <div className="flex gap-12 items-baseline sticky top-[5.5rem] bg-surface-main-bg z-40 w-full -ms-5 ps-5 transition-all duration-300">
                            {/* Mapping tabs */}
                            {tabs.map((tab, index) => (
                                <div
                                    key={tab}
                                    ref={(el) => {
                                        // Fix: Update the refs array with proper type assignment
                                        tabRefs.current[index] = el;
                                    }}
                                    className="relative cursor-pointer py-6 text-2xl font-diamend"
                                    onClick={() => setActive(tab)}
                                >
                                    <p className={`leading-8 transition-all duration-300 ${active === tab ? "text-primary-on-light" : "text-on-surface-black hover:text-primary-on-light"}`}>
                                        {tab}
                                    </p>
                                </div>
                            ))}

                            {/* Animated underline */}
                            <div
                                className="absolute bottom-0 h-[.125rem] bg-primary-on-light transition-all duration-300"
                                style={{
                                    width: `${underlineStyle.width}px`,
                                    left: `${underlineStyle.left}px`
                                }}
                            />
                        </div>
                        <div>
                            <AdvisoryBoardMembers board={board} />
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
    );
};