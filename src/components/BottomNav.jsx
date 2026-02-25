import React from 'react';
import { Home, History, BookOpen, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'log', icon: History, label: 'Log' },
        { id: 'library', icon: BookOpen, label: 'Library' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <div className="bg-zinc-900 shadow-soft rounded-full px-6 py-3 flex items-center space-x-8 pointer-events-auto backdrop-blur-md bg-opacity-95">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex flex-col items-center justify-center transition-all ${isActive ? 'text-lime-500 scale-110' : 'text-zinc-500 hover:text-zinc-400'
                                }`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            {isActive && <div className="w-1 h-1 bg-lime-500 rounded-full mt-1.5 absolute -bottom-2" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
