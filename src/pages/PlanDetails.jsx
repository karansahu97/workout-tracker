import React, { useState } from 'react';
import { ChevronLeft, Save, Dumbbell } from 'lucide-react';

export default function PlanDetails({ plan, onBack, onSave }) {
    if (!plan) return null;

    const [editedPlan, setEditedPlan] = useState({ ...plan });

    const handleChange = (field, value) => {
        setEditedPlan(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(editedPlan);
        onBack();
    };

    return (
        <div className="absolute inset-0 bg-primary-dark z-50 animate-in slide-in-from-right-full duration-200 overflow-y-auto pb-28">
            <header className="sticky top-0 z-40 glass">
                <div className="flex items-center justify-between p-4">
                    <button onClick={onBack} className="p-2 -ml-2 text-zinc-900 active:scale-90 transition-transform">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-base font-bold uppercase tracking-widest text-zinc-900 absolute left-1/2 -translate-x-1/2">
                        Edit Plan
                    </h1>
                </div>
            </header>

            <main className="px-4 py-6 space-y-6">

                {/* Visual Preview */}
                <div
                    className="relative overflow-hidden rounded-2xl p-5 text-white shadow-soft transition-transform"
                    style={{ background: 'linear-gradient(90deg, #A3E635 0%, #65A30D 100%)' }}
                >
                    <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                        <Dumbbell size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="text-lime-100 text-xs font-bold uppercase tracking-wider mb-2">
                            {editedPlan.level || 'Level'}
                        </div>
                        <h3 className="text-xl font-bold tracking-tight mb-6">{editedPlan.title || 'Plan Title'}</h3>
                        <div className="text-xs font-medium text-lime-100 bg-black/20 px-3 py-1.5 rounded-full inline-block backdrop-blur-sm">
                            {editedPlan.duration || 'Duration'}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                            Plan Title
                        </label>
                        <input
                            type="text"
                            value={editedPlan.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full bg-surface border border-black/5 rounded-xl px-4 py-3 text-zinc-900 font-bold focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all placeholder-zinc-400"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Duration Info
                            </label>
                            <input
                                type="text"
                                value={editedPlan.duration}
                                onChange={(e) => handleChange('duration', e.target.value)}
                                className="w-full bg-surface border border-black/5 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all placeholder-zinc-400 text-sm"
                                placeholder="e.g. 8 Weeks..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                                Difficulty Level
                            </label>
                            <select
                                value={editedPlan.level}
                                onChange={(e) => handleChange('level', e.target.value)}
                                className="w-full bg-surface border border-black/5 rounded-xl px-4 py-3 text-zinc-900 font-medium focus:outline-none focus:ring-2 focus:ring-lime-500/50 transition-all text-sm appearance-none"
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Elite">Elite</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSave}
                        className="w-full bg-zinc-900 text-white font-bold uppercase tracking-wider rounded-full py-4 text-sm shadow-soft active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
                    >
                        <Save size={16} className="text-lime-500" />
                        <span>Save Changes</span>
                    </button>
                </div>
            </main>
        </div>
    );
}
