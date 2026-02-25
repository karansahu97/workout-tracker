import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function StepsDetails({ onClose, isNewUser }) {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimated(true), 100);
    }, []);

    // Mock data based on the screenshot, adapted for the user state
    const currentSteps = isNewUser ? 0 : 6825;
    const targetSteps = 10000;
    const progressPct = Math.min((currentSteps / targetSteps) * 100, 100);
    const distanceKm = isNewUser ? "0.00" : "1.88";
    const kcal = isNewUser ? 0 : 106;

    // Weekly top chart mock
    const weekData = [
        { date: '18', height: '10%' },
        { date: '19', height: '20%' },
        { date: '20', height: '80%' },
        { date: '21', height: '15%' },
        { date: '22', height: '60%', isToday: true }, // The red/active day
        { date: '23', height: '10%' },
        { date: '24', height: '50%' },
        { date: '25/2', height: '30%', isSelected: true },
    ];

    // Hourly mock
    const hourlyData = Array(24).fill(0).map((_, i) => {
        if (isNewUser) return 0;
        if (i === 8) return 40;
        if (i === 9) return 10;
        if (i === 13) return 15;
        if (i === 14) return 25;
        if (i === 17) return 90;
        if (i === 18) return 30;
        return Math.random() > 0.7 ? Math.random() * 5 : 0;
    });

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in slide-in-from-right-full duration-300 pb-10">
            {/* Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-4 py-4 flex items-center justify-between border-b border-black/5">
                <div className="flex items-center space-x-4">
                    <button onClick={onClose} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-900 active:bg-zinc-100 transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold text-zinc-900 tracking-tight">Steps</h1>
                </div>
            </div>

            <div className="px-4 mt-6">
                {/* Top Weekly Bar Chart */}
                <div className="relative h-40 mb-8 border-b border-black/5 flex items-end pb-8">
                    {/* Y-axis Labels */}
                    <div className="absolute right-0 top-0 bottom-8 flex flex-col justify-between text-[10px] font-bold text-[#23C91F] opacity-80 text-right">
                        <span>10,000</span>
                        <span className="text-[#7B7B98]">5,000</span>
                        <span></span>
                    </div>

                    {/* Dotted target line */}
                    <div className="absolute top-0 left-0 right-8 border-t border-dashed border-[#23C91F]/30" />

                    {/* Bars */}
                    <div className="flex justify-between items-end w-full pr-12 h-full">
                        {weekData.map((day, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-end h-full">
                                <div className="w-3 bg-zinc-300 rounded-full relative overflow-hidden" style={{ height: '70px' }}>
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 rounded-full transition-all duration-1000 ${day.isSelected ? 'bg-[#23C91F]' : 'bg-zinc-300'}`}
                                        style={{ height: animated ? day.height : '0%' }}
                                    />
                                </div>
                                <div className="mt-3 relative w-full flex justify-center">
                                    {day.isSelected && (
                                        <div className="absolute -inset-x-3 -inset-y-1.5 bg-zinc-900 rounded-2xl -z-10 shadow-lg" />
                                    )}
                                    <span className={`text-[11px] font-bold ${day.isToday ? 'text-[#FA2F68]' : day.isSelected ? 'text-white' : 'text-[#7B7B98]'}`}>
                                        {day.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Steps Card */}
                <div className="bg-surface rounded-3xl p-6 shadow-soft border border-black/5 mb-4">
                    <div className="text-center mb-6 mt-2">
                        <span className="text-[40px] font-bold tracking-tight text-zinc-900">{currentSteps.toLocaleString()}</span>
                        <span className="text-sm font-bold text-[#7B7B98] ml-2">steps</span>
                    </div>

                    <div className="relative w-full h-8 bg-[#EAECEF] rounded-full mb-2 overflow-hidden shadow-inner">
                        <div
                            className="absolute top-0 bottom-0 left-0 bg-[#23C91F] rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${animated ? progressPct : 0}%` }}
                        />
                    </div>

                    <div className="flex justify-between items-center text-[11px] font-bold text-[#7B7B98] mb-6">
                        <span>0</span>
                        <span>Target: {targetSteps.toLocaleString()}</span>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-black/5 border-t border-black/5 pt-6">
                        <div className="text-center">
                            <span className="text-lg font-bold text-zinc-900">{distanceKm}</span>
                            <span className="text-xs font-bold text-[#7B7B98] ml-1">km</span>
                        </div>
                        <div className="text-center">
                            <span className="text-lg font-bold text-zinc-900">{kcal}</span>
                            <span className="text-xs font-bold text-[#7B7B98] ml-1">kcal</span>
                        </div>
                    </div>
                </div>

                {/* Steps by time of day Card */}
                <div className="bg-surface rounded-3xl p-6 shadow-soft border border-black/5 mb-2">
                    <h3 className="text-sm font-bold text-zinc-900 mb-6">Steps by time of day</h3>

                    <div className="h-32 flex items-end justify-between border-b border-black/5 pb-2 relative">
                        {hourlyData.map((val, idx) => (
                            <div
                                key={idx}
                                className="w-1.5 bg-[#23C91F] rounded-t-full rounded-b-[1px] transition-all duration-1000 origin-bottom"
                                style={{ height: animated ? `${val}%` : '0%' }}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-bold text-[#7B7B98] mt-2">
                        <span>12 am</span>
                        <span>6 am</span>
                        <span>12 pm</span>
                        <span>6 pm</span>
                        <span>(h)</span>
                    </div>
                </div>

                <p className="text-[10px] text-right font-medium text-[#7B7B98] mb-4 pr-2">
                    All steps, Updated 7:30 pm
                </p>

                {/* Compare my steps Card */}
                <div className="bg-surface rounded-3xl p-6 shadow-soft border border-black/5 mb-6">
                    <h3 className="text-sm font-bold text-zinc-900 mb-4">Compare my steps</h3>
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-[11px] font-bold text-[#7B7B98] uppercase tracking-wider block mb-1">Avg.</span>
                            <span className="text-2xl font-bold text-zinc-900 tracking-tight">{isNewUser ? 0 : '2,527'}</span>
                        </div>

                        <div className="flex items-end mb-1">
                            <div className="flex flex-col items-center mr-1">
                                <div className="w-10 bg-[#23C91F] rounded-sm transition-all duration-1000 origin-bottom" style={{ height: animated && !isNewUser ? '30px' : '0px' }} />
                                <span className="text-[9px] font-bold text-[#7B7B98] mt-2">Me</span>
                            </div>
                            <div className="flex flex-col items-center mr-1">
                                <div className="w-10 bg-[#EAECEF] rounded-sm transition-all duration-1000 origin-bottom" style={{ height: animated ? '45px' : '0px' }} />
                                <span className="text-[9px] font-bold text-[#7B7B98] mt-2">20-29</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-10 bg-[#D1D5DB] rounded-sm transition-all duration-1000 origin-bottom" style={{ height: animated ? '60px' : '0px' }} />
                                <span className="text-[9px] font-bold text-[#7B7B98] mt-2">Everyone</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
