"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  LineChart: () => LineChart,
  createChart: () => createChart
});
module.exports = __toCommonJS(index_exports);

// src/LineChart.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function LineChart({ option, width = "100%", height = "100%", className }) {
  const { points, xLabels, minY, maxY } = (0, import_react.useMemo)(() => {
    if (!option?.xAxis?.data || !option.series?.[0]?.data) {
      return {
        points: [],
        xLabels: [],
        minY: 0,
        maxY: 0
      };
    }
    const xData = option.xAxis.data;
    const yData = option.series[0].data ?? [];
    const numericY = yData.map((v) => Number(v));
    const valid = numericY.filter((v) => !Number.isNaN(v));
    const minY2 = Math.min(...valid);
    const maxY2 = Math.max(...valid);
    const span = maxY2 - minY2 || 1;
    const svgWidth = 400;
    const svgHeight = 220;
    const paddingX = 32;
    const paddingY = 24;
    const stepX = xData.length > 1 ? (svgWidth - paddingX * 2) / (xData.length - 1) : 0;
    const pts = numericY.map((y, idx) => {
      const x = paddingX + stepX * idx;
      const normalized = (y - minY2) / span;
      const yPos = svgHeight - paddingY - normalized * (svgHeight - paddingY * 2);
      return `${x},${yPos}`;
    });
    return { points: pts, xLabels: xData, minY: minY2, maxY: maxY2 };
  }, [option]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className, style: { width, height }, children: !points.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex h-full items-center justify-center text-xs text-slate-400", children: "No data to display" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 400 260", className: "h-full w-full", preserveAspectRatio: "xMidYMid meet", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "lineArea", x1: "0", x2: "0", y1: "0", y2: "1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#2563eb", stopOpacity: "0.2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: "#2563eb", stopOpacity: "0" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "line",
      {
        x1: "32",
        x2: "368",
        y1: "220",
        y2: "220",
        stroke: "#e5e7eb",
        strokeWidth: "1"
      }
    ),
    Array.from({ length: 4 }).map((_, idx) => {
      const y = 60 + (220 - 60) / 3 * idx;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "line",
        {
          x1: "32",
          x2: "368",
          y1: y,
          y2: y,
          stroke: "#f3f4f6",
          strokeWidth: "1"
        },
        idx
      );
    }),
    points.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "polyline",
      {
        points: `32,220 ${points.join(" ")} 368,220`,
        fill: "url(#lineArea)",
        stroke: "none"
      }
    ),
    points.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "polyline",
      {
        points: points.join(" "),
        fill: "none",
        stroke: "#2563eb",
        strokeWidth: "2"
      }
    ),
    points.map((pt, idx) => {
      const [x, y] = pt.split(",").map(Number);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: x, cy: y, r: 3, fill: "#2563eb" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "circle",
          {
            cx: x,
            cy: y,
            r: 5,
            fill: "white",
            stroke: "#2563eb",
            strokeOpacity: "0.4"
          }
        )
      ] }, idx);
    }),
    xLabels.map((label, idx) => {
      const [x] = (points[idx] ?? "").split(",").map(Number);
      if (!Number.isFinite(x)) return null;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "text",
        {
          x,
          y: 238,
          textAnchor: "middle",
          fontSize: "10",
          fill: "#6b7280",
          children: String(label)
        },
        String(label) + idx
      );
    }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "text",
      {
        x: 368,
        y: 40,
        textAnchor: "end",
        fontSize: "10",
        fill: "#9ca3af",
        children: [
          minY,
          " \u2013 ",
          maxY
        ]
      }
    )
  ] }) });
}

// src/index.ts
function createChart(container) {
  console.log("createChart called on", container);
  return {
    setOption: (option) => {
      console.log("setOption called with", option);
    },
    resize: () => {
    },
    dispose: () => {
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LineChart,
  createChart
});
//# sourceMappingURL=index.js.map