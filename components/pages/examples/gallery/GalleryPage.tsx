import React from 'react';
import Link from 'next/link';
import { BarChart2, PieChart, Activity, TrendingUp, Map, Layers } from 'lucide-react';

const galleryItems = [
    {
        title: "Interactive Line Charts",
        description: "Multi-series line charts with zoom, pan, and cursor interactions.",
        icon: TrendingUp,
        color: "text-blue-600",
        bg: "bg-blue-50",
        href: "/examples/line/basic"
    },
    {
        title: "Bar & Column Charts",
        description: "Categorical data comparison with stacked and grouped options.",
        icon: BarChart2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        href: "/examples/bar/basic"
    },
    {
        title: "Pie & Donut Charts",
        description: "Part-to-whole relationships with customizable segments.",
        icon: PieChart,
        color: "text-purple-600",
        bg: "bg-purple-50",
        href: "/examples/pie/basic"
    },
    {
        title: "Real-time Streams",
        description: "Live data updates with smooth transitions and high frame rates.",
        icon: Activity,
        color: "text-rose-600",
        bg: "bg-rose-50",
        href: "/examples/realtime"
    },
    {
        title: "Geospatial Maps",
        description: "Choropleth and bubble maps with projection support.",
        icon: Map,
        color: "text-amber-600",
        bg: "bg-amber-50",
        href: "/examples/map"
    },
    {
        title: "Heatmaps & Density",
        description: "Visualize density and correlation in large datasets.",
        icon: Layers,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        href: "/examples/heatmap"
    }
];

export default function GalleryPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="mx-auto max-w-6xl px-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">Examples · Gallery</h1>
                <p className="text-lg text-slate-600 mb-8">
                    Explore our comprehensive gallery of chart types and dashboard layouts.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.href}
                            className="group flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all overflow-hidden"
                        >
                            <div className="h-48 bg-slate-50 border-b border-slate-100 flex items-center justify-center group-hover:bg-slate-100/50 transition-colors">
                                <div className={`p-4 rounded-full ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon size={32} />
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-600">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
