import React from 'react';
import { Bike, Orbit, Footprints } from 'lucide-react';

export default function MyExercises() {
    return (
        <div className="mb-8 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-zinc-900 uppercase tracking-widest">My exercises</h2>
                <button className="text-[10px] font-bold text-lime-500 hover:text-lime-600 uppercase tracking-wider transition-colors">
                    View More
                </button>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 w-full">
                <div className="flex justify-between items-center sm:justify-around text-center">

                    {/* Bike */}
                    <div className="flex flex-col items-center flex-1 cursor-pointer group">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-3 group-hover:bg-[#23C91F] group-hover:text-white group-active:scale-95 transition-all text-zinc-600">
                            <Bike size={32} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors">Bike</span>
                    </div>

                    {/* Treadmill */}
                    <div className="flex flex-col items-center flex-1 cursor-pointer group">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-3 group-hover:bg-[#419EF9] group-hover:text-white group-active:scale-95 transition-all text-zinc-600">
                            {/* Using Footprints as a highly energetic alternative for 'Treadmill' since Lucide lacks a specific treadmill icon */}
                            <Footprints size={28} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors">Treadmill</span>
                    </div>

                    {/* Elliptical trainer */}
                    <div className="flex flex-col items-center flex-1 cursor-pointer group">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-100 flex items-center justify-center mb-3 group-hover:bg-[#FA2F68] group-hover:text-white group-active:scale-95 transition-all text-zinc-600">
                            <Orbit size={32} strokeWidth={1.5} />
                        </div>
                        <span className="text-xs font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors hidden sm:block">Elliptical trainer</span>
                        <span className="text-xs font-semibold text-zinc-600 group-hover:text-zinc-900 transition-colors sm:hidden">Elliptical</span>
                    </div>

                </div>
            </div>
        </div>
    );
}
