import React, { useState, useEffect } from 'react';
import { Flame, Footprints, Check } from 'lucide-react';

export default function StreakWidget({ isNewUser }) {
    // Week days matching the provided mockup
    const days = [
        { name: 'Mon', active: true },
        { name: 'Tue', active: true },
        { name: 'Wed', active: true },
        { name: 'Thu', active: true },
        { name: 'Fri', active: false }, // Today
        { name: 'Sat', active: false },
        { name: 'Sun', active: false },
    ];

    // Values matched to the mockup
    const streak = isNewUser ? 0 : 32;
    const steps = isNewUser ? 0 : 6825;
    const goal = 10000;
    const progress = (steps / goal) * 100;

    const [animatedWidth, setAnimatedWidth] = useState(0);

    useEffect(() => {
        // Smoothly animate the progress bar sliding in
        const timer = setTimeout(() => setAnimatedWidth(progress), 200);
        return () => clearTimeout(timer);
    }, [progress]);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 mb-6 w-full animate-in fade-in zoom-in-95 duration-500">
            {/* Top row: Flame, Streak text, Shoe icon */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#FA2F68]/10 flex items-center justify-center relative">
                        {/* Glow effect matching the mockup's neon glow */}
                        <div className="absolute inset-0 bg-[#FA2F68] blur-md opacity-20 rounded-full"></div>
                        <Flame size={20} className="text-[#FA2F68] fill-[#FA2F68] relative z-10" />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-[#7B7B98] uppercase tracking-widest leading-none mb-1">Streak</div>
                        <div className="text-xl leading-none font-bold text-zinc-900 tracking-tight">
                            {streak} <span className="text-[11px] font-bold text-[#7B7B98] uppercase tracking-widest ml-1">Days</span>
                        </div>
                    </div>
                </div>
                <div className="text-[#7B7B98] opacity-70">
                    <Footprints size={22} strokeWidth={2.5} />
                </div>
            </div>

            {/* Middle row: Weekdays */}
            <div className="flex justify-between items-center mb-8 px-1">
                {days.map((day, idx) => {
                    const isActive = isNewUser ? false : day.active;
                    const isToday = day.name === 'Fri';
                    return (
                        <div key={day.name} className="flex flex-col items-center">
                            <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center mb-2.5 transition-all duration-500 ${isActive
                                        ? 'bg-[#23C91F] text-white shadow-[0_2px_10px_rgba(35,201,31,0.3)]'
                                        : isToday && !isNewUser
                                            ? 'border-2 border-[#23C91F] text-transparent'
                                            : 'bg-[#EAECEF] text-transparent'
                                    }`}
                            >
                                {isActive && <Check size={14} strokeWidth={4} />}
                            </div>
                            <span className="text-[10px] font-bold text-[#7B7B98] uppercase tracking-wider">{day.name}</span>
                        </div>
                    );
                })}
            </div>

            {/* Bottom row: Steps Progress */}
            <div>
                <div className="text-[10px] font-bold text-[#7B7B98] uppercase tracking-widest mb-1.5">Steps</div>
                <div className="flex justify-between items-end mb-3">
                    <div className="flex items-baseline space-x-1">
                        <span className="text-3xl font-bold text-zinc-900 tracking-tight leading-none">{steps.toLocaleString()}</span>
                        <span className="text-xs font-bold text-[#7B7B98]">/ {goal.toLocaleString()}</span>
                    </div>
                    <span className="text-xs font-bold text-[#7B7B98]">{progress.toFixed(0)}%</span>
                </div>
                {/* Progress bar container */}
                <div className="w-full h-3 bg-[#EAECEF] rounded-full overflow-hidden relative">
                    {/* The glowing bar */}
                    <div
                        className="h-full bg-gradient-to-r from-[#41D83E] to-[#23C91F] rounded-full transition-all duration-[1500ms] ease-out relative"
                        style={{ width: `${animatedWidth}%` }}
                    >
                        {/* Neon glow effect on the bar itself */}
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/30 blur-[2px] rounded-full mix-blend-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
