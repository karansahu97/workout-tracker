import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, MoreVertical, Star, Bike, Footprints, Orbit, Dumbbell, Activity, PersonStanding, Flame } from 'lucide-react';

export default function ExercisesList() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimated(true), 100);
    }, []);

    const favourites = [
        { id: 1, name: 'Bike', icon: <Bike size={24} strokeWidth={1.5} /> },
        { id: 2, name: 'Treadmill', icon: <Footprints size={24} strokeWidth={1.5} /> },
        { id: 3, name: 'Elliptical trainer', icon: <Orbit size={24} strokeWidth={1.5} /> },
    ];

    const moreExercises = [
        { id: 4, name: 'Other workout', icon: <Activity size={24} strokeWidth={1.5} /> },
        { id: 5, name: 'Crunches', icon: <Flame size={24} strokeWidth={1.5} /> },
        { id: 6, name: 'Walking', icon: <PersonStanding size={24} strokeWidth={1.5} /> },
        { id: 7, name: 'Arm curls', icon: <Dumbbell size={24} strokeWidth={1.5} /> },
        { id: 8, name: 'Running', icon: <Activity size={24} strokeWidth={1.5} /> },
        { id: 9, name: 'Arm extensions', icon: <Dumbbell size={24} strokeWidth={1.5} /> },
        { id: 10, name: 'High knees', icon: <PersonStanding size={24} strokeWidth={1.5} /> },
        { id: 11, name: 'Push-ups', icon: <Flame size={24} strokeWidth={1.5} /> },
        { id: 12, name: 'Circuit training', icon: <Orbit size={24} strokeWidth={1.5} /> },
    ];

    return (
        <div className="animate-in fade-in duration-500 pb-10">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-zinc-900 tracking-tight uppercase">Library</h1>
                </div>
                <div className="flex items-center space-x-1 text-zinc-900">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center active:bg-zinc-200 transition-colors">
                        <Plus size={24} />
                    </button>
                    <button className="w-10 h-10 rounded-full flex items-center justify-center -mr-2 active:bg-zinc-200 transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            <div className="px-4 mt-6">

                {/* Favourites Section */}
                <div className={`mb-8 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h3 className="text-xs font-bold text-zinc-500 mb-3 px-2">Favourites</h3>
                    <div className="bg-white rounded-[24px] shadow-sm border border-black/5 overflow-hidden">
                        {favourites.map((exercise, index) => (
                            <div key={exercise.id} className="relative">
                                <div className="flex items-center justify-between p-4 active:bg-zinc-50 transition-colors cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-[#23C91F]">
                                            {exercise.icon}
                                        </div>
                                        <span className="text-base font-semibold text-zinc-900 tracking-tight">{exercise.name}</span>
                                    </div>
                                    <div className="flex items-center h-full">
                                        <div className="h-6 w-px bg-zinc-200 mr-4" />
                                        <Star size={22} className="fill-yellow-400 text-yellow-400" />
                                    </div>
                                </div>
                                {index < favourites.length - 1 && (
                                    <div className="absolute bottom-0 left-[60px] right-0 h-px bg-zinc-100" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* More Exercises Section */}
                <div className={`transition-all duration-700 delay-100 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <h3 className="text-xs font-bold text-zinc-500 mb-3 px-2">More exercises</h3>
                    <div className="bg-white rounded-[24px] shadow-sm border border-black/5 overflow-hidden">
                        {moreExercises.map((exercise, index) => (
                            <div key={exercise.id} className="relative">
                                <div className="flex items-center justify-between p-4 active:bg-zinc-50 transition-colors cursor-pointer">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-[#23C91F]">
                                            {exercise.icon}
                                        </div>
                                        <span className="text-base font-semibold text-zinc-900 tracking-tight">{exercise.name}</span>
                                    </div>
                                    <div className="flex items-center h-full">
                                        <div className="h-6 w-px bg-zinc-200 mr-4" />
                                        <Star size={22} className="text-zinc-300 hover:text-yellow-400 hover:fill-yellow-400 transition-colors" />
                                    </div>
                                </div>
                                {index < moreExercises.length - 1 && (
                                    <div className="absolute bottom-0 left-[60px] right-0 h-px bg-zinc-100" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
