import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Login from './pages/Login';
import Workouts from './pages/Workouts';
import Plans from './pages/Plans';
import Profile from './pages/Profile';

function App() {
    const [session, setSession] = useState(null);
    const [isNewUser, setIsNewUser] = useState(false);
    const [activeTab, setActiveTab] = useState('workouts');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (isLoading) {
        return <div className="min-h-screen bg-primary-dark flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    if (!session) {
        return (
            <Login
                onLogin={(isNew) => {
                    setIsNewUser(isNew || false);
                    // App state updates automatically via onAuthStateChange
                }}
            />
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'workouts':
                return <Workouts isNewUser={isNewUser} />;
            case 'plans':
                return <Plans />;
            case 'profile':
                return (
                    <Profile
                        onLogout={async () => {
                            await supabase.auth.signOut();
                            setIsNewUser(false);
                            setActiveTab('workouts');
                        }}
                        session={session}
                    />
                );
            default:
                return <Workouts isNewUser={isNewUser} />;
        }
    };

    return (
        <div className="max-w-xl mx-auto min-h-screen bg-primary-dark pb-28 relative">
            <Header />
            <main className="px-4 py-6">
                {renderContent()}
            </main>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}

export default App;
