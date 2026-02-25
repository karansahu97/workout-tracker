import React, { useEffect, useState } from 'react';
import { CheckCircle2, Trophy, Clock, Flame, X } from 'lucide-react';

export default function WorkoutSummary({ onClose }) {
    const summaryData = {
        title: "Upper Body Power",
        duration: "1h 15m",
        kcal: 450,
        volume: 8240,
        prs: 2
    };

    const [isSaving, setIsSaving] = useState(true);

    useEffect(() => {
        // Simulate saving to local storage or state
        const saveTimer = setTimeout(() => {
            setIsSaving(false);
        }, 1000);

        return () => clearTimeout(saveTimer);
    }, []);

    return (
        <div className="fixed inset-0 z-[110] bg-zinc-950 flex flex-col animate-in slide-in-from-bottom-full duration-500">
            {/* Dark/Neon celebratory background */}
            <div className="absolute inset-0 bg-gradient-to-b from-lime-500/10 via-zinc-950 to-zinc-950 pointer-events-none" />

            <div className="flex-1 px-6 py-12 flex flex-col items-center justify-center relative z-10">

                {/* Checkmark Animation Container */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-lime-500 blur-2xl opacity-20 rounded-full animate-pulse" />
                    <div className="w-24 h-24 rounded-full bg-lime-500/10 border border-lime-500/30 flex items-center justify-center relative z-10 animate-in zoom-in duration-500 delay-150">
                        <CheckCircle2 size={48} className="text-lime-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white uppercase tracking-tighter mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
                    Workout <span className="text-lime-500">Completed</span>
                </h1>
                <p className="text-zinc-400 font-medium mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500">
                    {summaryData.title}
                </p>

                {/* Main Stats Grid */}
                <div className="w-full grid grid-cols-2 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-700">
                    <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg">
                        <Clock size={24} className="text-lime-500 mb-3" />
                        <span className="text-2xl font-mono font-bold text-white mb-1">{summaryData.duration}</span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Time</span>
                    </div>

                    <div className="bg-zinc-900 border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center shadow-lg">
                        <Flame size={24} className="text-lime-500 mb-3" />
                        <span className="text-2xl font-mono font-bold text-white mb-1">{summaryData.kcal}</span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Kcal</span>
                    </div>
                </div>

                {/* Highlight/PR Banner */}
                <div className="w-full bg-zinc-900 border border-accent-purple/30 rounded-2xl p-5 mb-10 flex items-center justify-between shadow-[0_0_20px_rgba(167,139,250,0.1)] animate-in fade-in slide-in-from-bottom-8 duration-500 delay-1000">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-accent-purple/10 flex items-center justify-center">
                            <Trophy size={20} className="text-accent-purple" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-0.5">Impressive Load</h3>
                            <p className="text-xs text-zinc-400 font-medium">You moved {summaryData.volume} total.</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-mono font-bold text-accent-purple">{summaryData.prs}</span>
                        <span className="block text-[10px] text-accent-purple/70 font-bold uppercase tracking-widest mt-0.5">New PRs</span>
                    </div>
                </div>

            </div>

            {/* Sticky Action Footer */}
            <div className="p-6 relative z-10 bg-zinc-950 animate-in fade-in slide-in-from-bottom-8 duration-500 delay-1000">
                <button
                    onClick={onClose}
                    disabled={isSaving}
                    className="w-full bg-lime-500 text-zinc-950 font-bold uppercase tracking-widest rounded-full py-5 text-sm shadow-[0_0_30px_rgba(163,230,53,0.2)] active:scale-[0.98] transition-all disabled:opacity-50 flex justify-center items-center"
                >
                    {isSaving ? (
                        <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        "Return to Dashboard"
                    )}
                </button>
            </div>
        </div>
    );
}
