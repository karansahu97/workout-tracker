import React from 'react';

// Enhanced generator for the Heatmap matching the new color scale
const generateHeatmapData = (isNewUser) => {
    const data = [];
    const numDays = 182; // 26 weeks * 7 days (6 months)
    for (let i = 0; i < numDays; i++) {
        let colorClass = 'bg-zinc-100'; // level 0 (empty)
        let intensityLevel = 0;

        if (!isNewUser) {
            const roll = Math.random();
            if (roll > 0.85) { colorClass = 'bg-green-600 shadow-sm'; intensityLevel = 4; } // Intense dark green
            else if (roll > 0.65) { colorClass = 'bg-lime-500'; intensityLevel = 3; } // Vibrant lime/green
            else if (roll > 0.45) { colorClass = 'bg-lime-400'; intensityLevel = 2; } // Mid lime
            else if (roll > 0.25) { colorClass = 'bg-lime-300'; intensityLevel = 1; } // Light lime
        }

        data.push({ id: i, colorClass, intensityLevel });
    }
    return data;
};

export default function Heatmap({ isNewUser }) {
    const heatmapData = generateHeatmapData(isNewUser);

    return (
        <div className="bg-surface rounded-3xl p-6 shadow-soft border border-black/5 mb-6 w-full overflow-hidden animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Activity</h2>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${isNewUser ? 'bg-zinc-100 text-zinc-500' : 'bg-lime-100 text-lime-700'}`}>
                    {isNewUser ? '0 Days Streak' : '12 Days Streak'}
                </span>
            </div>

            <div className="flex gap-2">
                {/* Y-axis: Sun to Sat */}
                <div
                    className="grid grid-flow-row gap-[6px] text-[11px] text-zinc-400 font-semibold mt-7 pr-2"
                    style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
                >
                    <div className="w-[18px] h-[18px] flex items-center justify-end">S</div>
                    <div className="w-[18px] h-[18px] flex items-center justify-end">M</div>
                    <div className="w-[18px] h-[18px] flex items-center justify-end">T</div>
                    <div className="w-[18px] h-[18px] flex items-center justify-end">W</div>
                    <div className="w-[18px] h-[18px] flex items-center justify-end">T</div>
                    <div className="w-[18px] h-[18px] flex items-center justify-end">F</div>
                    <div className="w-[18px] h-[18px] flex items-center justify-end">S</div>
                </div>

                {/* Grid and X-axis container */}
                <div className="flex-1 overflow-x-auto pb-4 scrollbar-hide">
                    {/* Month Labels row */}
                    {/* 26 columns * 24px per col (18px box + 6px gap) = 624px total width. 
                        6 months, so ~104px per month. */}
                    <div className="flex text-[12px] font-semibold text-zinc-400/80 mb-2 w-max" style={{ paddingLeft: '2px' }}>
                        <div style={{ width: 104 }}>Jan</div>
                        <div style={{ width: 104 }}>Feb</div>
                        <div style={{ width: 104 }}>Mar</div>
                        <div style={{ width: 104 }}>Apr</div>
                        <div style={{ width: 104 }}>May</div>
                        <div style={{ width: 104 }}>Jun</div>
                    </div>

                    <div className="grid grid-flow-col gap-[6px] w-max" style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}>
                        {heatmapData.map((day) => (
                            <div
                                key={day.id}
                                className={`w-[18px] h-[18px] rounded-[4px] flex-shrink-0 transition-colors hover:ring-2 hover:ring-offset-1 hover:ring-lime-400 ${day.colorClass}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend Footer */}
            <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between text-[11px] font-semibold text-zinc-500">
                <div className="flex items-center space-x-2">
                    <div className="w-3.5 h-3.5 rounded-[3px] bg-zinc-100" />
                    <span>Goal not meet</span>
                </div>

                <div className="flex items-center space-x-1.5">
                    <span className="mr-1">Less</span>
                    <div className="w-3.5 h-3.5 rounded-[3px] bg-lime-300" />
                    <div className="w-3.5 h-3.5 rounded-[3px] bg-lime-400" />
                    <div className="w-3.5 h-3.5 rounded-[3px] bg-lime-500" />
                    <div className="w-3.5 h-3.5 rounded-[3px] bg-green-600" />
                    <span className="ml-1">More</span>
                </div>
            </div>
        </div>
    );
}
