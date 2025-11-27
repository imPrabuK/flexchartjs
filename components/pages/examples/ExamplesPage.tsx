"use client";

import Link from "next/link";
import React, { useState } from 'react';
import ChartEditor from "../../common/ChartEditor";
import { examples, Example } from "./chartExamplesData";
import { LineChartPreview } from "./modules/line-chart/components/LineChartPreview";
import { BarChartPreview } from "./modules/bar-chart/components/BarChartPreview";
import { PieChartPreview } from "./modules/pie-chart/components/PieChartPreview";

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
            </svg>
        </div>
    );
}

function BarPreview() {
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30">
            <svg viewBox="0 0 200 100" className="h-full w-full">
                <line x1="16" y1="80" x2="184" y2="80" stroke="#e5e7eb" strokeWidth="1" />
                <rect x="25" y="40" width="15" height="40" fill="#3b82f6" rx="2" />
                <rect x="55" y="20" width="15" height="60" fill="#3b82f6" rx="2" />
                <rect x="85" y="50" width="15" height="30" fill="#3b82f6" rx="2" />
                <rect x="115" y="30" width="15" height="50" fill="#3b82f6" rx="2" />
                <rect x="145" y="60" width="15" height="20" fill="#3b82f6" rx="2" />
            </svg>
        </div>
    );
}

function PiePreview() {
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-24 w-24">
                <circle cx="50" cy="50" r="40" fill="#3b82f6" />
                <path d="M 50 50 L 50 10 A 40 40 0 0 1 90 50 Z" fill="#10b981" />
                <path d="M 50 50 L 90 50 A 40 40 0 0 1 50 90 Z" fill="#f59e0b" />
            </svg>
        </div>
    );
}

function GenericPreview({ type }: { type: string }) {
    return (
        <div className="mb-3 h-32 rounded-md bg-white group-hover:bg-blue-50/30 flex items-center justify-center">
            <div className="text-xs text-slate-400 font-medium">{type} Preview</div>
        </div>
    );
}


function ChartPreview({ type, example }: { type: string, example?: any }) {
    if (type === "Line" && example?.previewData) {
        return <LineChartPreview data={example.previewData} />;
    }
    if (type === "Bar" && example?.previewData) {
        return <BarChartPreview data={example.previewData} />;
    }
    if (type === "Pie" && example?.previewData) {
        return <PieChartPreview data={example.previewData} />;
    }
    if (type === "Line") return <BasicLinePreview />;
    if (type === "Bar") return <BarPreview />;
    if (type === "Pie") return <PiePreview />;
    return <GenericPreview type={type} />;
}

export default function ExamplesPage() {
    const [activeCategory, setActiveCategory] = useState("Line");
    const [selectedExample, setSelectedExample] = useState<Example | null>(null);

    const currentExamples = examples[activeCategory] || [];

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
                            onClick={() => setActiveCategory(cat)}
                            className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${activeCategory === cat
                                ? "bg-blue-50 text-blue-700"
                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <span>{cat}</span>
                            <span className="ml-auto text-xs text-slate-400">
                                {examples[cat]?.length || 0}
                            </span>
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main content */}
            <section className="flex-1 px-6 py-8 md:px-12">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{activeCategory} Charts</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Explore our collection of {activeCategory.toLowerCase()} chart examples.
                        </p>
                    </div>
                </div>

                {currentExamples.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <p>No examples available for {activeCategory} yet.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {currentExamples.map((example, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedExample(example)}
                                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md hover:shadow-blue-900/5"
                            >
                                <div className="p-6">
                                    <ChartPreview type={example.type} example={example} />
                                </div>
                                <div className="mt-auto border-t border-slate-100 bg-slate-50/50 px-6 py-4">
                                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                        {example.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Editor Modal */}
            {selectedExample && (
                <ChartEditor
                    initialCode={selectedExample.code}
                    type={selectedExample.type}
                    title={selectedExample.title}
                    onClose={() => setSelectedExample(null)}
                />
            )}
        </div>
    );
}
