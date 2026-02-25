import React, { useState, useEffect } from 'react';
import { Target, ChevronRight, Play, X, Plus } from 'lucide-react';
import StreakWidget from '../components/StreakWidget';
import WorkoutCard from '../components/WorkoutCard';
import TrainingPlan from '../components/TrainingPlan';
import WorkoutDetails from './WorkoutDetails';
import PlanDetails from './PlanDetails';
import ActiveWorkout from './ActiveWorkout';
import WorkoutSummary from './WorkoutSummary';
import MyExercises from '../components/MyExercises';

export default function Workouts({ isNewUser }) {
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isActiveWorkout, setIsActiveWorkout] = useState(false);
    const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
    const [isWorkoutSummaryOpen, setIsWorkoutSummaryOpen] = useState(false);
    const [recentWorkouts, setRecentWorkouts] = useState([]);
    const [isLoadingWorkouts, setIsLoadingWorkouts] = useState(true);

    useEffect(() => {
        // Load mock data to explore the app without backend dependencies
        const mockData = [
            {
                id: 1,
                title: "Pull (Back & Biceps)",
                date: "18 Feb 2026 at 15:27",
                duration: "00:50:33",
                activeTags: ["BACK", "CORE", "LEGS"],
                kcal: "450",
                movedKg: "8,500",
                exercises: "6",
                exercisesList: [
                    { name: "Weighted Pull-Ups", id: 1 },
                    { name: "Barbell Rows", id: 2 },
                ]
            },
            {
                id: 2,
                title: "Lower Body Power",
                date: "16 Feb 2026 at 14:46",
                duration: "00:50:03",
                activeTags: ["CHEST", "CORE", "SHOULDERS", "TRICEPS"],
                kcal: "600",
                movedKg: "12,200",
                exercises: "5",
                exercisesList: [
                    { name: "Barbell Squats", id: 3 },
                    { name: "Romanian Deadlifts", id: 4 },
                ]
            }
        ];

        setTimeout(() => {
            setRecentWorkouts(isNewUser ? [] : mockData);
            setIsLoadingWorkouts(false);
        }, 500);
    }, [isNewUser]);

    const [activePlan, setActivePlan] = useState({
        title: isNewUser ? "Hypertrophy Foundation Phase 1" : "Powerbuilding Phase 1",
        duration: "8 Weeks • 4 Days/Wk",
        level: isNewUser ? "Beginner / Intermediate" : "Advanced"
    });

    const upNextWorkout = "Day 3: Pull (Back & Biceps)";
    const weeklyGoal = { completed: 3, total: 4 };

    // Remote workout data is fetched in useEffect

    return (
        <div className="animate-in fade-in duration-500 pb-10">
            {isNewUser && (
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-[#000000] uppercase tracking-tight">Welcome to the Arena.</h1>
                    <p className="text-sm font-medium text-zinc-400">Your journey begins today.</p>
                </div>
            )}

            <StreakWidget isNewUser={isNewUser} />
            <MyExercises />

            <div className="mb-8 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-bold text-zinc-900 uppercase tracking-widest">Workout this week</h2>
                </div>

                {isLoadingWorkouts ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="w-6 h-6 border-2 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : recentWorkouts.length === 0 ? (
                    <div className="bg-surface rounded-3xl p-8 border-2 border-dashed border-black/5 text-center flex flex-col items-center justify-center min-h-[160px]">
                        <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-3">
                            <span className="text-xl">📅</span>
                        </div>
                        <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wide mb-1">No workouts logged</h3>
                        <p className="text-xs text-zinc-500 font-medium max-w-[200px]">The canvas is empty. It's time to put in the work.</p>
                    </div>
                ) : (
                    recentWorkouts.map((workout) => (
                        <WorkoutCard
                            key={workout.id}
                            {...workout}
                            onClick={() => setSelectedWorkout(workout)}
                        />
                    ))
                )}
            </div>

            <div className="mb-8 relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base font-bold text-zinc-900 uppercase tracking-widest">
                        {isNewUser ? 'Recommended Plan' : 'Active Plan'}
                    </h2>
                    {isNewUser && <span className="text-[10px] font-bold bg-lime-100 text-lime-700 px-2 py-1 rounded uppercase tracking-wider">Based on goal</span>}
                </div>

                {/* UX Flow: Workout plans & directed workouts */}
                <div className="bg-surface rounded-3xl p-5 shadow-soft border border-black/5 mb-3 cursor-pointer active:scale-[0.98] transition-transform" onClick={() => setSelectedPlan(activePlan)}>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{activePlan.title}</h3>
                            <p className="text-lg font-bold text-zinc-900">{upNextWorkout}</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-lime-100 flex items-center justify-center text-lime-600">
                            <Play size={18} className="fill-current ml-0.5" />
                        </div>
                    </div>
                    <div className="flex items-center text-xs font-mono font-bold text-zinc-500 space-x-2">
                        <span>{activePlan.duration}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300" />
                        <span>{activePlan.level}</span>
                    </div>
                </div>
            </div>

            {/* Primary CTA */}
            <div className="mt-8 px-2 fixed bottom-24 left-0 right-0 max-w-xl mx-auto z-40 bg-gradient-to-t from-white via-white to-transparent pt-8 pb-4">
                <button
                    onClick={() => setIsActionSheetOpen(true)}
                    className={`w-full font-bold uppercase tracking-wider rounded-full py-4 text-sm shadow-[0_4px_14px_rgba(163,230,53,0.4)] active:scale-[0.98] transition-all hover:bg-lime-400 ${isNewUser ? 'bg-lime-500 text-zinc-900' : 'bg-lime-500 text-zinc-900'}`}
                >
                    {isNewUser ? 'Start First Workout' : 'Start Workout'}
                </button>
            </div>

            {/* Action Sheet Modal (UX Flow: Easily track workouts) */}
            {isActionSheetOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom-8 duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-widest">Start Workout</h2>
                            <button onClick={() => setIsActionSheetOpen(false)} className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors">
                                <X size={16} />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => { setIsActionSheetOpen(false); setIsActiveWorkout(true); }}
                                className="w-full flex items-center p-4 bg-surface border border-lime-500 rounded-2xl shadow-sm hover:bg-lime-50 active:scale-[0.98] transition-all group"
                            >
                                <div className="w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center text-lime-600 mr-4 group-hover:scale-110 transition-transform">
                                    <Play size={20} className="fill-current ml-0.5" />
                                </div>
                                <div className="text-left flex-1">
                                    <h3 className="text-xs font-bold text-lime-600 uppercase tracking-widest mb-1">Up Next</h3>
                                    <p className="text-base font-bold text-zinc-900">{upNextWorkout}</p>
                                </div>
                                <ChevronRight size={20} className="text-zinc-300" />
                            </button>

                            <button
                                onClick={() => { setIsActionSheetOpen(false); setIsActiveWorkout(true); }}
                                className="w-full flex items-center p-4 bg-surface border border-black/5 rounded-2xl hover:bg-zinc-50 active:scale-[0.98] transition-all"
                            >
                                <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 mr-4">
                                    <Plus size={20} />
                                </div>
                                <div className="text-left flex-1">
                                    <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-widest mb-1">Empty Workout</h3>
                                    <p className="text-xs font-medium text-zinc-500">Build as you go</p>
                                </div>
                                <ChevronRight size={20} className="text-zinc-300" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isActiveWorkout && (
                <ActiveWorkout
                    onFinish={() => {
                        setIsActiveWorkout(false);
                        setIsWorkoutSummaryOpen(true);
                    }}
                    onCancel={() => setIsActiveWorkout(false)}
                />
            )}

            {isWorkoutSummaryOpen && (
                <WorkoutSummary
                    onClose={() => setIsWorkoutSummaryOpen(false)}
                />
            )}

            {selectedWorkout && (
                <WorkoutDetails
                    workout={selectedWorkout}
                    onBack={() => setSelectedWorkout(null)}
                />
            )}

            {selectedPlan && (
                <PlanDetails
                    plan={selectedPlan}
                    onBack={() => setSelectedPlan(null)}
                    onSave={(updatedPlan) => {
                        setActivePlan(updatedPlan);
                    }}
                />
            )}
        </div>
    );
}
