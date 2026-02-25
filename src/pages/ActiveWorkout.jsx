import React, { useState, useEffect } from 'react';
import { X, Play, Square, Settings, ChevronRight, Check } from 'lucide-react';

export default function ActiveWorkout({ plan, onFinish, onCancel }) {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);
    const [restTime, setRestTime] = useState(90); // 90 seconds default rest

    // Mock Workout data based on the plan or default to Hypertrophy
    const exercises = [
        { name: "Barbell Bench Press", sets: 4, reps: "8-10", weight: "80" },
        { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", weight: "32" },
        { name: "Cable Crossovers", sets: 3, reps: "15", weight: "20" }
    ];

    // Setup the timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Rest timer countdown
    useEffect(() => {
        let restInterval;
        if (isResting && restTime > 0) {
            restInterval = setInterval(() => {
                setRestTime(prev => {
                    if (prev <= 1) {
                        setIsResting(false);
                        return 90; // Reset rest timer for next time
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(restInterval);
    }, [isResting, restTime]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        if (seconds >= 3600) {
            const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
            return `${h}:${m}:${s}`;
        }
        return `${m}:${s}`;
    };

    const handleCompleteSet = () => {
        // Trigger haptic feedback if available (simulated for web)
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }
        setIsResting(true);
        setRestTime(90); // Start 90s rest
    };

    const handleNextExercise = () => {
        if (activeExerciseIndex < exercises.length - 1) {
            setActiveExerciseIndex(prev => prev + 1);
            setIsResting(false);
        } else {
            onFinish(); // Workout complete
        }
    };

    const currentExercise = exercises[activeExerciseIndex];

    return (
        <div className="fixed inset-0 z-[100] bg-zinc-950 text-white flex flex-col animate-in slide-in-from-bottom-full duration-300">
            {/* Minimal Header */}
            <div className="flex items-center justify-between p-6">
                <button onClick={onCancel} className="text-zinc-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-lime-500 mb-1">Elapsed Time</span>
                    <span className="font-mono text-xl font-bold tracking-wide">{formatTime(timeElapsed)}</span>
                </div>
                <button className="text-zinc-400 hover:text-white transition-colors">
                    <Settings size={24} />
                </button>
            </div>

            {/* Active Exercise Card */}
            <div className="flex-1 flex flex-col justify-center px-6">
                <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        Exercise {activeExerciseIndex + 1} of {exercises.length}
                    </span>
                    <span className="text-xs font-bold text-accent-blue bg-accent-blue/10 px-2 py-1 rounded-full uppercase tracking-wider">
                        {currentExercise.sets} Sets
                    </span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight mb-8 leading-tight">
                    {currentExercise.name}
                </h1>

                {/* Input Fields representing current set */}
                <div className="grid grid-cols-2 gap-4 mb-12">
                    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-inner flex flex-col items-center focus-within:ring-2 focus-within:ring-lime-500/50 transition-all">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Target Reps</span>
                        <input
                            type="text"
                            defaultValue={currentExercise.reps}
                            className="bg-transparent text-center text-4xl font-mono font-bold text-white w-full outline-none"
                        />
                    </div>
                    <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-inner flex flex-col items-center focus-within:ring-2 focus-within:ring-lime-500/50 transition-all">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Weight (KG)</span>
                        <input
                            type="number"
                            defaultValue={currentExercise.weight}
                            className="bg-transparent text-center text-4xl font-mono font-bold text-white w-full outline-none"
                        />
                    </div>
                </div>

                {/* Big Action Button */}
                <button
                    onClick={handleCompleteSet}
                    className="w-full bg-lime-500 text-zinc-950 font-bold uppercase tracking-widest rounded-full py-6 text-lg shadow-[0_0_40px_rgba(163,230,53,0.3)] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 mb-6"
                >
                    <Check size={24} className="stroke-[3]" />
                    <span>Complete Set</span>
                </button>

                <button
                    onClick={handleNextExercise}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white font-bold uppercase tracking-widest rounded-full py-4 text-sm active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                >
                    <span>{activeExerciseIndex < exercises.length - 1 ? 'Next Exercise' : 'Finish Workout'}</span>
                    <ChevronRight size={18} />
                </button>
            </div>

            {/* Persistent Rest Timer Bar */}
            <div className={`transition-all duration-300 ${isResting ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} absolute bottom-0 left-0 right-0 bg-lime-500 text-zinc-950 p-6 rounded-t-3xl flex items-center justify-between`}>
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">Rest Timer</span>
                    <span className="text-2xl font-mono font-bold">{formatTime(restTime)}</span>
                </div>
                <div className="flex space-x-3">
                    <button onClick={() => setRestTime(prev => prev + 30)} className="bg-black/10 text-zinc-950 font-bold text-xs uppercase tracking-wider px-3 py-2 rounded-xl">
                        +30s
                    </button>
                    <button onClick={() => setIsResting(false)} className="bg-zinc-950 text-lime-500 font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl">
                        Skip
                    </button>
                </div>
            </div>
        </div>
    );
}
