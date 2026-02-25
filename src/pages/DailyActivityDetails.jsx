import React, { useState, useEffect } from 'react';
import { ChevronLeft, Share2, Calendar, MoreVertical, Footprints, Clock, Flame } from 'lucide-react';

export default function DailyActivityDetails({ onClose, isNewUser }) {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimated(true), 150);
    }, []);

    // Values based on application state
    const displaySteps = isNewUser ? 0 : 6825;
    const targetSteps = 10000;
    const displayMins = isNewUser ? 0 : 25;
    const targetMins = 50;
    const displayKcal = isNewUser ? 0 : 106;
    const targetKcal = 400;

    const r1 = 50; const c1 = 2 * Math.PI * r1;
    const r2 = 36; const c2 = 2 * Math.PI * r2;
    const r3 = 22; const c3 = 2 * Math.PI * r3;

    // Mini weekly rings mock data
    const weekDays = [
        { label: 'S', date: '18', active: true, rings: [0.8, 0.6, 0.5] },
        { label: 'M', date: '19', active: true, rings: [0.9, 0.7, 0.6] },
        { label: 'T', date: '20', active: true, rings: [1.0, 0.8, 0.9] },
        { label: 'W', date: '21', active: false, selected: true, rings: [0.68, 0.5, 0.26] }, // Today
        { label: 'T', date: '22', active: false, rings: [0, 0, 0] },
        { label: 'F', date: '23', active: false, rings: [0, 0, 0] },
        { label: 'S', date: '24', active: false, rings: [0, 0, 0] },
    ];

    // Chart mock data
    const generateChartData = (peakHours, maxValue) => {
        return Array(24).fill(0).map((_, i) => {
            if (isNewUser) return 0;
            if (peakHours.includes(i)) return maxValue * (0.5 + Math.random() * 0.5);
            return Math.random() > 0.8 ? Math.random() * (maxValue * 0.2) : 0;
        });
    };

    const stepsData = generateChartData([8, 12, 17, 18], 100);
    const timeData = generateChartData([8, 17], 100);
    const kcalData = generateChartData([8, 12, 17], 100);

    return (
        <div className="fixed inset-0 z-50 bg-[#F4F5F7] overflow-y-auto animate-in slide-in-from-right-full duration-300 pb-10">
            {/* Header */}
            <div className="sticky top-0 bg-[#F4F5F7]/90 backdrop-blur-md z-20 px-4 py-4 flex items-center justify-between border-b border-black/5">
                <div className="flex items-center space-x-4">
                    <button onClick={onClose} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-900 active:bg-zinc-200 transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Daily activity</h1>
                </div>

                {/* I am omitting the Share, Calendar, More icons here to maintain the clean look requested previously on other pages, 
                    but adding just the calendar icon as it is highly relevant for a daily activity view */}
                <div className="flex items-center text-zinc-900">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center -mr-2 active:bg-zinc-200 transition-colors">
                        <Calendar size={20} />
                    </button>
                </div>
            </div>

            <div className="px-4 mt-6 space-y-4">

                {/* Weekly Ribbon */}
                <div className="flex justify-between items-end mb-6 px-2">
                    {weekDays.map((day, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-zinc-400 mb-2">{day.label}</span>

                            {/* Mini Rings */}
                            <div className="relative w-8 h-8 mb-2 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" className="rotate-[-90deg]">
                                    {/* Tracks */}
                                    <circle cx="16" cy="16" r="14" fill="none" stroke="#EAECEF" strokeWidth="2.5" />
                                    <circle cx="16" cy="16" r="10" fill="none" stroke="#EAECEF" strokeWidth="2.5" />
                                    <circle cx="16" cy="16" r="6" fill="none" stroke="#EAECEF" strokeWidth="2.5" />

                                    {/* Progress (Green, Blue, Red) */}
                                    <circle cx="16" cy="16" r="14" fill="none" stroke="#23C91F" strokeWidth="2.5" strokeLinecap="round"
                                        strokeDasharray={2 * Math.PI * 14}
                                        strokeDashoffset={(2 * Math.PI * 14) * (1 - (animated ? day.rings[0] : 0))}
                                        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
                                    <circle cx="16" cy="16" r="10" fill="none" stroke="#419EF9" strokeWidth="2.5" strokeLinecap="round"
                                        strokeDasharray={2 * Math.PI * 10}
                                        strokeDashoffset={(2 * Math.PI * 10) * (1 - (animated ? day.rings[1] : 0))}
                                        style={{ transition: 'stroke-dashoffset 1.5s ease-out 0.2s' }} />
                                    <circle cx="16" cy="16" r="6" fill="none" stroke="#FA2F68" strokeWidth="2.5" strokeLinecap="round"
                                        strokeDasharray={2 * Math.PI * 6}
                                        strokeDashoffset={(2 * Math.PI * 6) * (1 - (animated ? day.rings[2] : 0))}
                                        style={{ transition: 'stroke-dashoffset 1.5s ease-out 0.4s' }} />
                                </svg>
                            </div>

                            {/* Date background if selected */}
                            <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${day.selected ? 'bg-zinc-900 text-white' : 'text-zinc-500'}`}>
                                <span className={`text-[11px] font-bold ${day.active && !day.selected ? 'text-[#FA2F68]' : ''}`}>{day.date}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Rings Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-black/5 flex flex-col items-center">

                    {/* Big Rings */}
                    <div className="relative w-48 h-48 mb-8 mt-4">
                        <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 120 120">
                            {/* Tracks */}
                            <circle cx="60" cy="60" r={r1} fill="none" stroke="#F4F5F7" strokeWidth="12" />
                            <circle cx="60" cy="60" r={r2} fill="none" stroke="#F4F5F7" strokeWidth="12" />
                            <circle cx="60" cy="60" r={r3} fill="none" stroke="#F4F5F7" strokeWidth="12" />

                            {/* Progress Rings */}
                            <circle cx="60" cy="60" r={r1} fill="none" stroke="#23C91F" strokeWidth="12" strokeLinecap="round"
                                strokeDasharray={c1}
                                strokeDashoffset={c1 - (c1 * (animated ? displaySteps / targetSteps : 0))}
                                className="transition-all duration-1000 ease-out" />
                            <circle cx="60" cy="60" r={r2} fill="none" stroke="#419EF9" strokeWidth="12" strokeLinecap="round"
                                strokeDasharray={c2}
                                strokeDashoffset={c2 - (c2 * (animated ? displayMins / targetMins : 0))}
                                className="transition-all duration-1000 ease-out delay-150" />
                            <circle cx="60" cy="60" r={r3} fill="none" stroke="#FA2F68" strokeWidth="12" strokeLinecap="round"
                                strokeDasharray={c3}
                                strokeDashoffset={c3 - (c3 * (animated ? displayKcal / targetKcal : 0))}
                                className="transition-all duration-1000 ease-out delay-300" />
                        </svg>
                    </div>

                    {/* Stats columns */}
                    <div className="grid grid-cols-3 w-full border-b border-black/5 pb-6 mb-6">
                        {/* Steps */}
                        <div className="flex flex-col items-center border-r border-black/5">
                            <span className="text-[10px] font-medium text-zinc-500 mb-1">Steps</span>
                            <div className="flex items-center text-[#23C91F] mb-1">
                                <Footprints size={12} className="mr-1 fill-current" />
                                <span className="text-xl font-bold tracking-tight text-zinc-900">{displaySteps.toLocaleString()}</span>
                            </div>
                            <span className="text-[10px] font-medium text-zinc-400">/{targetSteps.toLocaleString()}</span>
                        </div>

                        {/* Active time */}
                        <div className="flex flex-col items-center border-r border-black/5">
                            <span className="text-[10px] font-medium text-zinc-500 mb-1">Active time</span>
                            <div className="flex items-center text-[#419EF9] mb-1">
                                <Clock size={12} className="mr-1 stroke-[3px]" />
                                <span className="text-xl font-bold tracking-tight text-zinc-900">{displayMins}</span>
                            </div>
                            <span className="text-[10px] font-medium text-zinc-400">/{targetMins} mins</span>
                        </div>

                        {/* Calories */}
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] font-medium text-zinc-500 mb-1">Activity calories</span>
                            <div className="flex items-center text-[#FA2F68] mb-1">
                                <Flame size={12} className="mr-1 fill-current stroke-[2px]" />
                                <span className="text-xl font-bold tracking-tight text-zinc-900">{displayKcal}</span>
                            </div>
                            <span className="text-[10px] font-medium text-zinc-400">/{targetKcal} kcal</span>
                        </div>
                    </div>

                    {/* Summaries */}
                    <div className="w-full space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-zinc-500 flex-1">Total burnt calories <span className="text-zinc-200 ml-2">.......................................</span></span>
                            <span className="text-xs font-bold text-zinc-900 ml-2 bg-white">{isNewUser ? 0 : '1,378'} kcal</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-zinc-500 flex-1">Distance while active <span className="text-zinc-200 ml-2">.....................................</span></span>
                            <span className="text-xs font-bold text-zinc-900 ml-2 bg-white">{isNewUser ? '0.00' : '1.88'} km</span>
                        </div>
                    </div>
                </div>

                {/* Charts Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-black/5 flex flex-col space-y-8">

                    {/* Steps Chart */}
                    <div>
                        <h3 className="text-sm font-bold text-zinc-900 mb-6">Steps</h3>
                        <div className="h-20 flex items-end justify-between border-b border-black/5 pb-2 relative">
                            {stepsData.map((val, idx) => (
                                <div
                                    key={`steps-${idx}`}
                                    className="w-1 bg-[#23C91F] rounded-t-full transition-all duration-1000 origin-bottom"
                                    style={{ height: animated ? `${val}%` : '0%' }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 mt-2">
                            <span>12 am</span>
                            <span>6 am</span>
                            <span>12 pm</span>
                            <span>6 pm</span>
                            <span>(h)</span>
                        </div>
                    </div>

                    {/* Active Time Chart */}
                    <div>
                        <h3 className="text-sm font-bold text-zinc-900 mb-6">Active time</h3>
                        <div className="h-20 flex items-end justify-between border-b border-black/5 pb-2 relative">
                            {timeData.map((val, idx) => (
                                <div
                                    key={`time-${idx}`}
                                    className="w-1 bg-[#419EF9] rounded-t-full transition-all duration-1000 origin-bottom"
                                    style={{ height: animated ? `${val}%` : '0%' }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 mt-2">
                            <span>12 am</span>
                            <span>6 am</span>
                            <span>12 pm</span>
                            <span>6 pm</span>
                            <span>(h)</span>
                        </div>
                    </div>

                    {/* Activity Calories Chart */}
                    <div>
                        <h3 className="text-sm font-bold text-zinc-900 mb-6">Activity calories</h3>
                        <div className="h-20 flex items-end justify-between border-b border-black/5 pb-2 relative">
                            {kcalData.map((val, idx) => (
                                <div
                                    key={`kcal-${idx}`}
                                    className="w-1 bg-[#FA2F68] rounded-t-full transition-all duration-1000 origin-bottom"
                                    style={{ height: animated ? `${val}%` : '0%' }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold text-zinc-400 mt-2">
                            <span>12 am</span>
                            <span>6 am</span>
                            <span>12 pm</span>
                            <span>6 pm</span>
                            <span>(h)</span>
                        </div>
                    </div>
                </div>

                {/* Additional Stats Card */}
                <div className="bg-white rounded-[32px] p-6 shadow-sm border border-black/5 mb-6">

                    {/* Motion */}
                    <div className="mb-6">
                        <h3 className="text-sm font-bold text-zinc-900 mb-3">Motion</h3>
                        <div className="grid grid-cols-2">
                            <div>
                                <span className="text-[10px] font-medium text-zinc-500 block mb-1">Floors</span>
                                <span className="text-xl font-bold tracking-tight text-zinc-900">{isNewUser ? 0 : 2}</span>
                            </div>
                            <div>
                                <span className="text-[10px] font-medium text-zinc-500 block mb-1">Active hours</span>
                                <span className="text-xl font-bold tracking-tight text-zinc-900">{isNewUser ? 0 : 12}</span>
                            </div>
                        </div>
                    </div>

                    {/* Time */}
                    <div className="mb-6 border-t border-black/5 pt-6">
                        <h3 className="text-sm font-bold text-zinc-900 mb-3">Time</h3>
                        <div className="grid grid-cols-2">
                            <div>
                                <span className="text-[10px] font-medium text-zinc-500 block mb-1">Exercise time</span>
                                <div className="flex items-baseline space-x-1">
                                    <span className="text-xl font-bold tracking-tight text-zinc-900">{isNewUser ? 0 : 45}</span>
                                    <span className="text-xs font-bold text-zinc-500">mins</span>
                                </div>
                            </div>
                            <div>
                                <span className="text-[10px] font-medium text-zinc-500 block mb-1">Raised HR activity time</span>
                                <div className="flex items-baseline space-x-1">
                                    <span className="text-xl font-bold tracking-tight text-zinc-900">{isNewUser ? 0 : 32}</span>
                                    <span className="text-xs font-bold text-zinc-500">mins</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Calories */}
                    <div className="border-t border-black/5 pt-6 pb-2">
                        <h3 className="text-sm font-bold text-zinc-900 mb-3">Calories</h3>
                        <div>
                            <span className="text-[10px] font-medium text-zinc-500 block mb-1">Exercise calories</span>
                            <div className="flex items-baseline space-x-1">
                                <span className="text-xl font-bold tracking-tight text-zinc-900">{isNewUser ? 0 : 380}</span>
                                <span className="text-xs font-bold text-zinc-500">kcal</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
