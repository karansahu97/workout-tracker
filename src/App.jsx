import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Login from './pages/Login';
import Workouts from './pages/Workouts';
import WorkoutThisWeekList from './pages/WorkoutThisWeekList';
import ExercisesList from './pages/ExercisesList';
import Profile from './pages/Profile';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [activeTab, setActiveTab] = useState('home');

    if (!isAuthenticated) {
        return (
            <Login
                onLogin={(isNew) => {
                    setIsAuthenticated(true);
                    setIsNewUser(isNew || false);
                }}
            />
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <Workouts isNewUser={isNewUser} />;
            case 'log':
                return <WorkoutThisWeekList onClose={() => setActiveTab('home')} />;
            case 'library':
                return <ExercisesList onClose={() => setActiveTab('home')} />;
            case 'profile':
                return (
                    <Profile
                        onLogout={() => {
                            setIsAuthenticated(false);
                            setIsNewUser(false);
                            setActiveTab('home');
                        }}
                    />
                );
            default:
                return <Workouts isNewUser={isNewUser} />;
        }
    };

    return (
        <div className="max-w-xl mx-auto min-h-screen bg-[#F4F5F7] pb-28 relative">
            <Header />
            <main className="px-4 py-6">
                {renderContent()}
            </main>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
}

export default App;
