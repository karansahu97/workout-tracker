import React from 'react';

// Enhanced generator for the Heatmap matching the new color scale
const generateHeatmapData = (isNewUser) => {
    const data = [];
    const numDays = 182; // 26 weeks * 7 days (6 months)
    for (let i = 0; i < numDays; i++) {
        let colorClass = 'bg-[#EAECEF]'; // level 0 (empty)
        let intensityLevel = 0;

        if (!isNewUser) {
            const roll = Math.random();
            if (roll > 0.85) { colorClass = 'bg-[#159A0E]'; intensityLevel = 4; } // Intense dark green
            else if (roll > 0.65) { colorClass = 'bg-[#23C91F]'; intensityLevel = 3; } // dark green
            else if (roll > 0.45) { colorClass = 'bg-[#41D83E]'; intensityLevel = 2; } // Mid green
            else if (roll > 0.25) { colorClass = 'bg-[#6BE067]'; intensityLevel = 1; } // Light green
        }

        data.push({ id: i, colorClass, intensityLevel });
    }
    return data;
};

export default function Heatmap({ isNewUser }) {
    const heatmapData = generateHeatmapData(isNewUser);

    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 mb-6 w-full overflow-hidden animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#7B7B98]">Activity</h2>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${isNewUser ? 'bg-[#EAECEF] text-[#7B7B98]' : 'bg-[#159A0E]/10 text-[#159A0E]'}`}>
                    {isNewUser ? '0 Days Streak' : '12 Days Streak'}
                </span>
            </div>

            <div className="flex gap-2">
                {/* Y-axis: Sun to Sat */}
                <div
                    className="grid grid-flow-row gap-[6px] text-[13px] text-[#7B7B98] font-medium mt-[28px] pr-2"
                    style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
                >
                    <div className="w-[18px] h-[22px] flex items-center justify-end">S</div>
                    <div className="w-[18px] h-[22px] flex items-center justify-end">M</div>
                    <div className="w-[18px] h-[22px] flex items-center justify-end">T</div>
                    <div className="w-[18px] h-[22px] flex items-center justify-end">W</div>
                    <div className="w-[18px] h-[22px] flex items-center justify-end">T</div>
                    <div className="w-[18px] h-[22px] flex items-center justify-end">F</div>
                    <div className="w-[18px] h-[22px] flex items-center justify-end">S</div>
                </div>

                {/* Grid and X-axis container */}
                <div className="flex-1 overflow-x-auto pb-4 scrollbar-hide">
                    {/* Month Labels row */}
                    {/* 26 columns * 28px per col (22px box + 6px gap) = 728px total width. 
                        6 months, so ~121px per month. */}
                    <div className="flex text-[14px] font-medium text-[#7B7B98] mb-2 w-max" style={{ paddingLeft: '2px' }}>
                        <div style={{ width: 121 }}>Jan</div>
                        <div style={{ width: 121 }}>Feb</div>
                        <div style={{ width: 121 }}>Mar</div>
                        <div style={{ width: 121 }}>Apr</div>
                        <div style={{ width: 121 }}>May</div>
                        <div style={{ width: 121 }}>Jun</div>
                    </div>

                    <div className="grid grid-flow-col gap-[6px] w-max" style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}>
                        {heatmapData.map((day) => (
                            <div
                                key={day.id}
                                className={`w-[22px] h-[22px] rounded-[6px] flex-shrink-0 transition-colors hover:ring-2 hover:ring-offset-1 hover:ring-[#41D83E] ${day.colorClass}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend Footer */}
            <div className="mt-4 pt-6 border-t border-black/5 flex items-center text-[13px] font-medium text-[#7B7B98]">
                <div className="flex items-center space-x-2 mr-3">
                    <div className="w-[16px] h-[16px] rounded-[4px] bg-[#EAECEF]" />
                    <span>Goal not meet</span>
                </div>

                <span className="text-gray-300 mr-3 hidden sm:inline-block">|</span>

                <div className="flex items-center space-x-1.5">
                    <span className="mr-1">Less</span>
                    <div className="w-[16px] h-[16px] rounded-[4px] bg-[#6BE067]" />
                    <div className="w-[16px] h-[16px] rounded-[4px] bg-[#41D83E]" />
                    <div className="w-[16px] h-[16px] rounded-[4px] bg-[#23C91F]" />
                    <div className="w-[16px] h-[16px] rounded-[4px] bg-[#159A0E]" />
                    <span className="ml-1">More</span>
                </div>
            </div>
        </div>
    );
}
