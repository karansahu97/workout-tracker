import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { LogOut, Settings, Award, Edit2, Camera } from 'lucide-react';

export default function Profile({ onLogout, session }) {
    const [profilePic, setProfilePic] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const fileInputRef = useRef(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                if (!session?.user?.id) return;

                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (error) throw error;
                if (data) setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProfile();
    }, [session]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProfilePic(url);
        }
    };

    return (
        <div className="animate-in fade-in zoom-in-95 duration-200">

            <div className="bg-surface rounded-3xl p-6 shadow-soft mb-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="w-full h-full bg-zinc-100 rounded-full border-4 border-lime-500 overflow-hidden">
                        {profilePic || profile?.avatar_url ? (
                            <img src={profilePic || profile?.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-zinc-200 flex items-center justify-center">
                                <span className="text-zinc-400 font-bold text-2xl">
                                    {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : '?'}
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-zinc-900 border-2 border-surface text-lime-500 rounded-full p-2 shadow-sm active:scale-95 transition-transform"
                    >
                        <Camera size={14} />
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                    />
                </div>

                <h2 className="text-xl font-bold uppercase tracking-widest text-zinc-900 mb-1">
                    {isLoading ? '...' : (profile?.username || 'GUEST')}
                </h2>
                {profile?.full_name && (
                    <p className="text-xs font-semibold text-zinc-500 mb-3">{profile.full_name}</p>
                )}
                <span className="text-xs font-mono bg-lime-100 text-lime-700 px-3 py-1 mr-2 rounded-full inline-block mb-4">Level 42</span>
                <div className="flex justify-center space-x-6 text-center mt-4 border-t border-black/5 pt-6">
                    <div>
                        <div className="text-2xl font-bold font-mono text-zinc-900">142</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Workouts</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold font-mono text-zinc-900">4,200</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Kcal M/Avg</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold font-mono text-zinc-900 text-lime-600">12</div>
                        <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Max Streak</div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <button className="w-full bg-surface rounded-2xl p-4 shadow-soft flex items-center active:scale-[0.98] transition-all justify-between text-zinc-900">
                    <div className="flex items-center space-x-3">
                        <Award size={20} className="text-lime-500" />
                        <span className="font-bold uppercase tracking-wider text-sm">Achievements</span>
                    </div>
                </button>
                <button className="w-full bg-surface rounded-2xl p-4 shadow-soft flex items-center active:scale-[0.98] transition-all justify-between text-zinc-900">
                    <div className="flex items-center space-x-3">
                        <Settings size={20} className="text-zinc-400" />
                        <span className="font-bold uppercase tracking-wider text-sm">Settings</span>
                    </div>
                </button>
            </div>

            <button
                onClick={onLogout}
                className="mt-8 w-full bg-red-50 text-red-600 font-bold uppercase tracking-wider rounded-full py-4 text-sm active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
                <LogOut size={16} />
                <span>Sign Out</span>
            </button>

        </div>
    );
}
