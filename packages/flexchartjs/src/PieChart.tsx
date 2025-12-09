import { useMemo } from "react";
import { OptionLike } from "./LineChart";

export interface PieChartProps {
    option: OptionLike | null;
    width?: number | string;
    height?: number | string;
    className?: string;
}

const COLORS = [
    "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"
];

export function PieChart({ option, width = "100%", height = "100%", className }: PieChartProps) {
    const { slices, title } = useMemo(() => {
        if (!option?.series?.[0]?.data) {
            return { slices: [], title: option?.title?.text };
        }

        const series = option.series[0];
        const rawData = series.data || [];

        // Parse data (can be number or object)
        const data = rawData.map(d => {
            if (typeof d === 'object') return d;
            return { value: Number(d), name: '' };
        });

        const total = data.reduce((acc, item) => acc + item.value, 0);

        // Handle radius
        let innerRadius = 0;
        let outerRadius = 80;
        if (series.radius) {
            if (Array.isArray(series.radius)) {
                // ['40%', '70%']
                const parseRadius = (r: string | number) => {
                    if (typeof r === 'string' && r.endsWith('%')) {
                        return (parseFloat(r) / 100) * 100; // relative to 100px base
                    }
                    return Number(r);
                };
                innerRadius = parseRadius(series.radius[0]);
                outerRadius = parseRadius(series.radius[1]);
            } else {
                // '50%'
                if (typeof series.radius === 'string' && series.radius.endsWith('%')) {
                    outerRadius = (parseFloat(series.radius) / 100) * 100;
                } else {
                    outerRadius = Number(series.radius);
                }
            }
        }

        // Handle roseType
        const isRose = !!series.roseType;
        const maxVal = Math.max(...data.map(d => d.value));

        // Handle center
        let cx = 200;
        let cy = 150;
        if (series.center) {
            const parseCenter = (c: string | number, size: number) => {
                if (typeof c === 'string' && c.endsWith('%')) {
                    return (parseFloat(c) / 100) * size;
                }
                return Number(c);
            };
            cx = parseCenter(series.center[0], 400);
            cy = parseCenter(series.center[1], 300);
        }

        // Handle startAngle
        let startAngle = 0;
        // @ts-ignore
        if (series.startAngle !== undefined) startAngle = series.startAngle;

        const slices = data.map((item, idx) => {
            const angle = (item.value / total) * 360;
            const endAngle = startAngle + angle;

            // Calculate radius for rose chart
            const currentOuterRadius = isRose
                ? innerRadius + (outerRadius - innerRadius) * (item.value / maxVal)
                : outerRadius;

            // Convert angles to radians
            const startRad = (Math.PI * (startAngle - 90)) / 180; // -90 to start at top
            const endRad = (Math.PI * (endAngle - 90)) / 180;

            const x1 = cx + currentOuterRadius * Math.cos(startRad);
            const y1 = cy + currentOuterRadius * Math.sin(startRad);
            const x2 = cx + currentOuterRadius * Math.cos(endRad);
            const y2 = cy + currentOuterRadius * Math.sin(endRad);

            const x3 = cx + innerRadius * Math.cos(endRad);
            const y3 = cy + innerRadius * Math.sin(endRad);
            const x4 = cx + innerRadius * Math.cos(startRad);
            const y4 = cy + innerRadius * Math.sin(startRad);

            const largeArcFlag = angle > 180 ? 1 : 0;

            let path = "";
            if (innerRadius > 0) {
                // Donut sector
                path = `M ${x1} ${y1} A ${currentOuterRadius} ${currentOuterRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
            } else {
                // Pie sector
                path = `M ${cx} ${cy} L ${x1} ${y1} A ${currentOuterRadius} ${currentOuterRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
            }

            // Handle gradient color object
            let color: string = COLORS[idx % COLORS.length];
            if (item.itemStyle?.color) {
                if (typeof item.itemStyle.color === 'string') {
                    color = item.itemStyle.color;
                } else if (item.itemStyle.color.colorStops) {
                    color = item.itemStyle.color.colorStops[0]?.color || COLORS[idx % COLORS.length];
                }
            }

            startAngle = endAngle;
            return {
                path,
                color,
                value: item.value,
                name: item.name,
                centroid: {
                    x: cx + (currentOuterRadius + innerRadius) / 2 * Math.cos((startRad + endRad) / 2),
                    y: cy + (currentOuterRadius + innerRadius) / 2 * Math.sin((startRad + endRad) / 2)
                },
                label: series.label // Pass label config
            };
        });

        return { slices, title: option?.title?.text };
    }, [option]);

    return (
        <div className={className} style={{ width, height, backgroundColor: option?.backgroundColor || 'transparent' }}>
            {!slices.length ? (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    No data to display
                </div>
            ) : (
                <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                    {title && (
                        <text x="200" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill={option?.title?.textStyle?.color || "#374151"}>
                            {title}
                        </text>
                    )}

                    {slices.map((slice, idx) => (
                        <g key={idx}>
                            <path
                                d={slice.path}
                                fill={slice.color}
                                stroke={option?.backgroundColor || "white"}
                                strokeWidth="2"
                            />
                            {/* Simple Label */}
                            {slice.value > 0 && slice.label?.show !== false && (
                                <text
                                    x={slice.centroid.x}
                                    y={slice.centroid.y}
                                    textAnchor="middle"
                                    dy="0.3em"
                                    fontSize="10"
                                    fill="white"
                                    pointerEvents="none"
                                    style={{ textShadow: '0px 0px 2px rgba(0,0,0,0.5)' }}
                                >
                                    {slice.name}
                                </text>
                            )}
                        </g>
                    ))}
                </svg>
            )}
        </div>
    );
}
