import { useMemo } from "react";

export type OptionLike = {
    xAxis?: { data?: (string | number)[]; type?: string; boundaryGap?: boolean };
    yAxis?: { type?: string; min?: number; max?: number } | { type?: string }[];
    series?: {
        name?: string;
        data?: (number | { value: number; name?: string; itemStyle?: { color?: string | { type: string; colorStops: { offset: number; color: string }[] } } })[];
        type?: string;
        smooth?: boolean;
        areaStyle?: { color?: string; opacity?: number };
        lineStyle?: { color?: string | { type: string; colorStops: { offset: number; color: string }[] }; width?: number; type?: 'solid' | 'dashed' | 'dotted' };
        itemStyle?: { color?: string | { type: string; colorStops: { offset: number; color: string }[] }; borderRadius?: number; borderColor?: string; borderWidth?: number };
        stack?: string;
        step?: string;
        symbol?: string;
        symbolSize?: number;
        radius?: string | string[]; // For Pie
        roseType?: string | boolean; // For Pie
        center?: string[]; // For Pie
        startAngle?: number; // For Pie
        label?: { show?: boolean; position?: string; color?: string }; // For Pie
    }[];
    backgroundColor?: string;
    title?: { text: string; left?: string; top?: string; textStyle?: { color?: string } };
    tooltip?: any;
    legend?: any;
};

export interface LineChartProps {
    option: OptionLike | null;
    width?: number | string;
    height?: number | string;
    className?: string;
}

// Simple color palette for multi-series
const COLORS = [
    "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"
];

export function LineChart({ option, width = "100%", height = "100%", className }: LineChartProps) {
    const { seriesData, xLabels, minY, maxY } = useMemo(() => {
        if (!option?.xAxis?.data && !option?.series) {
            return { seriesData: [], xLabels: [], minY: 0, maxY: 0 };
        }

        const xLabels = option?.xAxis?.data || [];
        const series = option?.series || [];

        // Collect all values to find global min/max
        let allValues: number[] = [];
        series.forEach(s => {
            if (s.data) {
                const numericData = s.data.map(d => typeof d === 'object' ? d.value : Number(d));
                allValues = allValues.concat(numericData.filter(n => !isNaN(n)));
            }
        });

        const minY = Math.min(...allValues);
        const maxY = Math.max(...allValues);
        const span = maxY - minY || 1;

        // Fixed internal coordinate system for SVG
        const svgWidth = 600;
        const svgHeight = 300;
        const paddingX = 40;
        const paddingY = 40;

        const stepX = xLabels.length > 1 ? (svgWidth - paddingX * 2) / (xLabels.length - 1) : (svgWidth - paddingX * 2) / 2;

        const seriesData = series.map((s, sIdx) => {
            const data = s.data || [];
            const points = data.map((val, idx) => {
                const numVal = typeof val === 'object' ? val.value : Number(val);
                const x = paddingX + stepX * idx;
                const normalized = (numVal - minY) / span;
                const y = svgHeight - paddingY - normalized * (svgHeight - paddingY * 2);
                return { x, y, value: numVal };
            });

            // Determine color
            let color = COLORS[sIdx % COLORS.length];
            if (s.lineStyle?.color && typeof s.lineStyle.color === 'string') {
                color = s.lineStyle.color;
            } else if (s.itemStyle?.color) {
                if (typeof s.itemStyle.color === 'string') {
                    color = s.itemStyle.color;
                } else if (s.itemStyle.color.colorStops) {
                    color = s.itemStyle.color.colorStops[0]?.color || COLORS[sIdx % COLORS.length];
                }
            }

            // Handle gradient object (simplified fallback)
            if (s.lineStyle?.color && typeof s.lineStyle.color === 'object') {
                // For now, just pick the last stop color or default
                // @ts-ignore
                if (s.lineStyle.color.colorStops) color = s.lineStyle.color.colorStops[1]?.color || COLORS[sIdx];
            }

            return {
                ...s,
                color,
                points,
                pointsStr: points.map(p => `${p.x},${p.y}`).join(" ")
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

                    {/* Y-Axis Ticks (Simplified) */}
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

                    {/* Series */}
                    {seriesData.map((s, i) => (
                        <g key={i}>
                            {/* Area Fill */}
                            {s.areaStyle && (
                                <polygon
                                    points={`40,260 ${s.pointsStr} ${s.points[s.points.length - 1]?.x},260`}
                                    fill={s.areaStyle.color || s.color}
                                    fillOpacity={s.areaStyle.opacity || 0.2}
                                    stroke="none"
                                />
                            )}

                            {/* Line */}
                            <polyline
                                points={s.pointsStr}
                                fill="none"
                                stroke={s.color}
                                strokeWidth={s.lineStyle?.width || 2}
                                strokeDasharray={s.lineStyle?.type === 'dashed' ? "5,5" : "none"}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            />

                            {/* Points */}
                            {s.symbol !== 'none' && s.points.map((p, idx) => (
                                <circle
                                    key={idx}
                                    cx={p.x}
                                    cy={p.y}
                                    r={s.symbolSize ? s.symbolSize / 2 : 3}
                                    fill="white"
                                    stroke={s.color}
                                    strokeWidth="2"
                                />
                            ))}
                        </g>
                    ))}

                    {/* X Labels */}
                    {xLabels.map((label, idx) => {
                        // Only show some labels if too many
                        if (xLabels.length > 10 && idx % Math.ceil(xLabels.length / 10) !== 0) return null;
                        // Calculate x position based on the same logic as points
                        const stepX = xLabels.length > 1 ? (600 - 80) / (xLabels.length - 1) : (600 - 80) / 2;
                        const x = 40 + stepX * idx;
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
