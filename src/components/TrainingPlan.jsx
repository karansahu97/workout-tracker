import React from 'react';
import { Dumbbell, Flame } from 'lucide-react';

export default function TrainingPlan({ title, duration, level, onClick }) {
    return (
        <div
            onClick={onClick}
            className="relative overflow-hidden rounded-2xl p-5 mb-4 text-white shadow-soft transition-transform active:scale-[0.98] cursor-pointer"
            style={{ background: 'linear-gradient(90deg, #A3E635 0%, #65A30D 100%)' }}>

            {/* Background Icon */}
            <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                <Dumbbell size={120} />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex items-center space-x-2 text-lime-100 text-xs font-bold uppercase tracking-wider mb-2">
                        <Flame size={14} className="text-white" />
                        <span>{level}</span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-6">{title}</h3>
                </div>

                <div className="flex items-end justify-between">
                    <div className="text-xs font-medium text-lime-100 bg-black/20 px-3 py-1.5 rounded-full inline-block backdrop-blur-sm">
                        {duration}
                    </div>
                </div>
            </div>
        </div>
    );
}
