"use client";

import { useMemo, useState } from "react";

const defaultEditCode = `option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {},
    },
  ],
};`;

const defaultFullCode = `import { createChart } from 'flexchartjs';

const container = document.getElementById('main');
const chart = createChart(container);
let option;

option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {},
    },
  ],
};

if (option) {
  chart.setOption(option);
}`;

type OptionLike = {
  xAxis?: { data?: (string | number)[] };
  yAxis?: { type?: string };
  series?: { data?: number[]; type?: string; areaStyle?: object }[];
};

function parseOption(code: string): OptionLike | null {
  try {
    const fn = new Function(`${code};
      return typeof option !== "undefined" ? option : null;
    `);
    const result = fn();
    if (result && typeof result === "object") {
      return result as OptionLike;
    }
    return null;
  } catch {
    return null;
  }
}

function AreaPreview({ option }: { option: OptionLike | null }) {
  const { points, xLabels, minY, maxY } = useMemo(() => {
    if (!option?.xAxis?.data || !option.series?.[0]?.data) {
      return {
        points: [] as string[],
        xLabels: [] as (string | number)[],
        minY: 0,
        maxY: 0,
      };
    }

    const xData = option.xAxis.data;
    const yData = option.series[0].data ?? [];
    const numericY = yData.map((v) => Number(v));
    const valid = numericY.filter((v) => !Number.isNaN(v));
    const minY = Math.min(...valid);
    const maxY = Math.max(...valid);
    const span = maxY - minY || 1;

    const width = 400;
    const height = 220;
    const paddingX = 32;
    const paddingY = 24;

    const stepX =
      xData.length > 1 ? (width - paddingX * 2) / (xData.length - 1) : 0;

    const pts = numericY.map((y, idx) => {
      const x = paddingX + stepX * idx;
      const normalized = (y - minY) / span;
      const yPos = height - paddingY - normalized * (height - paddingY * 2);
      return `${x},${yPos}`;
    });

    return { points: pts, xLabels: xData, minY, maxY };
  }, [option]);

  return (
    <div className="h-full rounded-md border border-slate-200 bg-white px-4 py-3">
      {!points.length ? (
        <div className="flex h-full items-center justify-center text-xs text-slate-400">
          Edit the option on the left and click Run to render the chart.
        </div>
      ) : (
        <svg viewBox="0 0 400 260" className="h-full w-full">
          <defs>
            <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <line
            x1="32"
            x2="368"
            y1="220"
            y2="220"
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {Array.from({ length: 4 }).map((_, idx) => {
            const y = 60 + ((220 - 60) / 3) * idx;
            return (
              <line
                key={idx}
                x1="32"
                x2="368"
                y1={y}
                y2={y}
                stroke="#f3f4f6"
                strokeWidth="1"
              />
            );
          })}

          {points.length > 1 && (
            <polyline
              points={`32,220 ${points.join(" ")} 368,220`}
              fill="url(#areaGradient)"
              stroke="none"
            />
          )}

          {points.length > 1 && (
            <polyline
              points={points.join(" ")}
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
            />
          )}

          {points.map((pt, idx) => {
            const [x, y] = pt.split(",").map(Number);
            return (
              <g key={idx}>
                <circle cx={x} cy={y} r={3} fill="#2563eb" />
                <circle
                  cx={x}
                  cy={y}
                  r={5}
                  fill="white"
                  stroke="#2563eb"
                  strokeOpacity="0.4"
                />
              </g>
            );
          })}

          {xLabels.map((label, idx) => {
            const [x] = (points[idx] ?? "").split(",").map(Number);
            if (!Number.isFinite(x)) return null;
            return (
              <text
                key={String(label) + idx}
                x={x}
                y={238}
                textAnchor="middle"
                fontSize="10"
                fill="#6b7280"
              >
                {String(label)}
              </text>
            );
          })}

          <text
            x={368}
            y={40}
            textAnchor="end"
            fontSize="10"
            fill="#9ca3af"
          >
            {minY} – {maxY}
          </text>
        </svg>
      )}
    </div>
  );
}

type ViewMode = "edit" | "full" | "preview";
type Language = "js" | "ts";

export default function AreaExamplePage() {
  const [viewMode, setViewMode] = useState<ViewMode>("edit");
  const [language, setLanguage] = useState<Language>("js");
  const [editCode, setEditCode] = useState<string>(defaultEditCode);
  const [fullCode] = useState<string>(defaultFullCode);
  const [renderedOption, setRenderedOption] = useState<OptionLike | null>(
    () => parseOption(defaultEditCode)
  );
  const [lastRenderMs, setLastRenderMs] = useState<number | null>(24.5);

  function handleRun() {
    const start = performance.now();
    const parsed = parseOption(editCode);
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

  return (
    <div className="w-full bg-slate-50">
      <div className="px-6 py-6 md:px-10">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Basic Area Chart
            </h1>
            <p className="text-xs text-slate-500">Examples / Line</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
              <span className="h-3 w-5 rounded-full bg-slate-200" />
              <span className="text-[11px]">Dark Mode</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1">
              <span className="h-3 w-5 rounded-full bg-slate-200" />
              <span className="text-[11px]">Decal Pattern</span>
            </div>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.35fr)]">
          <section className="flex flex-col rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center border-b border-slate-200 text-xs font-medium text-slate-600">
              {(["edit", "full", "preview"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  className={`px-4 py-2 ${
                    viewMode === mode
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
              <div className="ml-auto flex items-center text-[11px]">
                <button
                  className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-[11px] font-medium text-white shadow-sm hover:bg-blue-700"
                  onClick={handleRun}
                >
                  Run
                </button>
              </div>
            </div>

            <div className="flex items-center border-b border-slate-200 bg-slate-50/60 text-xs font-medium text-slate-600">
              {(["js", "ts"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  className={`px-4 py-2 ${
                    language === lang
                      ? "border-b-2 border-blue-600 bg-white text-blue-600"
                      : "border-b-2 border-transparent"
                  }`}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex-1 bg-slate-950 text-[11px] text-slate-50">
              {viewMode === "edit" && (
                <textarea
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value)}
                  spellCheck={false}
                  className="h-[260px] w-full resize-none bg-transparent p-4 font-mono leading-relaxed focus:outline-none"
                />
              )}
              {viewMode === "full" && (
                <pre className="h-[260px] w-full overflow-auto bg-transparent p-4 font-mono leading-relaxed">
                  {fullCode}
                </pre>
              )}
              {viewMode === "preview" && (
                <pre className="h-[260px] w-full overflow-auto bg-transparent p-4 font-mono leading-relaxed">
                  {optionPreviewText}
                </pre>
              )}
            </div>
          </section>

          <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-4">
                <span className="font-medium text-slate-800">Preview</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">Dark Mode</span>
                  <span className="inline-flex h-4 w-8 items-center rounded-full bg-slate-200">
                    <span className="ml-[2px] h-3 w-3 rounded-full bg-white shadow" />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">
                    Decal Pattern
                  </span>
                  <span className="inline-flex h-4 w-8 items-center rounded-full bg-slate-200">
                    <span className="ml-[2px] h-3 w-3 rounded-full bg-white shadow" />
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

            <div className="flex-1 rounded-lg bg-slate-50 p-4">
              <AreaPreview option={renderedOption} />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex gap-2">
                <button className="rounded border border-slate-200 px-2 py-1">
                  Download
                </button>
                <button className="rounded border border-slate-200 px-2 py-1">
                  Screenshot
                </button>
                <button className="rounded border border-slate-200 px-2 py-1">
                  Share
                </button>
              </div>
              <span>
                19:10:07{" "}
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

