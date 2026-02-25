import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import WorkoutCard from '../components/WorkoutCard';

export default function WorkoutThisWeekList({ onClose }) {
    const [animated, setAnimated] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    useEffect(() => {
        setTimeout(() => setAnimated(true), 100);
    }, []);

    // Unique workouts for each day of the week
    const weeklyWorkouts = [
        {
            id: 'sun',
            title: "Sunday: Active Recovery",
            date: "22 Feb 2026 at 10:00",
            duration: "00:45:00",
            activeTags: ["RECOVERY", "CORE"],
            kcal: "200",
            movedKg: "0",
            exercises: "4",
            exercisesList: [
                { name: "Foam Rolling", id: 101 },
                { name: "Dynamic Stretching", id: 102 },
                { name: "Light Yoga", id: 103 },
            ]
        },
        {
            id: 'mon',
            title: "Monday: Lower Body Power",
            date: "16 Feb 2026 at 17:00",
            duration: "01:30:15",
            activeTags: ["LEGS", "GLUTES"],
            kcal: "600",
            movedKg: "12,200",
            exercises: "5",
            exercisesList: [
                { name: "Barbell Squats", id: 3 },
                { name: "Romanian Deadlifts", id: 4 },
            ]
        },
        {
            id: 'tue',
            title: "Tuesday: Push (Chest, Shoulders & Triceps)",
            date: "17 Feb 2026 at 18:00",
            duration: "01:15:22",
            activeTags: ["CHEST", "SHOULDERS", "TRICEPS"],
            kcal: "450",
            movedKg: "9,000",
            exercises: "6",
            exercisesList: [
                { name: "Bench Press", id: 201 },
                { name: "Overhead Press", id: 202 },
                { name: "Tricep Dips", id: 203 },
            ]
        },
        {
            id: 'wed',
            title: "Wednesday: Core & Cardio Fusion",
            date: "18 Feb 2026 at 07:00",
            duration: "00:55:10",
            activeTags: ["CARDIO", "CORE"],
            kcal: "550",
            movedKg: "0",
            exercises: "7",
            exercisesList: [
                { name: "HIIT Intervals", id: 301 },
                { name: "Plank Variations", id: 302 },
                { name: "Russian Twists", id: 303 },
            ]
        },
        {
            id: 'thu',
            title: "Thursday: Pull (Back & Biceps)",
            date: "19 Feb 2026 at 18:30",
            duration: "01:15:45",
            activeTags: ["BACK", "BICEPS"],
            kcal: "450",
            movedKg: "8,500",
            exercises: "6",
            exercisesList: [
                { name: "Weighted Pull-Ups", id: 1 },
                { name: "Barbell Rows", id: 2 },
            ]
        },
        {
            id: 'fri',
            title: "Friday: Full Body Conditioning",
            date: "20 Feb 2026 at 17:30",
            duration: "01:00:05",
            activeTags: ["FULL BODY"],
            kcal: "500",
            movedKg: "6,000",
            exercises: "8",
            exercisesList: [
                { name: "Kettlebell Swings", id: 501 },
                { name: "Burpees", id: 502 },
                { name: "Medicine Ball Slams", id: 503 },
            ]
        },
        {
            id: 'sat',
            title: "Saturday: Outdoor Run & Mobility",
            date: "21 Feb 2026 at 08:00",
            duration: "01:20:00",
            activeTags: ["CARDIO", "RECOVERY"],
            kcal: "650",
            movedKg: "0",
            exercises: "2",
            exercisesList: [
                { name: "5K Run", id: 601 },
                { name: "Hip Mobility Flow", id: 602 },
            ]
        }
    ];

    return (
        <div className="fixed inset-0 z-50 bg-[#F8F9FA] overflow-y-auto animate-in slide-in-from-right-full duration-300 pb-10">
            {/* Header */}
            <div className="sticky top-0 bg-[#F8F9FA]/90 backdrop-blur-md z-10 px-4 py-4 flex items-center border-b border-black/5">
                <button onClick={onClose} className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-zinc-900 active:bg-zinc-200 transition-colors mr-2">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-bold text-zinc-900 tracking-tight uppercase">Workout this week</h1>
            </div>

            <div className={`px-4 mt-6 transition-all duration-700 ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {weeklyWorkouts.map((workout, index) => (
                    <div
                        key={workout.id}
                        className={`transition-all duration-500 delay-${index * 100}`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                    >
                        <WorkoutCard
                            {...workout}
                            onClick={() => { }} // Could potentially open workout details here if needed
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
