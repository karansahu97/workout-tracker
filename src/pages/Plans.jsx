import React, { useState } from 'react';
import TrainingPlan from '../components/TrainingPlan';
import PlanDetails from './PlanDetails';

export default function Plans() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [activePlan, setActivePlan] = useState({
        title: "Powerbuilding Phase 1",
        duration: "8 Weeks • 4 Days/Wk",
        level: "Advanced"
    });

    return (
        <div className="animate-in fade-in zoom-in-95 duration-200">
            <div className="mb-6">
                <h2 className="text-lg font-bold text-zinc-900 uppercase tracking-widest mb-2">My Library</h2>
                <p className="text-zinc-500 text-sm">Your active and saved training programs.</p>
            </div>

            <div className="space-y-4">
                <TrainingPlan
                    {...activePlan}
                    onClick={() => setSelectedPlan(activePlan)}
                />

                <div className="opacity-70 grayscale cursor-not-allowed">
                    <TrainingPlan
                        title="Hypertrophy Foundation"
                        duration="12 Weeks • 5 Days/Wk"
                        level="Intermediate"
                    />
                </div>
            </div>

            {selectedPlan && (
                <PlanDetails
                    plan={selectedPlan}
                    onBack={() => setSelectedPlan(null)}
                    onSave={(updatedPlan) => {
                        setActivePlan(updatedPlan);
                    }}
                />
            )}
        </div>
    );
}
