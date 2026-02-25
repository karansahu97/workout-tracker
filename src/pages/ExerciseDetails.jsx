import React, { useState } from 'react';
import { ChevronLeft, Edit2, ChevronRight, Play, AlertTriangle } from 'lucide-react';

export default function ExerciseDetails({ exercise, onBack }) {
    // Mock Historical Data for the UI
    const historicalData = [
        {
            date: "16 Feb 2026 at 14:53",
            sets: [
                { kg: "80.0", reps: 5, sets: 5 }
            ]
        },
        {
            date: "9 Feb 2026 at 16:22",
            sets: [
                { kg: "60.0", reps: 10, sets: 1 },
                { kg: "80.0", reps: 5, sets: 5 }
            ]
        },
        {
            date: "2 Feb 2026 at 14:39",
            sets: [
                { kg: "60.0", reps: 10, sets: 1 },
                { kg: "75.0", reps: 6, sets: 5 }
            ]
        },
        {
            date: "28 Jan 2026 at 10:37",
            sets: [
                { kg: "60.0", reps: 10, sets: 1 },
                { kg: "75.0", reps: 5, sets: 5 }
            ]
        }
    ];

    const [activeTab, setActiveTab] = useState('Year');

    return (
        <div className="absolute inset-0 bg-[#F5F5F5] z-[100] animate-in slide-in-from-right-full duration-300 overflow-y-auto pb-6">

            {/* Light Top Background Area */}
            <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white to-[#F5F5F5] pointer-events-none z-0" />

            {/* Header */}
            <header className="relative z-10 sticky top-0 px-4 py-4 flex items-center justify-between glass">
                <button
                    onClick={onBack}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-900 border border-black/5 shadow-sm active:scale-95 transition-transform"
                >
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-lg font-bold font-mono text-zinc-900 tracking-widest uppercase">{exercise.name}</h1>
                <button className="w-10 h-10 rounded-full bg-lime-400 flex items-center justify-center text-zinc-950 active:scale-95 transition-transform shadow-lg shadow-lime-500/20">
                    <Edit2 size={18} className="fill-current" />
                </button>
            </header>

            <main className="relative z-10 px-4 pt-4">

                {/* Video Placeholder */}
                <div className="relative w-full aspect-[4/3] bg-zinc-900 rounded-3xl overflow-hidden mb-8 shadow-soft border border-black/5">
                    <video
                        className="w-full h-full object-cover opacity-90"
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800"
                    >
                        {/* A generic reliable video for placeholder purposes */}
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-man-training-with-barbell-in-gym-22444-large.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
                        <button className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white cursor-pointer pointer-events-auto shadow-lg active:scale-95 transition-transform">
                            <Play size={32} className="ml-1 fill-current" />
                        </button>
                    </div>
                </div>

                {/* Instructions & Cautions */}
                <div className="mb-10 space-y-6">
                    <div>
                        <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3">Steps to follow</h3>
                        <ol className="list-decimal pl-5 text-sm text-zinc-800 space-y-2 font-medium">
                            <li>Lie back on a flat bench. Using a medium width grip, lift the bar from the rack and hold it over you.</li>
                            <li>Breathe in and begin coming down slowly until the bar touches your middle chest.</li>
                            <li>After a brief pause, push the bar back to the starting position as you breathe out, focusing on your chest muscles.</li>
                            <li>Lock your arms at the top, hold for a second, and then start coming down slowly again.</li>
                        </ol>
                    </div>

                    <div className="bg-accent-crimson/5 border border-accent-crimson/20 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle size={16} className="text-accent-crimson" />
                            <h3 className="text-sm font-bold text-accent-crimson uppercase tracking-wider">Caution</h3>
                        </div>
                        <p className="text-xs text-accent-crimson/90 font-medium leading-relaxed">
                            If you are new to this exercise, it is advised that you use a spotter. If no spotter is available, be conservative with the amount of weight used. Beware of letting the bar drift too far forward or backward in order to avoid shoulder injury.
                        </p>
                    </div>
                </div>

                {/* Most Recent Section */}
                <div className="mb-8">
                    <h3 className="text-zinc-500 font-bold text-[10px] tracking-widest uppercase mb-1">Most recent performance</h3>
                    <p className="text-zinc-400 font-mono text-xs mb-3">{historicalData[0].date}</p>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-surface rounded-2xl p-4 flex flex-col items-center justify-center shadow-soft border border-black/5">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">KG</span>
                            <span className="text-xl font-mono font-bold text-zinc-900">{historicalData[0].sets[0].kg}</span>
                        </div>
                        <div className="bg-surface rounded-2xl p-4 flex flex-col items-center justify-center shadow-soft border border-black/5">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Reps</span>
                            <span className="text-xl font-mono font-bold text-zinc-900">{historicalData[0].sets[0].reps}</span>
                        </div>
                        <div className="bg-surface rounded-2xl p-4 flex flex-col items-center justify-center shadow-soft border border-black/5">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Sets</span>
                            <span className="text-xl font-mono font-bold text-zinc-900">{historicalData[0].sets[0].sets}</span>
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="mb-10 bg-surface rounded-3xl p-5 shadow-soft border border-black/5">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Progress Chart</h3>
                        <span className="text-xs font-mono text-lime-600 bg-lime-100 px-2 py-1 rounded-full font-bold">+5.2kg / mo</span>
                    </div>

                    <div className="h-40 w-full relative mb-6 flex items-end">
                        {/* Background Grid Lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                            {[100, 75, 50, 25, 0].map((val, i) => (
                                <div key={i} className="flex items-center w-full">
                                    <div className="h-[1px] bg-black/5 flex-1" />
                                    <span className="text-[10px] font-mono text-zinc-400 ml-2 w-6">{val}</span>
                                </div>
                            ))}
                        </div>

                        {/* Mock SVG Line Chart */}
                        <div className="absolute inset-0 right-8 bottom-0 pb-[10%] pt-[5%]">
                            <svg className="w-full h-full text-lime-500 drop-shadow-sm" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <path d="M0,80 Q10,60 20,70 T40,60 T60,50 T75,55 L80,20 L85,60 L90,40 L100,45" fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
                                {/* Soft Fill Under Line */}
                                <path d="M0,80 Q10,60 20,70 T40,60 T60,50 T75,55 L80,20 L85,60 L90,40 L100,45 L100,100 L0,100 Z" fill="url(#gradient)" opacity="0.15" />
                                <defs>
                                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#A3E635" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        {/* Tooltip mockup */}
                        <div className="absolute left-[40%] bottom-[30%] bg-zinc-900 text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-lg shadow-lg">
                            28 Jan 2026: 75kg
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 rotate-45"></div>
                        </div>
                    </div>

                    {/* Chart Tabs */}
                    <div className="bg-zinc-100 rounded-full p-1 flex">
                        {['Week', 'Month', 'Year', 'All time'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 text-[11px] font-bold uppercase tracking-wider py-2 rounded-full transition-shadow duration-200 ${activeTab === tab ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Latest Note */}
                <div className="mb-10">
                    <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-3">Latest Note</h3>
                    <div className="bg-surface rounded-2xl p-4 shadow-soft border border-black/5 flex items-center justify-between cursor-pointer group hover:bg-zinc-50 transition-colors">
                        <span className="text-zinc-900 font-bold group-hover:text-lime-600 transition-colors">Add your coaching note here...</span>
                        <ChevronRight size={18} className="text-zinc-400 group-hover:text-lime-600" />
                    </div>
                </div>

                {/* Historical Data List */}
                <div>
                    <h3 className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-4">Historical Data</h3>
                    <div className="space-y-6">
                        {historicalData.map((session, i) => (
                            <div key={i}>
                                <h4 className="text-xs font-mono font-bold text-zinc-500 mb-3 uppercase tracking-wider">{session.date}</h4>
                                <div className="space-y-2">
                                    {session.sets.map((set, j) => (
                                        <div key={j} className="grid grid-cols-3 gap-3">
                                            <div className="bg-surface rounded-xl p-3 flex flex-col items-center justify-center shadow-soft border border-black/5">
                                                <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">KG</span>
                                                <span className="text-lg font-mono font-bold text-zinc-900">{set.kg}</span>
                                            </div>
                                            <div className="bg-surface rounded-xl p-3 flex flex-col items-center justify-center shadow-soft border border-black/5">
                                                <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Reps</span>
                                                <span className="text-lg font-mono font-bold text-zinc-900">{set.reps}</span>
                                            </div>
                                            <div className="bg-surface rounded-xl p-3 flex flex-col items-center justify-center shadow-soft border border-black/5">
                                                <span className="text-[8px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Sets</span>
                                                <span className="text-lg font-mono font-bold text-zinc-900">{set.sets}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
