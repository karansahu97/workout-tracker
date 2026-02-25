import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ChevronLeft, Dumbbell, Activity, Flame, CheckCircle2 } from 'lucide-react';

export default function SignUpWizard({ onBack, onComplete }) {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        weight: '',
        height: '',
        objective: ''
    });

    const handleNext = (e) => {
        e.preventDefault();
        setError('');
        setStep(prev => prev + 1);
    };

    const handleComplete = async () => {
        if (!formData.objective) return;
        setError('');
        setIsLoading(true);

        try {
            // 1. Create the Auth User
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
            });

            if (authError) throw authError;

            // Wait for session to establish briefly if auto-confirm is enabled
            if (authData.user) {
                // 2. Insert Public Profile
                const { error: profileError } = await supabase.from('profiles').insert([
                    {
                        id: authData.user.id,
                        full_name: formData.name,
                        username: formData.email.split('@')[0], // Extract username from email
                        updated_at: new Date().toISOString()
                    }
                ]);

                // Even if profile fails (due to latency/RLS issue in edge cases), user is mostly created
                if (profileError) console.error("Profile creation error:", profileError);
            }

            onComplete(true, formData);
        } catch (err) {
            setError(err.message);
            // Go back to step 1 to let them fix email/password if needed
            setStep(1);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-surface rounded-3xl p-8 shadow-soft relative overflow-hidden">
            {/* Header / Back Button */}
            <div className="flex items-center mb-8 relative">
                {step > 1 ? (
                    <button
                        onClick={() => setStep(prev => prev - 1)}
                        className="absolute -left-2 p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                ) : (
                    <button
                        onClick={onBack}
                        className="absolute -left-2 p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                <div className="flex-1 flex justify-center space-x-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'bg-lime-500 w-8' : 'bg-zinc-200 w-4'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Step 1: Basics */}
            {step === 1 && (
                <div className="animate-in slide-in-from-right-8 fade-in text-center duration-300 w-full h-full">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2 uppercase tracking-tight">Who are you?</h2>
                    <p className="text-sm font-medium text-zinc-500 mb-6">Establish your athlete profile.</p>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-medium border border-red-100 mb-4 animate-in fade-in">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleNext} className="space-y-4 text-left">
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all placeholder-zinc-400"
                                placeholder="e.g. John Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all placeholder-zinc-400"
                                placeholder="e.g. athlete@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all placeholder-zinc-400"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-zinc-900 text-white font-bold uppercase tracking-wider rounded-full py-4 text-sm shadow-soft mt-8 active:scale-[0.98] transition-all">
                            Next Stage
                        </button>
                    </form>
                </div>
            )}

            {/* Step 2: Stats */}
            {step === 2 && (
                <div className="animate-in slide-in-from-right-8 fade-in text-center duration-300">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2 uppercase tracking-tight">Your Baseline</h2>
                    <p className="text-sm font-medium text-zinc-500 mb-8">Set your starting metrics.</p>

                    <form onSubmit={handleNext} className="space-y-6">
                        <div className="flex space-x-4">
                            <div className="flex-1 bg-zinc-50 rounded-2xl p-4 border border-black/5 text-center focus-within:ring-2 focus-within:ring-lime-500/50 transition-all">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Weight</label>
                                <div className="flex items-end justify-center">
                                    <input
                                        type="number"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        className="bg-transparent text-3xl font-bold text-zinc-900 w-20 text-center outline-none"
                                        placeholder="0"
                                        required
                                    />
                                    <span className="text-zinc-400 font-bold mb-1">KG</span>
                                </div>
                            </div>
                            <div className="flex-1 bg-zinc-50 rounded-2xl p-4 border border-black/5 text-center focus-within:ring-2 focus-within:ring-lime-500/50 transition-all">
                                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Height</label>
                                <div className="flex items-end justify-center">
                                    <input
                                        type="number"
                                        value={formData.height}
                                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                        className="bg-transparent text-3xl font-bold text-zinc-900 w-20 text-center outline-none"
                                        placeholder="0"
                                        required
                                    />
                                    <span className="text-zinc-400 font-bold mb-1">CM</span>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-zinc-900 text-white font-bold uppercase tracking-wider rounded-full py-4 text-sm shadow-soft mt-4 active:scale-[0.98] transition-all">
                            Set Baseline
                        </button>
                    </form>
                </div>
            )}

            {/* Step 3: Objective */}
            {step === 3 && (
                <div className="animate-in slide-in-from-right-8 fade-in text-center duration-300">
                    <h2 className="text-2xl font-bold text-zinc-900 mb-2 uppercase tracking-tight">The Objective</h2>
                    <p className="text-sm font-medium text-zinc-500 mb-8">What are we building towards?</p>

                    <div className="space-y-3 mb-8">
                        {[
                            { id: 'strength', title: 'Strength & Power', icon: Dumbbell, desc: 'Max effort, heavy loads.' },
                            { id: 'hypertrophy', title: 'Hypertrophy', icon: Flame, desc: 'Volume and muscle growth.' },
                            { id: 'athletic', title: 'Conditioning', icon: Activity, desc: 'Endurance and agility.' },
                        ].map((opt) => {
                            const Icon = opt.icon;
                            const isSelected = formData.objective === opt.id;
                            return (
                                <div
                                    key={opt.id}
                                    onClick={() => setFormData({ ...formData, objective: opt.id })}
                                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center space-x-4 ${isSelected ? 'border-lime-500 bg-lime-50' : 'border-black/5 bg-zinc-50 hover:bg-zinc-100'}`}
                                >
                                    <div className={`p-3 rounded-full ${isSelected ? 'bg-lime-500 text-zinc-900' : 'bg-zinc-200 text-zinc-500'}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="text-left flex-1">
                                        <div className={`font-bold uppercase tracking-wider text-sm ${isSelected ? 'text-zinc-900' : 'text-zinc-600'}`}>{opt.title}</div>
                                        <div className="text-xs text-zinc-500 font-medium">{opt.desc}</div>
                                    </div>
                                    {isSelected && <CheckCircle2 size={20} className="text-lime-500" />}
                                </div>
                            )
                        })}
                    </div>

                    <button
                        onClick={handleComplete}
                        disabled={!formData.objective || isLoading}
                        className={`w-full font-bold uppercase tracking-wider rounded-full py-4 text-sm shadow-soft transition-all flex justify-center items-center ${formData.objective
                            ? 'bg-lime-500 text-zinc-900 hover:bg-lime-400 active:scale-[0.98]'
                            : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                            }`}
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Enter the Arena"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
