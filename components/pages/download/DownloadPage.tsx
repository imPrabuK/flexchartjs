import React from 'react';
import { Download, Package, Terminal } from 'lucide-react';

export default function DownloadPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50">
            <div className="mx-auto max-w-4xl px-6">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-900">Get FlexChartJS</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Choose the best way to include FlexChartJS in your project.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* NPM */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-red-50 rounded-lg">
                                <Package className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">NPM</h3>
                                <p className="text-sm text-slate-500">Recommended for modern apps</p>
                            </div>
                        </div>
                        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-50 flex items-center justify-between group cursor-pointer">
                            <span>npm install flexchartjs</span>
                            <Terminal className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                    </div>

                    {/* CDN */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Download className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">CDN</h3>
                                <p className="text-sm text-slate-500">For simple HTML pages</p>
                            </div>
                        </div>
                        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-50 break-all space-y-2">
                            <div>
                                <span className="text-slate-500">{'<!-- unpkg -->'}</span>
                                <br />
                                {'<script src="https://unpkg.com/flexchartjs@1.0.0/dist/index.js"></script>'}
                            </div>
                            <div>
                                <span className="text-slate-500">{'<!-- jsDelivr -->'}</span>
                                <br />
                                {'<script src="https://cdn.jsdelivr.net/npm/flexchartjs@1.0.0/dist/index.js"></script>'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
