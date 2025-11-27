import { useMemo } from "react";

export type OptionLike = {
    xAxis?: { data?: (string | number)[] };
    yAxis?: { type?: string };
    series?: { data?: number[]; type?: string }[];
};

export interface LineChartProps {
    option: OptionLike | null;
    width?: number | string;
    height?: number | string;
    className?: string;
}

export function LineChart({ option, width = "100%", height = "100%", className }: LineChartProps) {
    const { points, xLabels, minY, maxY } = useMemo(() => {
        if (!option?.xAxis?.data || !option.series?.[0]?.data) {
            return {
                points: [] as string[],
                xLabels: [] as (string | number)[],
                minY: 0,
                maxY: 0,
            };
        }

        const xData = option.xAxis.data;
        const yData = option.series[0].data ?? [];
        const numericY = yData.map((v) => Number(v));
        const valid = numericY.filter((v) => !Number.isNaN(v));
        const minY = Math.min(...valid);
        const maxY = Math.max(...valid);
        const span = maxY - minY || 1;

        // Fixed internal coordinate system for SVG
        const svgWidth = 400;
        const svgHeight = 220;
        const paddingX = 32;
        const paddingY = 24;

        const stepX =
            xData.length > 1 ? (svgWidth - paddingX * 2) / (xData.length - 1) : 0;

        const pts = numericY.map((y, idx) => {
            const x = paddingX + stepX * idx;
            const normalized = (y - minY) / span;
            const yPos = svgHeight - paddingY - normalized * (svgHeight - paddingY * 2);
            return `${x},${yPos}`;
        });

        return { points: pts, xLabels: xData, minY, maxY };
    }, [option]);

    return (
        <div className={className} style={{ width, height }}>
            {!points.length ? (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    No data to display
                </div>
            ) : (
                <svg viewBox="0 0 400 260" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <linearGradient id="lineArea" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* X axis */}
                    <line
                        x1="32"
                        x2="368"
                        y1="220"
                        y2="220"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                    />

                    {/* Y axis grid */}
                    {Array.from({ length: 4 }).map((_, idx) => {
                        const y = 60 + ((220 - 60) / 3) * idx;
                        return (
                            <line
                                key={idx}
                                x1="32"
                                x2="368"
                                y1={y}
                                y2={y}
                                stroke="#f3f4f6"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {/* Area under line */}
                    {points.length > 1 && (
                        <polyline
                            points={`32,220 ${points.join(" ")} 368,220`}
                            fill="url(#lineArea)"
                            stroke="none"
                        />
                    )}

                    {/* Line */}
                    {points.length > 1 && (
                        <polyline
                            points={points.join(" ")}
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="2"
                        />
                    )}

                    {/* Points */}
                    {points.map((pt, idx) => {
                        const [x, y] = pt.split(",").map(Number);
                        return (
                            <g key={idx}>
                                <circle cx={x} cy={y} r={3} fill="#2563eb" />
                                <circle
                                    cx={x}
                                    cy={y}
                                    r={5}
                                    fill="white"
                                    stroke="#2563eb"
                                    strokeOpacity="0.4"
                                />
                            </g>
                        );
                    })}

                    {/* X labels */}
                    {xLabels.map((label, idx) => {
                        const [x] = (points[idx] ?? "").split(",").map(Number);
                        if (!Number.isFinite(x)) return null;
                        return (
                            <text
                                key={String(label) + idx}
                                x={x}
                                y={238}
                                textAnchor="middle"
                                fontSize="10"
                                fill="#6b7280"
                            >
                                {String(label)}
                            </text>
                        );
                    })}

                    {/* Y range label */}
                    <text
                        x={368}
                        y={40}
                        textAnchor="end"
                        fontSize="10"
                        fill="#9ca3af"
                    >
                        {minY} – {maxY}
                    </text>
                </svg>
            )}
        </div>
    );
}
