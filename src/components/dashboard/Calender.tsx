"use client";
import React from "react";

export const Calendar = ({ onDayClick, selectedDay }:{onDayClick?:any, selectedDay?:any}) => {  // Fix: Destructure `onDayClick` properly
    const days = Array.from({ length: 31 }, (_, i) => i + 1); // Generate days 1 to 31

    return (
        <div className="calendar-container space-y-4 ">
            <h1 className="text-2xl font-bold text-primary-dark-gradient" >Calendar</h1>
            <h2>March 2025</h2>
            <div className="grid grid-cols-7 gap-4">
                {days.map((day) => (
                    <div
                        key={day}
                        className={`day-box p-4 text-center cursor-pointer border border-primary-dark-gradient rounded-md hover:bg-blue-200 hover:text-black ${selectedDay === day && "bg-blue-200 text-black"} transition-all`}
                        onClick={() => onDayClick(day)} // Fix: Ensure function is called properly
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

