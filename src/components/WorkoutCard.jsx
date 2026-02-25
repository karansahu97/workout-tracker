import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

export default function WorkoutCard({ date, duration, activeTag, title, kcal, movedKg, exercises, onClick }) {
    return (
        <div
            onClick={onClick}
            className="bg-surface rounded-2xl p-5 shadow-soft mb-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:bg-zinc-50"
        >
            <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-zinc-400">{date}</span>
                    <div className="flex items-center text-xs text-zinc-400 space-x-1">
                        <Clock size={12} />
                        <span>{duration}</span>
                    </div>
                </div>

                <h3 className="text-base font-bold text-zinc-900 mb-3">{title}</h3>

                <div className="flex items-center space-x-2 mb-3">
                    {(() => {
                        let colorClass = "bg-accent-orange/10 text-accent-orange"; // default
                        if (activeTag === "Legs") colorClass = "bg-accent-blue/10 text-accent-blue";
                        if (activeTag === "Cardio") colorClass = "bg-accent-crimson/10 text-accent-crimson";
                        if (activeTag === "Full Body") colorClass = "bg-accent-purple/10 text-accent-purple";

                        return (
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${colorClass}`}>
                                {activeTag}
                            </span>
                        );
                    })()}
                </div>

                <div className="grid grid-cols-3 gap-2 text-left">
                    <div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wide mb-1">KCAL</div>
                        <div className="text-sm font-mono font-medium">{kcal}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wide mb-1">KG MOVED</div>
                        <div className="text-sm font-mono font-medium">{movedKg}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wide mb-1">EXERCISES</div>
                        <div className="text-sm font-mono font-medium">{exercises}</div>
                    </div>
                </div>
            </div>

            <div className="ml-4 text-zinc-300">
                <ChevronRight size={20} />
            </div>
        </div>
    );
}
