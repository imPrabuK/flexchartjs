"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    BarChart2,
    PieChart,
    Activity,
    Layers,
    Zap,
    Layout,
    Code,
    Globe,
    Github
} from "lucide-react";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen pt-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative border-b border-slate-200 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>

                <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8 lg:py-40">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col items-center text-center"
                    >
                        <motion.div variants={item} className="mb-6 inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                            v2.0 is now available
                        </motion.div>

                        <motion.h1 variants={item} className="max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
                            Data visualization, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                reimagined for the web.
                            </span>
                        </motion.h1>

                        <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            Build beautiful, responsive, and interactive charts with a simple, composable API.
                            Designed for modern React applications and data-heavy dashboards.
                        </motion.p>

                        <motion.div variants={item} className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/download"
                                className="group rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition-all hover:scale-105"
                            >
                                Get Started
                                <ArrowRight className="inline-block ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link href="/examples" className="text-sm font-semibold leading-6 text-slate-900 hover:text-blue-600 transition-colors">
                                View Live Demos <span aria-hidden="true">→</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 sm:py-32 bg-slate-50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Powerful features for modern apps
                        </p>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            FlexChartJS provides all the building blocks you need to create stunning visualizations without fighting the library.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {[
                                {
                                    name: 'Composable API',
                                    description: 'Build complex charts by composing simple, reusable components. No massive configuration objects.',
                                    icon: Layers,
                                },
                                {
                                    name: 'High Performance',
                                    description: 'Render thousands of data points smoothly with our optimized canvas renderer and smart sampling.',
                                    icon: Zap,
                                },
                                {
                                    name: 'Responsive Design',
                                    description: 'Charts automatically adapt to container size and device pixel ratio for crisp rendering on any screen.',
                                    icon: Layout,
                                },
                                {
                                    name: 'TypeScript Ready',
                                    description: 'First-class TypeScript support with full type definitions for a great developer experience.',
                                    icon: Code,
                                },
                                {
                                    name: 'Interactive',
                                    description: 'Built-in tooltips, zooming, panning, and selection interactions out of the box.',
                                    icon: Activity,
                                },
                                {
                                    name: 'Framework Agnostic',
                                    description: 'Works seamlessly with React, Vue, Svelte, or vanilla JavaScript.',
                                    icon: Globe,
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-slate-900">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-600">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* Bento Grid / Showcase Section */}
            <section className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Chart Types for Every Use Case
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                        {/* Large Item */}
                        <div className="md:col-span-2 rounded-3xl bg-slate-50 border border-slate-200 p-8 relative overflow-hidden group">
                            <div className="absolute top-8 left-8 z-10">
                                <h3 className="text-xl font-bold text-slate-900">Advanced Line Charts</h3>
                                <p className="text-slate-500 mt-2">Multi-axis, gradients, and smooth curves.</p>
                            </div>
                            <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-gradient-to-tl from-blue-100 to-transparent rounded-tl-full opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                            {/* Abstract chart representation */}
                            <div className="absolute bottom-8 right-8 left-8 h-32 flex items-end justify-between gap-2">
                                {[40, 70, 50, 90, 60, 80, 50, 70, 60, 90].map((h, i) => (
                                    <div key={i} className="w-full bg-blue-500/20 rounded-t-sm" style={{ height: `${h}%` }}>
                                        <div className="w-full bg-blue-600 rounded-t-sm transition-all duration-500 group-hover:h-full" style={{ height: `${h * 0.8}%` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Small Item */}
                        <div className="rounded-3xl bg-slate-900 text-white p-8 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold">Dark Mode</h3>
                                <p className="text-slate-400 mt-2">First-class support.</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                            <div className="absolute bottom-0 right-0 p-8">
                                <PieChart className="h-24 w-24 text-blue-500 opacity-80 group-hover:rotate-12 transition-transform duration-500" />
                            </div>
                        </div>

                        {/* Small Item */}
                        <div className="rounded-3xl bg-blue-600 text-white p-8 relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold">Real-time</h3>
                                <p className="text-blue-100 mt-2">Streaming data updates.</p>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700"></div>
                            <Activity className="absolute bottom-8 right-8 h-24 w-24 text-white opacity-20 group-hover:scale-110 transition-transform" />
                        </div>

                        {/* Large Item */}
                        <div className="md:col-span-2 rounded-3xl bg-slate-50 border border-slate-200 p-8 relative overflow-hidden group">
                            <div className="absolute top-8 left-8 z-10">
                                <h3 className="text-xl font-bold text-slate-900">Interactive Dashboards</h3>
                                <p className="text-slate-500 mt-2">Coordinate multiple charts with shared state.</p>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pt-16 opacity-50 group-hover:opacity-80 transition-opacity">
                                <div className="grid grid-cols-2 gap-4 w-3/4">
                                    <div className="h-24 bg-white rounded-lg shadow-sm border border-slate-200"></div>
                                    <div className="h-24 bg-white rounded-lg shadow-sm border border-slate-200"></div>
                                    <div className="col-span-2 h-24 bg-white rounded-lg shadow-sm border border-slate-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative isolate overflow-hidden bg-slate-900 py-16 sm:py-24 lg:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Ready to build better dashboards?
                            </h2>
                            <p className="mt-4 text-lg leading-8 text-slate-300">
                                Join thousands of developers building data-rich applications with FlexChartJS.
                                Open source and free for personal use.
                            </p>
                            <div className="mt-6 flex max-w-md gap-x-4">
                                <Link
                                    href="/download"
                                    className="flex-none rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                                >
                                    Download v2.0
                                </Link>
                                <Link href="/docs" className="flex-none rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
                                    Read Documentation
                                </Link>
                            </div>
                        </div>
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <Globe className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <dt className="mt-4 font-semibold text-white">Global CDN</dt>
                                <dd className="mt-2 leading-7 text-slate-400">
                                    Delivered via high-performance edge network for low latency.
                                </dd>
                            </div>
                            <div className="flex flex-col items-start">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <Github className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <dt className="mt-4 font-semibold text-white">Open Source</dt>
                                <dd className="mt-2 leading-7 text-slate-400">
                                    MIT Licensed. Contribute on GitHub and help shape the future.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>
        </div>
    );
}
