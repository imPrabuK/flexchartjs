import React from 'react';

interface BarChartPreviewProps {
    data: {
        series: {
            data: number[];
            color: string;
        }[];
    };
}

export function BarChartPreview({ data }: BarChartPreviewProps) {
    const { series } = data;
    const width = 200;
    const height = 100;
    const padding = 10;

    // Calculate global max
    let allValues: number[] = [];
    series.forEach(s => {
        allValues = allValues.concat(s.data);
    });
    const max = Math.max(0, ...allValues); // Bar charts start at 0 usually

    const groupCount = series[0]?.data.length || 0;
    const availableWidth = width - padding * 2;
    const groupWidth = availableWidth / groupCount;
    const paddingGroup = groupWidth * 0.2;
    const availableGroupWidth = groupWidth - paddingGroup;
    const barWidth = availableGroupWidth / series.length;

    return (
        <div className="h-32 w-full rounded-md bg-white p-2">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
                {/* Grid lines */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" strokeWidth="1" />
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e5e7eb" strokeWidth="1" />

                {series.map((s, sIdx) => (
                    <g key={sIdx}>
                        {s.data.map((val, idx) => {
                            const groupX = padding + groupWidth * idx + paddingGroup / 2;
                            const x = groupX + barWidth * sIdx;
                            const barHeight = (val / max) * (height - padding * 2);
                            const y = height - padding - barHeight;

                            return (
                                <rect
                                    key={idx}
                                    x={x}
                                    y={y}
                                    width={barWidth * 0.8}
                                    height={barHeight}
                                    fill={s.color}
                                    rx="1"
                                />
                            );
                        })}
                    </g>
                ))}
            </svg>
        </div>
    );
}
