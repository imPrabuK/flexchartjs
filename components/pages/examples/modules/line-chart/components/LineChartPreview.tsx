import React from 'react';

interface LineChartPreviewProps {
    data: {
        series: {
            points: number[];
            color: string;
            type?: 'line' | 'area' | 'smooth' | 'step';
            fill?: boolean;
            gradient?: boolean;
        }[];
    };
}

export function LineChartPreview({ data }: LineChartPreviewProps) {
    const { series } = data;
    const width = 200;
    const height = 100;
    const padding = 10;

    // Calculate global min/max across all series
    let allPoints: number[] = [];
    series.forEach(s => {
        allPoints = allPoints.concat(s.points);
    });
    const min = Math.min(...allPoints);
    const max = Math.max(...allPoints);
    const range = max - min || 1;

    return (
        <div className="h-32 w-full rounded-md bg-white p-2">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
                {/* Grid lines for effect */}
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" strokeWidth="1" />
                <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e5e7eb" strokeWidth="1" />

                {series.map((s, sIdx) => {
                    const normalizedPoints = s.points.map((val, idx) => {
                        const x = padding + (idx / (s.points.length - 1)) * (width - padding * 2);
                        const y = height - padding - ((val - min) / range) * (height - padding * 2);
                        return { x, y };
                    });

                    let d = "";
                    if (s.type === 'step') {
                        d = `M ${normalizedPoints[0].x} ${normalizedPoints[0].y}`;
                        for (let i = 0; i < normalizedPoints.length - 1; i++) {
                            d += ` H ${normalizedPoints[i + 1].x} V ${normalizedPoints[i + 1].y}`;
                        }
                    } else if (s.type === 'smooth') {
                        d = `M ${normalizedPoints[0].x} ${normalizedPoints[0].y}`;
                        for (let i = 0; i < normalizedPoints.length - 1; i++) {
                            const p0 = normalizedPoints[i];
                            const p1 = normalizedPoints[i + 1];
                            const cp1x = p0.x + (p1.x - p0.x) / 2;
                            const cp1y = p0.y;
                            const cp2x = p0.x + (p1.x - p0.x) / 2;
                            const cp2y = p1.y;
                            d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
                        }
                    } else {
                        d = `M ${normalizedPoints[0].x} ${normalizedPoints[0].y}`;
                        normalizedPoints.forEach(p => {
                            d += ` L ${p.x} ${p.y}`;
                        });
                    }

                    const areaPath = s.fill ? `${d} L ${normalizedPoints[normalizedPoints.length - 1].x} ${height - padding} L ${normalizedPoints[0].x} ${height - padding} Z` : "";

                    return (
                        <g key={sIdx}>
                            {s.fill && (
                                <path d={areaPath} fill={s.color} fillOpacity="0.2" stroke="none" />
                            )}
                            <path
                                d={d}
                                fill="none"
                                stroke={s.color}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray={s.type === 'line' && s.color === 'dashed' ? "4 4" : "none"} // Simplified check
                            />
                            {/* Dots - only show for first series to avoid clutter or if few points */}
                            {normalizedPoints.length < 10 && normalizedPoints.map((p, i) => (
                                <circle key={i} cx={p.x} cy={p.y} r={2} fill="white" stroke={s.color} strokeWidth="1.5" />
                            ))}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}
