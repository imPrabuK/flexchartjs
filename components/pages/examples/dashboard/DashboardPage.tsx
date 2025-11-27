import React from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Calendar } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
                        <p className="text-slate-600 mt-1">Overview of key performance metrics.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                            <Calendar size={16} />
                            Last 30 Days
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-slate-500 font-medium">Total Revenue</div>
                            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-3xl font-bold text-slate-900">$45,231.89</div>
                            <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                <ArrowUpRight size={12} className="mr-1" />
                                20.1%
                            </div>
                        </div>
                        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[70%] rounded-full"></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-slate-500 font-medium">Active Users</div>
                            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-3xl font-bold text-slate-900">12,350</div>
                            <div className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                <ArrowUpRight size={12} className="mr-1" />
                                12.5%
                            </div>
                        </div>
                        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 w-[45%] rounded-full"></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-slate-500 font-medium">Bounce Rate</div>
                            <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <div className="text-3xl font-bold text-slate-900">42.3%</div>
                            <div className="flex items-center text-xs font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                                <ArrowDownRight size={12} className="mr-1" />
                                4.1%
                            </div>
                        </div>
                        <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 w-[30%] rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-slate-900">Revenue Overview</h3>
                            <div className="flex gap-2">
                                {['1D', '1W', '1M', '1Y'].map(period => (
                                    <button key={period} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${period === '1M' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:bg-slate-50'}`}>
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Mock Chart Visualization */}
                        <div className="relative h-[300px] w-full flex items-end justify-between gap-2 px-4">
                            {/* Grid lines */}
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                {[0, 1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-full h-px bg-slate-50 border-t border-dashed border-slate-100"></div>
                                ))}
                            </div>

                            {/* Bars */}
                            {[35, 45, 30, 60, 75, 50, 65, 80, 70, 55, 90, 85].map((h, i) => (
                                <div key={i} className="relative w-full bg-blue-50 rounded-t-sm group hover:bg-blue-100 transition-colors" style={{ height: `${h}%` }}>
                                    <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all duration-500" style={{ height: `${h * 0.6}%` }}></div>
                                    {/* Tooltip on hover */}
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                        ${(h * 1240).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-slate-400 px-4">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                        </div>
                    </div>

                    {/* Secondary Chart */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="font-semibold text-slate-900 mb-6">Traffic Sources</h3>
                        <div className="flex items-center justify-center h-[200px] relative">
                            {/* Mock Donut Chart */}
                            <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90">
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="150 251" strokeDashoffset="0" className="drop-shadow-sm" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="70 251" strokeDashoffset="-150" className="drop-shadow-sm" />
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="30 251" strokeDashoffset="-220" className="drop-shadow-sm" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-slate-900">Total</span>
                                <span className="text-xs text-slate-500">Sessions</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-3">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span className="text-slate-600">Direct</span>
                                </div>
                                <span className="font-medium text-slate-900">60%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    <span className="text-slate-600">Social</span>
                                </div>
                                <span className="font-medium text-slate-900">28%</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <span className="text-slate-600">Referral</span>
                                </div>
                                <span className="font-medium text-slate-900">12%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
