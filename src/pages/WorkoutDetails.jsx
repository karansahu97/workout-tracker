import React, { useState } from 'react';
import { ChevronLeft, Clock, Dumbbell, Flame, CheckCircle2 } from 'lucide-react';
import ExerciseDetails from './ExerciseDetails';

export default function WorkoutDetails({ workout, onBack }) {
    const [selectedExercise, setSelectedExercise] = useState(null);

    if (!workout) return null;

    const exercisesList = workout.exercisesList || [];

    return (
        <div className="absolute inset-0 bg-primary-dark z-50 animate-in slide-in-from-right-full duration-200 overflow-y-auto pb-28">
            <header className="sticky top-0 z-50 glass">
                <div className="flex items-center justify-between p-4">
                    <button onClick={onBack} className="p-2 -ml-2 text-zinc-900 active:scale-90 transition-transform">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-base font-bold uppercase tracking-widest text-zinc-900 absolute left-1/2 -translate-x-1/2">
                        Details
                    </h1>
                </div>
            </header>

            <main className="px-4 py-6">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {(() => {
                            let colorClass = "bg-accent-orange/10 text-accent-orange"; // default
                            if (workout.activeTag === "Legs") colorClass = "bg-accent-blue/10 text-accent-blue";
                            if (workout.activeTag === "Cardio") colorClass = "bg-accent-crimson/10 text-accent-crimson";
                            if (workout.activeTag === "Full Body") colorClass = "bg-accent-purple/10 text-accent-purple";

                            return (
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${colorClass}`}>
                                    {workout.activeTag}
                                </span>
                            );
                        })()}
                        <span className="text-xs font-medium text-zinc-400">{workout.date}</span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-6">{workout.title}</h2>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-surface rounded-2xl p-4 shadow-soft">
                            <Clock size={16} className="text-lime-500 mb-2" />
                            <div className="text-lg font-bold font-mono text-zinc-900">{workout.duration}</div>
                            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Time</div>
                        </div>
                        <div className="bg-surface rounded-2xl p-4 shadow-soft">
                            <Flame size={16} className="text-lime-500 mb-2" />
                            <div className="text-lg font-bold font-mono text-zinc-900">{workout.kcal}</div>
                            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Kcal</div>
                        </div>
                        <div className="bg-surface rounded-2xl p-4 shadow-soft">
                            <Dumbbell size={16} className="text-lime-500 mb-2" />
                            <div className="text-lg font-bold font-mono text-zinc-900">{workout.movedKg}</div>
                            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Kg Moved</div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-4">Exercises</h3>
                    <div className="space-y-3">
                        {exercisesList.map((ex) => (
                            <div
                                key={ex.id}
                                onClick={() => setSelectedExercise(ex)}
                                className="bg-surface rounded-2xl p-4 shadow-soft flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all hover:bg-zinc-50"
                            >
                                <div className="flex-1">
                                    <h4 className="text-sm font-bold text-zinc-900 mb-1">{ex.name}</h4>
                                    <div className="flex items-center text-xs text-zinc-500 space-x-2">
                                        <span>{ex.sets}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                                        <span className="font-mono">{ex.weight}</span>
                                        {ex.pr && (
                                            <span className="text-[10px] font-bold text-accent-purple bg-accent-purple/10 px-1.5 py-0.5 rounded uppercase ml-2 animate-in zoom-in duration-300">
                                                {ex.pr} PR
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {ex.completed ? (
                                        <CheckCircle2 size={24} className="text-lime-500" />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full border-2 border-zinc-200" />
                                    )}
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
