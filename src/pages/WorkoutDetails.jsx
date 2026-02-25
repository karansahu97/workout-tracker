import React, { useState } from 'react';
import { ChevronLeft, Clock, Dumbbell, Flame, CheckCircle2, ChevronRight } from 'lucide-react';
import ExerciseDetails from './ExerciseDetails';

export default function WorkoutDetails({ workout, onBack }) {
    const [selectedExercise, setSelectedExercise] = useState(null);

    if (!workout) return null;

    const exercisesList = workout.exercisesList || [];

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
        <div className="fixed inset-0 bg-[#F4F5F7] z-50 animate-in slide-in-from-right-full duration-300 overflow-y-auto pb-28">
            <header className="sticky top-0 z-50 bg-[#F4F5F7]/90 backdrop-blur-md border-b border-black/5">
                <div className="flex items-center justify-between p-4 px-2">
                    <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-900 active:bg-zinc-200 transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-sm font-bold uppercase tracking-widest text-zinc-900 absolute left-1/2 -translate-x-1/2">
                        Workout Log
                    </h1>
                </div>
            </header>

            <main className="px-4 py-8">
                {/* Header Information */}
                <div className="mb-8">
                    <span className="text-sm font-bold text-zinc-500 block mb-3">{workout.date}</span>
                    <h2 className="text-[28px] font-bold tracking-tight text-zinc-900 mb-6 leading-tight">{workout.title}</h2>

                    <div className="flex flex-wrap gap-2 mb-8">
                        {workout.activeTags?.map((tag, idx) => (
                            <span
                                key={idx}
                                className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-opacity-50 ${getTagStyles(tag)}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Compressed Stats Row (Replacing the 3 massive cards) */}
                    <div className="grid grid-cols-3 border-y border-black/5 py-4">
                        <div className="flex flex-col items-center border-r border-black/5">
                            <Clock size={16} className="text-[#419EF9] mb-1.5 stroke-[2.5px]" />
                            <div className="text-xl font-bold font-mono tracking-tight text-zinc-900">{workout.duration}</div>
                            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Time</div>
                        </div>
                        <div className="flex flex-col items-center border-r border-black/5">
                            <Flame size={16} className="text-[#FA2F68] mb-1.5 stroke-[2.5px]" />
                            <div className="text-xl font-bold font-mono tracking-tight text-zinc-900">{workout.kcal}</div>
                            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Kcal</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Dumbbell size={16} className="text-[#23C91F] mb-1.5 stroke-[2.5px]" />
                            <div className="text-xl font-bold font-mono tracking-tight text-zinc-900">{workout.movedKg}</div>
                            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Kg</div>
                        </div>
                    </div>
                </div>

                {/* Exercises Log */}
                <div>
                    <div className="flex items-center justify-between mb-4 px-1">
                        <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Exercises Log</h3>
                        <span className="text-[10px] font-bold text-[#23C91F] bg-[#23C91F]/10 px-2 py-1 rounded uppercase">{exercisesList.length} Exercises</span>
                    </div>
                    <div className="space-y-3">
                        {exercisesList.map((ex, idx) => (
                            <div
                                key={ex.id || idx}
                                onClick={() => setSelectedExercise(ex)}
                                className="bg-white rounded-[20px] p-5 shadow-sm border border-black/5 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:bg-zinc-50"
                            >
                                <div className="flex-1 flex items-start space-x-4">
                                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#23C91F]/10 flex items-center justify-center text-[#23C91F] mt-0.5 shadow-sm">
                                        <CheckCircle2 size={16} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-bold text-zinc-900 mb-1 leading-tight">{ex.name}</h4>
                                        <div className="flex items-center text-[13px] font-medium text-zinc-400">
                                            <span>{ex.sets || '3 sets'}</span>
                                            <span className="mx-2 text-zinc-300">•</span>
                                            <span className="font-mono font-bold text-zinc-500">{ex.weight || 'Logged'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-zinc-300 ml-4">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {selectedExercise && (
                <ExerciseDetails
                    exercise={selectedExercise}
                    onBack={() => setSelectedExercise(null)}
                />
            )}
        </div>
    );
}
