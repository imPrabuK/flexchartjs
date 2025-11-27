import React from 'react';

interface PieChartPreviewProps {
    data: {
        slices: {
            value: number;
            color: string;
        }[];
        innerRadius?: number; // 0-1 relative to radius
        roseType?: boolean;
    };
}

export function PieChartPreview({ data }: PieChartPreviewProps) {
    const { slices, innerRadius: rawInnerRadius = 0, roseType } = data;
    const width = 200;
    const height = 100;
    const cx = width / 2;
    const cy = height / 2;
    const radius = 40;
    const innerRadius = rawInnerRadius * radius;

    const total = slices.reduce((acc, s) => acc + s.value, 0);
    const maxVal = Math.max(...slices.map(s => s.value));

    let startAngle = 0;

    return (
        <div className="h-32 w-full rounded-md bg-white p-2 flex items-center justify-center">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible">
                {slices.map((slice, idx) => {
                    const angle = (slice.value / total) * 360;
                    const endAngle = startAngle + angle;

                    // Rose chart radius adjustment
                    const currentOuterRadius = roseType
                        ? innerRadius + (radius - innerRadius) * (slice.value / maxVal)
                        : radius;

                    // Convert to radians (subtract 90 to start at top)
                    const startRad = (Math.PI * (startAngle - 90)) / 180;
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
                        path = `M ${x1} ${y1} A ${currentOuterRadius} ${currentOuterRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
                    } else {
                        path = `M ${cx} ${cy} L ${x1} ${y1} A ${currentOuterRadius} ${currentOuterRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                    }

                    startAngle = endAngle;

                    return (
                        <path
                            key={idx}
                            d={path}
                            fill={slice.color}
                            stroke="white"
                            strokeWidth="1"
                        />
                    );
                })}
            </svg>
        </div>
    );
}
