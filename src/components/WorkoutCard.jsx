import React from 'react';
import { Clock, ChevronRight, Flame, Dumbbell, Activity, PersonStanding } from 'lucide-react';

export default function WorkoutCard({ date, duration, activeTags = [], kcal, movedKg, exercises, onClick }) {

    // Helper to pick border and text color for tags based on the tag name
    const getTagStyles = (tag) => {
        const upperTag = tag.toUpperCase();
        switch (upperTag) {
            case 'BACK':
            case 'CHEST':
                return 'border-[#23C91F] text-[#23C91F]'; // Lime Green
            case 'CORE':
                return 'border-purple-500 text-purple-600';
            case 'LEGS':
                return 'border-[#419EF9] text-[#419EF9]'; // Electric Blue
            case 'SHOULDERS':
                return 'border-[#FA2F68] text-[#FA2F68]'; // Neon Crimson
            case 'TRICEPS':
            case 'BICEPS':
                return 'border-orange-500 text-orange-600';
            default:
                return 'border-zinc-400 text-zinc-500';
        }
    };

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-[24px] p-5 shadow-sm border border-black/5 mb-4 flex flex-col cursor-pointer active:scale-[0.98] transition-all hover:bg-zinc-50"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className="text-sm font-bold text-zinc-500 block mb-1">{date}</span>
                    <div className="flex items-center text-zinc-900 tracking-tight">
                        <Clock size={18} className="mr-2" strokeWidth={2.5} />
                        <span className="text-2xl font-bold font-mono">{duration}</span>
                    </div>
                </div>
                <div className="text-zinc-300 mt-2">
                    <ChevronRight size={24} />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 border-b border-black/5 pb-5">
                {/* Total Kcal */}
                <div>
                    <div className="flex items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                        <Flame size={12} className="mr-1" />
                        Total
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-xl font-bold text-zinc-900 tracking-tight">{kcal}</span>
                        <span className="text-[10px] font-bold text-zinc-500 ml-1">KCAL</span>
                    </div>
                </div>

                {/* Moved Kg */}
                <div>
                    <div className="flex items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                        <Dumbbell size={12} className="mr-1" />
                        Moved
                    </div>
                    <div className="flex items-baseline">
                        <span className="text-xl font-bold text-zinc-900 tracking-tight">{movedKg}</span>
                        <span className="text-[10px] font-bold text-zinc-500 ml-1">KG</span>
                    </div>
                </div>

                {/* Exercises */}
                <div>
                    <div className="flex items-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                        <PersonStanding size={12} className="mr-1" />
                        Exercises
                    </div>
                    <div className="text-xl font-bold text-zinc-900 tracking-tight">
                        {exercises}
                    </div>
                </div>
            </div>

            {/* Muscle Group Tags */}
            <div className="flex flex-wrap gap-2">
                {activeTags.map((tag, idx) => (
                    <span
                        key={idx}
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-opacity-50 ${getTagStyles(tag)}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
