import React, { useEffect, useState } from 'react';
import { Footprints, Clock, Flame } from 'lucide-react';

export default function ActivityRings({ isNewUser, onClick }) {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        // Trigger the ring animation slightly after mount for a smooth fill effect
        const timer = setTimeout(() => setAnimated(true), 150);
        return () => clearTimeout(timer);
    }, []);

    // Values matched to the reference screenshot
    const displaySteps = isNewUser ? 0 : 6825;
    const displayMins = isNewUser ? 0 : 25;
    const displayKcal = isNewUser ? 0 : 106;

    const stepsGoal = 10000; // Calibrated to hit roughly the same ~75% ring position as screenshot
    const minsGoal = 50;    // ~50%
    const kcalGoal = 400;   // ~25%

    const stepsPct = Math.min((displaySteps / stepsGoal) * 100, 100);
    const minsPct = Math.min((displayMins / minsGoal) * 100, 100);
    const kcalPct = Math.min((displayKcal / kcalGoal) * 100, 100);

    const r1 = 50; const c1 = 2 * Math.PI * r1;
    const r2 = 36; const c2 = 2 * Math.PI * r2;
    const r3 = 22; const c3 = 2 * Math.PI * r3;

    return (
        <div
            onClick={onClick}
            className={`bg-white rounded-3xl p-6 shadow-sm border border-black/5 mb-6 w-full flex items-center justify-between animate-in fade-in duration-500 overflow-hidden ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''}`}
        >
            {/* Left side: Metrics */}
            <div className="flex flex-col space-y-4">
                {/* Steps */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#23C91F] text-white flex items-center justify-center shadow-sm">
                        <Footprints size={14} strokeWidth={3} className="rotate-[-25deg]" />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-zinc-900 tracking-tight">{displaySteps.toLocaleString()}</span>
                        <span className="text-sm font-semibold text-[#7B7B98] ml-1.5">steps</span>
                    </div>
                </div>

                {/* Mins */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#419EF9] text-white flex items-center justify-center shadow-sm">
                        <Clock size={16} strokeWidth={3} />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-zinc-900 tracking-tight">{displayMins}</span>
                        <span className="text-sm font-semibold text-[#7B7B98] ml-1.5">mins</span>
                    </div>
                </div>

                {/* Kcal */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#FA2F68] text-white flex items-center justify-center shadow-sm">
                        <Flame size={16} strokeWidth={3} />
                    </div>
                    <div>
                        <span className="text-xl font-bold text-zinc-900 tracking-tight">{displayKcal}</span>
                        <span className="text-sm font-semibold text-[#7B7B98] ml-1.5">kcal</span>
                    </div>
                </div>
            </div>

            {/* Right side: SVG Concentric Rings */}
            <div className="relative w-[120px] h-[120px] mr-1 flex-shrink-0">
                <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90 origin-center drop-shadow-sm">
                    {/* Background Tracks (20% opacity of the main bright colors) */}
                    <circle cx="60" cy="60" r={r1} fill="none" stroke="rgba(35, 201, 31, 0.15)" strokeWidth="12" />
                    <circle cx="60" cy="60" r={r2} fill="none" stroke="rgba(65, 158, 249, 0.15)" strokeWidth="12" />
                    <circle cx="60" cy="60" r={r3} fill="none" stroke="rgba(250, 47, 104, 0.15)" strokeWidth="12" />

                    {/* Animated Progress Rings */}
                    <circle cx="60" cy="60" r={r1} fill="none" stroke="#23C91F" strokeWidth="12" strokeLinecap="round" strokeDasharray={c1} strokeDashoffset={animated ? c1 - (stepsPct / 100) * c1 : c1} className="transition-all duration-[1500ms] ease-out" />
                    <circle cx="60" cy="60" r={r2} fill="none" stroke="#419EF9" strokeWidth="12" strokeLinecap="round" strokeDasharray={c2} strokeDashoffset={animated ? c2 - (minsPct / 100) * c2 : c2} className="transition-all duration-[1500ms] ease-out delay-150" />
                    <circle cx="60" cy="60" r={r3} fill="none" stroke="#FA2F68" strokeWidth="12" strokeLinecap="round" strokeDasharray={c3} strokeDashoffset={animated ? c3 - (kcalPct / 100) * c3 : c3} className="transition-all duration-[1500ms] ease-out delay-300" />
                </svg>
            </div>
        </div>
    );
}
