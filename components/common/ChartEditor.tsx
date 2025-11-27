"use client";

import { useMemo, useState } from "react";
import { LineChart, OptionLike } from "../../packages/flexchartjs/src/LineChart";
import { BarChart } from "../../packages/flexchartjs/src/BarChart";
import { PieChart } from "../../packages/flexchartjs/src/PieChart";

type ViewMode = "edit" | "full" | "preview";
type Language = "js" | "ts";
type ChartType = "Line" | "Bar" | "Pie" | "Scatter" | "Area" | string;

interface ChartEditorProps {
    initialCode: string;
    type: ChartType;
    title: string;
    description?: string;
    onClose?: () => void;
}

function parseOption(code: string): OptionLike | null {
    try {
        // eslint-disable-next-line no-new-func
        const fn = new Function(`${code};
      return typeof option !== "undefined" ? option : null;
    `);
        const result = fn();
        if (result && typeof result === "object") {
            return result as OptionLike;
        }
        return null;
    } catch (e) {
        console.error("Parse error:", e);
        return null;
    }
}

export default function ChartEditor({ initialCode, type, title, description, onClose }: ChartEditorProps) {
    const [viewMode, setViewMode] = useState<ViewMode>("edit");
    const [language, setLanguage] = useState<Language>("js");
    const [code, setCode] = useState<string>(initialCode);
    const [renderedOption, setRenderedOption] = useState<OptionLike | null>(
        () => parseOption(initialCode)
    );
    const [lastRenderMs, setLastRenderMs] = useState<number | null>(null);

    function handleRun() {
        const start = performance.now();
        const parsed = parseOption(code);
        const end = performance.now();
        setRenderedOption(parsed);
        setLastRenderMs(Number((end - start).toFixed(2)));
    }

    const optionPreviewText = useMemo(
        () =>
            renderedOption
                ? JSON.stringify(renderedOption, null, 2)
                : "// Run the code to see the parsed option here.",
        [renderedOption]
    );

    const renderChart = () => {
        const commonProps = {
            option: renderedOption,
            className: "h-full w-full",
        };

        switch (type) {
            case "Line":
            case "Area": // Area is often just a configured Line chart
                return <LineChart {...commonProps} />;
            case "Bar":
                return <BarChart {...commonProps} />;
            case "Pie":
                return <PieChart {...commonProps} />;
            default:
                return <div className="flex items-center justify-center h-full text-slate-400">Chart type {type} not implemented yet</div>;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-8">
            <div className="flex h-full w-full max-w-[90vw] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
                        {description && <p className="text-sm text-slate-500">{description}</p>}
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left: code editor + tabs */}
                    <section className="flex w-1/2 flex-col border-r border-slate-200 bg-white">
                        {/* Top view tabs */}
                        <div className="flex items-center border-b border-slate-200 text-xs font-medium text-slate-600">
                            {(["edit", "full", "preview"] as ViewMode[]).map((mode) => (
                                <button
                                    key={mode}
                                    className={`px-4 py-2 ${viewMode === mode
                                        ? "border-b-2 border-blue-600 text-blue-600"
                                        : "border-b-2 border-transparent hover:bg-slate-50"
                                        }`}
                                    onClick={() => setViewMode(mode)}
                                >
                                    {mode === "edit"
                                        ? "Edit Code"
                                        : mode === "full"
                                            ? "Full Code"
                                            : "Option Preview"}
                                </button>
                            ))}
                            <div className="ml-auto flex items-center text-[11px] px-2">
                                <button
                                    className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-[11px] font-medium text-white shadow-sm hover:bg-blue-700"
                                    onClick={handleRun}
                                >
                                    Run
                                </button>
                            </div>
                        </div>

                        {/* Language tabs */}
                        <div className="flex items-center border-b border-slate-200 bg-slate-50/60 text-xs font-medium text-slate-600">
                            {(["js", "ts"] as Language[]).map((lang) => (
                                <button
                                    key={lang}
                                    className={`px-4 py-2 ${language === lang
                                        ? "border-b-2 border-blue-600 bg-white text-blue-600"
                                        : "border-b-2 border-transparent"
                                        }`}
                                    onClick={() => setLanguage(lang)}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>

                        {/* Code / option content */}
                        <div className="flex-1 bg-slate-50 text-[11px] text-slate-900 relative">
                            {/* Line numbers sidebar - simplified visual only */}
                            <div className="absolute left-0 top-0 bottom-0 w-8 bg-slate-100 border-r border-slate-200 text-slate-400 text-right pr-2 pt-4 font-mono select-none">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div key={i} className="leading-relaxed">{i + 1}</div>
                                ))}
                            </div>

                            {viewMode === "edit" && (
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    spellCheck={false}
                                    className="h-full w-full resize-none bg-transparent pl-10 p-4 font-mono leading-relaxed focus:outline-none"
                                />
                            )}
                            {viewMode === "full" && (
                                <pre className="h-full w-full overflow-auto bg-transparent pl-10 p-4 font-mono leading-relaxed">
                                    {/* Mock full code wrapper */}
                                    {`import { createChart } from 'flexchartjs';\n\n// ... setup code ...\n\n${code}`}
                                </pre>
                            )}
                            {viewMode === "preview" && (
                                <pre className="h-full w-full overflow-auto bg-transparent pl-10 p-4 font-mono leading-relaxed">
                                    {optionPreviewText}
                                </pre>
                            )}
                        </div>
                    </section>

                    {/* Right: chart preview */}
                    <section className="flex w-1/2 flex-col bg-slate-50/50">
                        <div className="mb-3 flex items-center justify-between border-b border-slate-200 px-4 py-2 text-xs text-slate-600 bg-white">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex h-4 w-8 items-center rounded-full bg-slate-200 cursor-pointer">
                                        <span className="ml-[2px] h-3 w-3 rounded-full bg-white shadow" />
                                    </span>
                                    <span className="text-[11px] text-slate-500">Dark Mode</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex h-4 w-8 items-center rounded-full bg-slate-200 cursor-pointer">
                                        <span className="ml-[2px] h-3 w-3 rounded-full bg-white shadow" />
                                    </span>
                                    <span className="text-[11px] text-slate-500">
                                        Decal Pattern
                                    </span>
                                </div>
                                <button
                                    className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-700 hover:border-blue-500"
                                    onClick={handleRun}
                                >
                                    Render
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-6 flex items-center justify-center">
                            <div className="h-[400px] w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                {renderChart()}
                            </div>
                        </div>

                        <div className="mt-auto border-t border-slate-200 bg-white px-4 py-2 flex items-center justify-between text-[11px] text-slate-500">
                            <div className="flex gap-2">
                                <button className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 hover:bg-slate-50">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    Download
                                </button>
                                <button className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 hover:bg-slate-50">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    Screenshot
                                </button>
                                <button className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 hover:bg-slate-50">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                                    Share
                                </button>
                            </div>
                            <span>
                                {lastRenderMs != null
                                    ? `Chart has been generated in ${lastRenderMs}ms`
                                    : "Chart has not been rendered yet"}
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
