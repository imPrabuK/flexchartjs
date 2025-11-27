import Link from "next/link";
import React from 'react';

const chartCategories = [
    "Line",
    "Bar",
    "Pie",
    "Scatter",
    "GEO/Map",
    "Candlestick",
    "Radar",
    "Boxplot",
    "Heatmap",
    "Graph",
    "Lines",
    "Tree",
    "Treemap",
    "Sunburst",
];

const lineExamples = [
    {
        title: "Basic Line Chart",
        href: "/examples/line/basic",
        type: "basic",
    },
    {
        title: "Smoothed Line Chart",
        href: "/examples/line/smoothed",
        type: "smoothed",
    },
    {
        title: "Basic Area Chart",
        href: "/examples/line/area",
        type: "area",
    },
    {
        title: "Stacked Line Chart",
        href: "/examples/line/stacked",
        type: "stacked",
    },
    {
        title: "Stacked Area Chart",
        href: "/examples/line/stacked-area",
        type: "stacked-area",
    },
    {
        title: "Gradient Stacked Area Chart",
        href: "/examples/line/gradient-stacked-area",
        type: "gradient-stacked",
    },
    {
        title: "Bump Chart (Ranking)",
        href: "/examples/line/bump",
        type: "bump",
    },
    {
        title: "Temperature Change in the Coming Week",
        href: "/examples/line/temperature",
        type: "temperature",
    },
];

function BasicLinePreview() {
    const points = ["20,60", "50,45", "80,50", "110,30", "140,55", "170,40"];
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30">
            <svg viewBox="0 0 200 100" className="h-full w-full">
                <line x1="16" y1="80" x2="184" y2="80" stroke="#e5e7eb" strokeWidth="1" />
                <polyline
                    points={points.join(" ")}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                />
                {points.map((pt, idx) => {
                    const [x, y] = pt.split(",").map(Number);
                    return (
                        <g key={idx}>
                            <circle cx={x} cy={y} r={2.5} fill="#2563eb" />
                            <circle cx={x} cy={y} r={4} fill="white" stroke="#2563eb" strokeOpacity="0.3" />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function SmoothedLinePreview() {
    const points = ["20,60", "50,45", "80,50", "110,30", "140,55", "170,40"];
    const smoothPath = `M ${points[0]} Q 35,52.5 50,45 T 80,50 T 110,30 T 140,55 T ${points[points.length - 1]}`;
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30">
            <svg viewBox="0 0 200 100" className="h-full w-full">
                <line x1="16" y1="80" x2="184" y2="80" stroke="#e5e7eb" strokeWidth="1" />
                <path
                    d={smoothPath}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                />
                {points.map((pt, idx) => {
                    const [x, y] = pt.split(",").map(Number);
                    return (
                        <g key={idx}>
                            <circle cx={x} cy={y} r={2.5} fill="#2563eb" />
                            <circle cx={x} cy={y} r={4} fill="white" stroke="#2563eb" strokeOpacity="0.3" />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function AreaPreview() {
    const points = ["20,60", "50,45", "80,50", "110,30", "140,55", "170,40"];
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30">
            <svg viewBox="0 0 200 100" className="h-full w-full">
                <defs>
                    <linearGradient id="miniArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                <line x1="16" y1="80" x2="184" y2="80" stroke="#e5e7eb" strokeWidth="1" />
                <polyline
                    points={`16,80 ${points.join(" ")} 184,80`}
                    fill="url(#miniArea)"
                    stroke="none"
                />
                <polyline
                    points={points.join(" ")}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                />
                {points.map((pt, idx) => {
                    const [x, y] = pt.split(",").map(Number);
                    return (
                        <g key={idx}>
                            <circle cx={x} cy={y} r={2.5} fill="#2563eb" />
                            <circle cx={x} cy={y} r={4} fill="white" stroke="#2563eb" strokeOpacity="0.3" />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function StackedLinePreview() {
    const line1 = ["20,55", "50,40", "80,45", "110,25", "140,50", "170,35"];
    const line2 = ["20,70", "50,60", "80,65", "110,50", "140,70", "170,60"];
    const line3 = ["20,85", "50,80", "80,85", "110,75", "140,90", "170,85"];
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30">
            <svg viewBox="0 0 200 100" className="h-full w-full">
                <line x1="16" y1="90" x2="184" y2="90" stroke="#e5e7eb" strokeWidth="1" />
                <polyline points={line1.join(" ")} fill="none" stroke="#2563eb" strokeWidth="2" />
                <polyline points={line2.join(" ")} fill="none" stroke="#10b981" strokeWidth="2" />
                <polyline points={line3.join(" ")} fill="none" stroke="#f59e0b" strokeWidth="2" />
            </svg>
        </div>
    );
}

function StackedAreaPreview() {
    const top1 = ["20,50", "50,35", "80,40", "110,20", "140,45", "170,30"];
    const top2 = ["20,70", "50,60", "80,65", "110,50", "140,70", "170,60"];
    const top3 = ["20,90", "50,85", "80,90", "110,80", "140,95", "170,90"];
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30">
            <svg viewBox="0 0 200 100" className="h-full w-full">
                <defs>
                    <linearGradient id="miniStack1" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="miniStack2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="miniStack3" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
                <line x1="16" y1="95" x2="184" y2="95" stroke="#e5e7eb" strokeWidth="1" />
                <polygon points={`16,90 ${top1.join(" ")} 184,90`} fill="url(#miniStack1)" />
                <polygon points={`16,70 ${top2.join(" ")} 184,70`} fill="url(#miniStack2)" />
                <polygon points={`16,50 ${top3.join(" ")} 184,50`} fill="url(#miniStack3)" />
            </svg>
        </div>
    );
}

function GradientStackedAreaPreview() {
    const top1 = ["20,50", "50,35", "80,40", "110,20", "140,45", "170,30"];
    const top2 = ["20,70", "50,60", "80,65", "110,50", "140,70", "170,60"];
    const top3 = ["20,90", "50,85", "80,90", "110,80", "140,95", "170,90"];
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30">
            <svg viewBox="0 0 200 100" className="h-full w-full">
                <defs>
                    <linearGradient id="miniGrad1" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#2563eb" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="miniGrad2" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="miniGrad3" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                <line x1="16" y1="95" x2="184" y2="95" stroke="#e5e7eb" strokeWidth="1" />
                <polygon points={`16,90 ${top1.join(" ")} 184,90`} fill="url(#miniGrad1)" />
                <polygon points={`16,70 ${top2.join(" ")} 184,70`} fill="url(#miniGrad2)" />
                <polygon points={`16,50 ${top3.join(" ")} 184,50`} fill="url(#miniGrad3)" />
            </svg>
        </div>
    );
}

function BumpChartPreview() {
    const line1 = ["20,25", "50,40", "80,25", "110,60", "140,40", "170,25"];
    const line2 = ["20,40", "50,25", "80,40", "110,25", "140,60", "170,40"];
    const line3 = ["20,60", "50,60", "80,60", "110,40", "140,25", "170,60"];
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30">
            <svg viewBox="0 0 200 100" className="h-full w-full">
                <line x1="16" y1="85" x2="184" y2="85" stroke="#e5e7eb" strokeWidth="1" />
                <polyline points={line1.join(" ")} fill="none" stroke="#2563eb" strokeWidth="2.5" />
                <polyline points={line2.join(" ")} fill="none" stroke="#10b981" strokeWidth="2.5" />
                <polyline points={line3.join(" ")} fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                {[...line1, ...line2, ...line3].map((pt, idx) => {
                    const [x, y] = pt.split(",").map(Number);
                    const rank = idx < 6 ? (idx % 3) + 1 : idx < 12 ? ((idx - 6) % 3) + 1 : ((idx - 12) % 3) + 1;
                    return (
                        <g key={idx}>
                            <circle cx={x} cy={y} r={6} fill={idx < 6 ? "#2563eb" : idx < 12 ? "#10b981" : "#f59e0b"} />
                            <text x={x} y={y + 2.5} textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">
                                {rank}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function TemperaturePreview() {
    const highest = ["20,30", "50,30", "80,20", "110,35", "140,32", "170,40"];
    const lowest = ["20,70", "50,80", "80,65", "110,75", "140,70", "170,75"];
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30">
            <svg viewBox="0 0 200 100" className="h-full w-full">
                <line x1="16" y1="85" x2="184" y2="85" stroke="#e5e7eb" strokeWidth="1" />
                <polyline points={highest.join(" ")} fill="none" stroke="#2563eb" strokeWidth="2" />
                <polyline points={lowest.join(" ")} fill="none" stroke="#10b981" strokeWidth="2" />
                {highest.map((pt, idx) => {
                    const [x, y] = pt.split(",").map(Number);
                    return (
                        <g key={`h-${idx}`}>
                            <circle cx={x} cy={y} r={2.5} fill="#2563eb" />
                            <circle cx={x} cy={y} r={4} fill="white" stroke="#2563eb" strokeOpacity="0.3" />
                        </g>
                    );
                })}
                {lowest.map((pt, idx) => {
                    const [x, y] = pt.split(",").map(Number);
                    return (
                        <g key={`l-${idx}`}>
                            <circle cx={x} cy={y} r={2.5} fill="#10b981" />
                            <circle cx={x} cy={y} r={4} fill="white" stroke="#10b981" strokeOpacity="0.3" />
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function ChartPreview({ type }: { type: string }) {
    switch (type) {
        case "basic":
            return <BasicLinePreview />;
        case "smoothed":
            return <SmoothedLinePreview />;
        case "area":
            return <AreaPreview />;
        case "stacked":
            return <StackedLinePreview />;
        case "stacked-area":
            return <StackedAreaPreview />;
        case "gradient-stacked":
            return <GradientStackedAreaPreview />;
        case "bump":
            return <BumpChartPreview />;
        case "temperature":
            return <TemperaturePreview />;
        default:
            return <BasicLinePreview />;
    }
}

export default function ExamplesPage() {
    return (
        <div className="flex w-full min-h-screen bg-slate-50 pt-20">
            {/* Left sidebar */}
            <aside className="hidden h-[calc(100vh-80px)] w-64 shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col sticky top-20">
                <div className="border-b border-slate-200 px-6 py-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Chart Gallery
                    </span>
                </div>
                <nav className="flex-1 overflow-y-auto py-4 px-3 text-sm text-slate-700 space-y-1">
                    {chartCategories.map((cat) => (
                        <button
                            key={cat}
                            className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${cat === "Line"
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <span>{cat}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <section className="flex-1 px-6 py-8 md:px-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Line Charts</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Visualize trends over time with our versatile line chart components.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-xs font-medium text-slate-700">v2.0.0</span>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {lineExamples.map((example) => (
                        <Link
                            key={example.title}
                            href={example.href}
                            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5"
                        >
                            <div className="p-6">
                                <ChartPreview type={example.type} />
                            </div>
                            <div className="mt-auto border-t border-slate-100 bg-slate-50/50 px-6 py-4">
                                <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {example.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
