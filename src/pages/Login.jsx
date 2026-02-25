import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login({ onLogin }) {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (userId !== 'karansahu' || password !== 'karan1234') {
            setError('Invalid User ID or Password');
            setIsLoading(false);
            return;
        }

        const mappedEmail = 'karansahu@workout.local';

        try {
            // Attempt to sign in
            let { error: signInError } = await supabase.auth.signInWithPassword({
                email: mappedEmail,
                password: password,
            });

            if (signInError && signInError.message.includes('Invalid login credentials')) {
                // User might not exist yet, auto-create
                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: mappedEmail,
                    password: password,
                });

                if (signUpError) throw signUpError;

                // Ensure profile exists in database
                if (signUpData?.user) {
                    await supabase.from('profiles').insert([{
                        id: signUpData.user.id,
                        full_name: 'Karan Sahu',
                        username: 'karansahu',
                        updated_at: new Date().toISOString()
                    }]);
                }
            } else if (signInError) {
                throw signInError;
            }

            // Successfully authenticated
            onLogin(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto min-h-screen bg-primary-dark relative flex flex-col justify-center px-6 overflow-hidden">
            <div className="mb-12 text-center">
                <h1 className="text-3xl font-bold uppercase tracking-widest text-zinc-900 mb-2">
                    Workout Tracker
                </h1>
                <p className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">
                    Personal Edition
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
                            User ID
                        </label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full bg-zinc-50 border border-black/5 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all placeholder-zinc-400"
                            placeholder="karansahu"
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
                            "Access Granted"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
