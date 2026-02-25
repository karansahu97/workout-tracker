import React, { useState, useEffect } from 'react';
import { ChevronLeft, Clock, Flame, Dumbbell } from 'lucide-react';

export default function WorkoutDetails({ workout, onBack }) {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimated(true), 100);
    }, []);

    if (!workout) return null;

    const exercisesList = workout.exercisesList || [];

    // Map tags to brand colors
    const getTagStyles = (tag) => {
        const t = tag?.toUpperCase() || "";
        if (t === "LEGS") return "bg-[#E3F2FD] text-[#419EF9]"; // Blue
        if (t === "CARDIO") return "bg-[#FFEBEE] text-[#FA2F68]"; // Crimson
        if (t === "FULL BODY") return "bg-[#F3E5F5] text-[#9C27B0]"; // Purple
        if (t === "CHEST") return "bg-[#E8F5E9] text-[#23C91F]"; // Green
        return "bg-[#FFF3E0] text-[#FF9800]"; // Orange/Back default
    };

    return (
        <div className="fixed inset-0 z-50 bg-[#F4F5F7] animate-in slide-in-from-right-full duration-300 overflow-y-auto pb-28">
            <header className="sticky top-0 z-50 bg-[#F4F5F7]/90 backdrop-blur-md">
                <div className="flex items-center justify-between p-4">
                    <button onClick={onBack} className="p-2 -ml-2 text-zinc-900 active:scale-90 transition-transform rounded-full active:bg-zinc-200">
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-900 absolute left-1/2 -translate-x-1/2">
                        Details
                    </h1>
                </div>
            </header>

            <main className="px-4 py-2">
                <div className={`transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex items-center justify-between mb-4 mt-2">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${getTagStyles(workout.activeTag)}`}>
                            {workout.activeTag || 'WORKOUT'}
                        </span>
                        <span className="text-xs font-semibold text-zinc-400">{workout.date}</span>
                    </div>

                    <h2 className="text-[28px] font-bold tracking-tight text-zinc-900 mb-8 leading-tight">
                        {workout.title}
                    </h2>

                    <div className="grid grid-cols-3 gap-3 mb-10">
                        {/* Time Card */}
                        <div className="bg-white rounded-[20px] p-4 shadow-sm border border-black/5 flex flex-col justify-between aspect-square">
                            <Clock size={18} className="text-[#23C91F] mb-4" strokeWidth={2} />
                            <div>
                                <div className="text-lg font-bold font-mono text-zinc-900 tracking-tight">
                                    {workout.duration.replace('h', 'h ').replace('m', 'm')}
                                </div>
                                <div className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold mt-1">Time</div>
                            </div>
                        </div>

                        {/* Kcal Card */}
                        <div className="bg-white rounded-[20px] p-4 shadow-sm border border-black/5 flex flex-col justify-between aspect-square">
                            <Flame size={18} className="text-[#23C91F] mb-4" strokeWidth={2} />
                            <div>
                                <div className="text-lg font-bold font-mono text-zinc-900 tracking-tight">{workout.kcal}</div>
                                <div className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold mt-1">Kcal</div>
                            </div>
                        </div>

                        {/* Kg Moved Card */}
                        <div className="bg-white rounded-[20px] p-4 shadow-sm border border-black/5 flex flex-col justify-between aspect-square">
                            <Dumbbell size={18} className="text-[#23C91F] mb-4" strokeWidth={2} />
                            <div>
                                <div className="text-lg font-bold font-mono text-zinc-900 tracking-tight">{workout.movedKg}</div>
                                <div className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold mt-1">Kg Moved</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`transition-all duration-700 delay-100 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-[0.15em] mb-4 px-1">Exercises</h3>
                    <div className="space-y-3">
                        {exercisesList.map((ex, index) => (
                            <div
                                key={ex.id || index}
                                onClick={() => setSelectedExercise(ex)}
                                className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:bg-zinc-50"
                            >
                                <h4 className="text-[15px] font-bold text-zinc-900 tracking-tight">{ex.name}</h4>
                                <div className="w-[22px] h-[22px] rounded-full border-[2.5px] border-zinc-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
