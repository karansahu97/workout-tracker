import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import SignUpWizard from './SignUpWizard';

export default function Login({ onLogin }) {
    const [isSigningUp, setIsSigningUp] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // onLogin is called, but App.jsx listening to onAuthStateChange handles the actual redirect
            onLogin(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto min-h-screen bg-primary-dark relative flex flex-col justify-center px-6 overflow-hidden">
            <div className={`transition-all duration-500 ${isSigningUp ? '-translate-y-8 opacity-0 pointer-events-none absolute' : 'translate-y-0 opacity-100 relative'}`}>
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-widest text-zinc-900 mb-2">
                        Workout Tracker
                    </h1>
                    <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">
                        Pro-Athlete Edition
                    </p>
                </div>

                <div className="bg-surface rounded-3xl p-8 shadow-soft">
                    <h2 className="text-xl font-bold text-zinc-900 mb-6 uppercase tracking-wider">
                        Sign In Target
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100 animate-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all placeholder-zinc-400"
                                placeholder="athlete@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all placeholder-zinc-400"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-lime-500 text-zinc-900 font-bold uppercase tracking-wider rounded-full py-4 text-sm shadow-soft active:scale-[0.98] transition-all hover:bg-lime-400 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                "Continue"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-black/5 text-center">
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                            New around here?
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsSigningUp(true)}
                            className="w-full bg-zinc-100 text-zinc-900 font-bold uppercase tracking-wider rounded-full py-4 text-sm shadow-sm active:scale-[0.98] transition-all hover:bg-zinc-200"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>

            {/* Sign Up Wizard View */}
            <div className={`transition-all duration-500 absolute left-6 right-6 ${isSigningUp ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}>
                {isSigningUp && (
                    <SignUpWizard
                        onBack={() => setIsSigningUp(false)}
                        onComplete={onLogin}
                    />
                )}
            </div>
        </div>
    );
}
