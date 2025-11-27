import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="mx-auto max-w-4xl px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-6">About FlexChartJS</h1>
                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 mb-6">
                            FlexChartJS was born from a simple idea: data visualization shouldn't be a struggle.
                            We wanted to create a library that feels like a natural extension of your React codebase.
                        </p>
                        <p className="text-slate-600 mb-4">
                            Our team of data scientists and UI engineers worked together to build a system that is both
                            mathematically precise and visually stunning.
                        </p>
                        <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-4">Our Mission</h2>
                        <p className="text-slate-600 mb-4">
                            To empower developers to tell compelling stories with data, without getting bogged down in
                            low-level canvas manipulation or complex configuration objects.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
