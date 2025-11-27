import { useMemo } from "react";
import { OptionLike } from "./LineChart";

export interface BarChartProps {
    option: OptionLike | null;
    width?: number | string;
    height?: number | string;
    className?: string;
}

const COLORS = [
    "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"
];

export function BarChart({ option, width = "100%", height = "100%", className }: BarChartProps) {
    const { seriesData, xLabels, minY, maxY } = useMemo(() => {
        if (!option?.xAxis?.data && !option?.series) {
            return { seriesData: [], xLabels: [], minY: 0, maxY: 0 };
        }

        const xLabels = option?.xAxis?.data || [];
        const series = option?.series || [];

        // Collect all values to find global min/max
        let allValues: number[] = [];
        series.forEach(s => {
            if (s.data) allValues = allValues.concat(s.data.map(Number).filter(n => !isNaN(n)));
        });

        const minY = Math.min(0, ...allValues);
        const maxY = Math.max(...allValues);
        const span = maxY - minY || 1;

        const svgWidth = 600;
        const svgHeight = 300;
        const paddingX = 40;
        const paddingY = 40;

        const availableWidth = svgWidth - paddingX * 2;
        const groupWidth = availableWidth / xLabels.length;
        const paddingGroup = groupWidth * 0.2; // 20% padding between groups
        const availableGroupWidth = groupWidth - paddingGroup;

        const barWidth = availableGroupWidth / series.length;

        const seriesData = series.map((s, sIdx) => {
            const data = s.data || [];
            const bars = data.map((val, idx) => {
                const groupX = paddingX + groupWidth * idx + paddingGroup / 2;
                const x = groupX + barWidth * sIdx;

                const normalized = (Number(val) - minY) / span;
                const barHeight = normalized * (svgHeight - paddingY * 2);
                const y = svgHeight - paddingY - barHeight;

                return { x, y, width: barWidth * 0.8, height: barHeight, value: val }; // 0.8 to give some spacing between bars in group
            });

            // Determine color
            let color = COLORS[sIdx % COLORS.length];
            if (s.itemStyle?.color) {
                color = s.itemStyle.color;
            }

            return {
                ...s,
                color,
                bars
            };
        });

        return { seriesData, xLabels, minY, maxY };
    }, [option]);

    return (
        <div className={className} style={{ width, height, backgroundColor: option?.backgroundColor || 'transparent' }}>
            {!seriesData.length ? (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    No data to display
                </div>
            ) : (
                <svg viewBox="0 0 600 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                    {/* Grid & Axes */}
                    <line x1="40" x2="560" y1="260" y2="260" stroke="#e5e7eb" strokeWidth="1" />
                    <line x1="40" x2="40" y1="40" y2="260" stroke="#e5e7eb" strokeWidth="1" />

                    {/* Y-Axis Ticks */}
                    {Array.from({ length: 5 }).map((_, i) => {
                        const y = 260 - (i * (220 / 4));
                        return (
                            <g key={i}>
                                <line x1="35" x2="560" y1={y} y2={y} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
                                <text x="30" y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af">
                                    {Math.round(minY + (i * (maxY - minY) / 4))}
                                </text>
                            </g>
                        );
                    })}

                    {/* Bars */}
                    {seriesData.map((s, sIdx) => (
                        <g key={sIdx}>
                            {s.bars.map((bar, idx) => (
                                <rect
                                    key={idx}
                                    x={bar.x}
                                    y={bar.y}
                                    width={bar.width}
                                    height={bar.height}
                                    fill={s.color}
                                    rx="2"
                                />
                            ))}
                        </g>
                    ))}

                    {/* X Labels */}
                    {xLabels.map((label, idx) => {
                        if (xLabels.length > 10 && idx % Math.ceil(xLabels.length / 10) !== 0) return null;
                        const groupWidth = (600 - 80) / xLabels.length;
                        const x = 40 + groupWidth * idx + groupWidth / 2;
                        return (
                            <text key={idx} x={x} y="280" textAnchor="middle" fontSize="10" fill="#6b7280">
                                {label}
                            </text>
                        );
                    })}
                </svg>
            )}
        </div>
    );
}
