import React from 'react';
import Link from 'next/link';
import { BookOpen, Code, Lightbulb } from 'lucide-react';

export default function DocsPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-slate-900">Documentation</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Everything you need to know about using FlexChartJS.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Link href="/docs/overview" className="group block bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:border-blue-300 hover:shadow-md transition-all">
                        <div className="p-3 bg-blue-50 rounded-lg w-fit mb-6 group-hover:bg-blue-100 transition-colors">
                            <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Getting Started</h3>
                        <p className="text-slate-600">Learn the basics of FlexChartJS and how to integrate it into your project.</p>
                    </Link>

                    <Link href="/docs/api" className="group block bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:border-purple-300 hover:shadow-md transition-all">
                        <div className="p-3 bg-purple-50 rounded-lg w-fit mb-6 group-hover:bg-purple-100 transition-colors">
                            <Code className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">API Reference</h3>
                        <p className="text-slate-600">Detailed documentation for all chart types, options, and methods.</p>
                    </Link>

                    <Link href="/docs/tutorials" className="group block bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:border-green-300 hover:shadow-md transition-all">
                        <div className="p-3 bg-green-50 rounded-lg w-fit mb-6 group-hover:bg-green-100 transition-colors">
                            <Lightbulb className="h-6 w-6 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Tutorials</h3>
                        <p className="text-slate-600">Step-by-step guides for building common dashboard patterns.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
