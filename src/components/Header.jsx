import React from 'react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 glass">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-bold uppercase tracking-widest text-zinc-900 w-full text-center">
                    Overview
                </h1>
            </div>
        </header>
    );
}
