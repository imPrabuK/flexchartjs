// src/LineChart.tsx
import { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316"
];
function LineChart({ option, width = "100%", height = "100%", className }) {
  const { seriesData, xLabels, minY, maxY } = useMemo(() => {
    if (!option?.xAxis?.data && !option?.series) {
      return { seriesData: [], xLabels: [], minY: 0, maxY: 0 };
    }
    const xLabels2 = option?.xAxis?.data || [];
    const series = option?.series || [];
    let allValues = [];
    series.forEach((s) => {
      if (s.data) {
        const numericData = s.data.map((d) => typeof d === "object" ? d.value : Number(d));
        allValues = allValues.concat(numericData.filter((n) => !isNaN(n)));
      }
    });
    const minY2 = Math.min(...allValues);
    const maxY2 = Math.max(...allValues);
    const span = maxY2 - minY2 || 1;
    const svgWidth = 600;
    const svgHeight = 300;
    const paddingX = 40;
    const paddingY = 40;
    const stepX = xLabels2.length > 1 ? (svgWidth - paddingX * 2) / (xLabels2.length - 1) : (svgWidth - paddingX * 2) / 2;
    const seriesData2 = series.map((s, sIdx) => {
      const data = s.data || [];
      const points = data.map((val, idx) => {
        const numVal = typeof val === "object" ? val.value : Number(val);
        const x = paddingX + stepX * idx;
        const normalized = (numVal - minY2) / span;
        const y = svgHeight - paddingY - normalized * (svgHeight - paddingY * 2);
        return { x, y, value: numVal };
      });
      let color = COLORS[sIdx % COLORS.length];
      if (s.lineStyle?.color && typeof s.lineStyle.color === "string") {
        color = s.lineStyle.color;
      } else if (s.itemStyle?.color) {
        if (typeof s.itemStyle.color === "string") {
          color = s.itemStyle.color;
        } else if (s.itemStyle.color.colorStops) {
          color = s.itemStyle.color.colorStops[0]?.color || COLORS[sIdx % COLORS.length];
        }
      }
      if (s.lineStyle?.color && typeof s.lineStyle.color === "object") {
        if (s.lineStyle.color.colorStops) color = s.lineStyle.color.colorStops[1]?.color || COLORS[sIdx];
      }
      return {
        ...s,
        color,
        points,
        pointsStr: points.map((p) => `${p.x},${p.y}`).join(" ")
      };
    });
    return { seriesData: seriesData2, xLabels: xLabels2, minY: minY2, maxY: maxY2 };
  }, [option]);
  return /* @__PURE__ */ jsx("div", { className, style: { width, height, backgroundColor: option?.backgroundColor || "transparent" }, children: !seriesData.length ? /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center text-xs text-slate-400", children: "No data to display" }) : /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 600 300", className: "h-full w-full", preserveAspectRatio: "xMidYMid meet", children: [
    /* @__PURE__ */ jsx("line", { x1: "40", x2: "560", y1: "260", y2: "260", stroke: "#e5e7eb", strokeWidth: "1" }),
    /* @__PURE__ */ jsx("line", { x1: "40", x2: "40", y1: "40", y2: "260", stroke: "#e5e7eb", strokeWidth: "1" }),
    Array.from({ length: 5 }).map((_, i) => {
      const y = 260 - i * (220 / 4);
      return /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("line", { x1: "35", x2: "560", y1: y, y2: y, stroke: "#f3f4f6", strokeWidth: "1", strokeDasharray: "4 4" }),
        /* @__PURE__ */ jsx("text", { x: "30", y: y + 4, textAnchor: "end", fontSize: "10", fill: "#9ca3af", children: Math.round(minY + i * (maxY - minY) / 4) })
      ] }, i);
    }),
    seriesData.map((s, i) => /* @__PURE__ */ jsxs("g", { children: [
      s.areaStyle && /* @__PURE__ */ jsx(
        "polygon",
        {
          points: `40,260 ${s.pointsStr} ${s.points[s.points.length - 1]?.x},260`,
          fill: s.areaStyle.color || s.color,
          fillOpacity: s.areaStyle.opacity || 0.2,
          stroke: "none"
        }
      ),
      /* @__PURE__ */ jsx(
        "polyline",
        {
          points: s.pointsStr,
          fill: "none",
          stroke: s.color,
          strokeWidth: s.lineStyle?.width || 2,
          strokeDasharray: s.lineStyle?.type === "dashed" ? "5,5" : "none",
          strokeLinejoin: "round",
          strokeLinecap: "round"
        }
      ),
      s.symbol !== "none" && s.points.map((p, idx) => /* @__PURE__ */ jsx(
        "circle",
        {
          cx: p.x,
          cy: p.y,
          r: s.symbolSize ? s.symbolSize / 2 : 3,
          fill: "white",
          stroke: s.color,
          strokeWidth: "2"
        },
        idx
      ))
    ] }, i)),
    xLabels.map((label, idx) => {
      if (xLabels.length > 10 && idx % Math.ceil(xLabels.length / 10) !== 0) return null;
      const stepX = xLabels.length > 1 ? (600 - 80) / (xLabels.length - 1) : (600 - 80) / 2;
      const x = 40 + stepX * idx;
      return /* @__PURE__ */ jsx("text", { x, y: "280", textAnchor: "middle", fontSize: "10", fill: "#6b7280", children: label }, idx);
    })
  ] }) });
}

// src/BarChart.tsx
import { useMemo as useMemo2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var COLORS2 = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316"
];
function BarChart({ option, width = "100%", height = "100%", className }) {
  const { seriesData, xLabels, minY, maxY } = useMemo2(() => {
    if (!option?.xAxis?.data && !option?.series) {
      return { seriesData: [], xLabels: [], minY: 0, maxY: 0 };
    }
    const xLabels2 = option?.xAxis?.data || [];
    const series = option?.series || [];
    let allValues = [];
    series.forEach((s) => {
      if (s.data) allValues = allValues.concat(s.data.map(Number).filter((n) => !isNaN(n)));
    });
    const minY2 = Math.min(0, ...allValues);
    const maxY2 = Math.max(...allValues);
    const span = maxY2 - minY2 || 1;
    const svgWidth = 600;
    const svgHeight = 300;
    const paddingX = 40;
    const paddingY = 40;
    const availableWidth = svgWidth - paddingX * 2;
    const groupWidth = availableWidth / xLabels2.length;
    const paddingGroup = groupWidth * 0.2;
    const availableGroupWidth = groupWidth - paddingGroup;
    const barWidth = availableGroupWidth / series.length;
    const seriesData2 = series.map((s, sIdx) => {
      const data = s.data || [];
      const bars = data.map((val, idx) => {
        const groupX = paddingX + groupWidth * idx + paddingGroup / 2;
        const x = groupX + barWidth * sIdx;
        const normalized = (Number(val) - minY2) / span;
        const barHeight = normalized * (svgHeight - paddingY * 2);
        const y = svgHeight - paddingY - barHeight;
        return { x, y, width: barWidth * 0.8, height: barHeight, value: val };
      });
      let color = COLORS2[sIdx % COLORS2.length];
      if (s.itemStyle?.color) {
        if (typeof s.itemStyle.color === "string") {
          color = s.itemStyle.color;
        } else if (s.itemStyle.color.colorStops) {
          color = s.itemStyle.color.colorStops[0]?.color || COLORS2[sIdx % COLORS2.length];
        }
      }
      return {
        ...s,
        color,
        bars
      };
    });
    return { seriesData: seriesData2, xLabels: xLabels2, minY: minY2, maxY: maxY2 };
  }, [option]);
  return /* @__PURE__ */ jsx2("div", { className, style: { width, height, backgroundColor: option?.backgroundColor || "transparent" }, children: !seriesData.length ? /* @__PURE__ */ jsx2("div", { className: "flex h-full items-center justify-center text-xs text-slate-400", children: "No data to display" }) : /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 600 300", className: "h-full w-full", preserveAspectRatio: "xMidYMid meet", children: [
    /* @__PURE__ */ jsx2("line", { x1: "40", x2: "560", y1: "260", y2: "260", stroke: "#e5e7eb", strokeWidth: "1" }),
    /* @__PURE__ */ jsx2("line", { x1: "40", x2: "40", y1: "40", y2: "260", stroke: "#e5e7eb", strokeWidth: "1" }),
    Array.from({ length: 5 }).map((_, i) => {
      const y = 260 - i * (220 / 4);
      return /* @__PURE__ */ jsxs2("g", { children: [
        /* @__PURE__ */ jsx2("line", { x1: "35", x2: "560", y1: y, y2: y, stroke: "#f3f4f6", strokeWidth: "1", strokeDasharray: "4 4" }),
        /* @__PURE__ */ jsx2("text", { x: "30", y: y + 4, textAnchor: "end", fontSize: "10", fill: "#9ca3af", children: Math.round(minY + i * (maxY - minY) / 4) })
      ] }, i);
    }),
    seriesData.map((s, sIdx) => /* @__PURE__ */ jsx2("g", { children: s.bars.map((bar, idx) => /* @__PURE__ */ jsx2(
      "rect",
      {
        x: bar.x,
        y: bar.y,
        width: bar.width,
        height: bar.height,
        fill: s.color,
        rx: "2"
      },
      idx
    )) }, sIdx)),
    xLabels.map((label, idx) => {
      if (xLabels.length > 10 && idx % Math.ceil(xLabels.length / 10) !== 0) return null;
      const groupWidth = (600 - 80) / xLabels.length;
      const x = 40 + groupWidth * idx + groupWidth / 2;
      return /* @__PURE__ */ jsx2("text", { x, y: "280", textAnchor: "middle", fontSize: "10", fill: "#6b7280", children: label }, idx);
    })
  ] }) });
}

// src/PieChart.tsx
import { useMemo as useMemo3 } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var COLORS3 = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#f97316"
];
function PieChart({ option, width = "100%", height = "100%", className }) {
  const { slices, title } = useMemo3(() => {
    if (!option?.series?.[0]?.data) {
      return { slices: [], title: option?.title?.text };
    }
    const series = option.series[0];
    const rawData = series.data || [];
    const data = rawData.map((d) => {
      if (typeof d === "object") return d;
      return { value: Number(d), name: "" };
    });
    const total = data.reduce((acc, item) => acc + item.value, 0);
    let innerRadius = 0;
    let outerRadius = 80;
    if (series.radius) {
      if (Array.isArray(series.radius)) {
        const parseRadius = (r) => {
          if (typeof r === "string" && r.endsWith("%")) {
            return parseFloat(r) / 100 * 100;
          }
          return Number(r);
        };
        innerRadius = parseRadius(series.radius[0]);
        outerRadius = parseRadius(series.radius[1]);
      } else {
        if (typeof series.radius === "string" && series.radius.endsWith("%")) {
          outerRadius = parseFloat(series.radius) / 100 * 100;
        } else {
          outerRadius = Number(series.radius);
        }
      }
    }
    const isRose = !!series.roseType;
    const maxVal = Math.max(...data.map((d) => d.value));
    let cx = 200;
    let cy = 150;
    if (series.center) {
      const parseCenter = (c, size) => {
        if (typeof c === "string" && c.endsWith("%")) {
          return parseFloat(c) / 100 * size;
        }
        return Number(c);
      };
      cx = parseCenter(series.center[0], 400);
      cy = parseCenter(series.center[1], 300);
    }
    let startAngle = 0;
    if (series.startAngle !== void 0) startAngle = series.startAngle;
    const slices2 = data.map((item, idx) => {
      const angle = item.value / total * 360;
      const endAngle = startAngle + angle;
      const currentOuterRadius = isRose ? innerRadius + (outerRadius - innerRadius) * (item.value / maxVal) : outerRadius;
      const startRad = Math.PI * (startAngle - 90) / 180;
      const endRad = Math.PI * (endAngle - 90) / 180;
      const x1 = cx + currentOuterRadius * Math.cos(startRad);
      const y1 = cy + currentOuterRadius * Math.sin(startRad);
      const x2 = cx + currentOuterRadius * Math.cos(endRad);
      const y2 = cy + currentOuterRadius * Math.sin(endRad);
      const x3 = cx + innerRadius * Math.cos(endRad);
      const y3 = cy + innerRadius * Math.sin(endRad);
      const x4 = cx + innerRadius * Math.cos(startRad);
      const y4 = cy + innerRadius * Math.sin(startRad);
      const largeArcFlag = angle > 180 ? 1 : 0;
      let path = "";
      if (innerRadius > 0) {
        path = `M ${x1} ${y1} A ${currentOuterRadius} ${currentOuterRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4} Z`;
      } else {
        path = `M ${cx} ${cy} L ${x1} ${y1} A ${currentOuterRadius} ${currentOuterRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      }
      let color = COLORS3[idx % COLORS3.length];
      if (item.itemStyle?.color) {
        if (typeof item.itemStyle.color === "string") {
          color = item.itemStyle.color;
        } else if (item.itemStyle.color.colorStops) {
          color = item.itemStyle.color.colorStops[0]?.color || COLORS3[idx % COLORS3.length];
        }
      }
      startAngle = endAngle;
      return {
        path,
        color,
        value: item.value,
        name: item.name,
        centroid: {
          x: cx + (currentOuterRadius + innerRadius) / 2 * Math.cos((startRad + endRad) / 2),
          y: cy + (currentOuterRadius + innerRadius) / 2 * Math.sin((startRad + endRad) / 2)
        },
        label: series.label
        // Pass label config
      };
    });
    return { slices: slices2, title: option?.title?.text };
  }, [option]);
  return /* @__PURE__ */ jsx3("div", { className, style: { width, height, backgroundColor: option?.backgroundColor || "transparent" }, children: !slices.length ? /* @__PURE__ */ jsx3("div", { className: "flex h-full items-center justify-center text-xs text-slate-400", children: "No data to display" }) : /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 400 300", className: "h-full w-full", preserveAspectRatio: "xMidYMid meet", children: [
    title && /* @__PURE__ */ jsx3("text", { x: "200", y: "30", textAnchor: "middle", fontSize: "14", fontWeight: "bold", fill: option?.title?.textStyle?.color || "#374151", children: title }),
    slices.map((slice, idx) => /* @__PURE__ */ jsxs3("g", { children: [
      /* @__PURE__ */ jsx3(
        "path",
        {
          d: slice.path,
          fill: slice.color,
          stroke: option?.backgroundColor || "white",
          strokeWidth: "2"
        }
      ),
      slice.value > 0 && slice.label?.show !== false && /* @__PURE__ */ jsx3(
        "text",
        {
          x: slice.centroid.x,
          y: slice.centroid.y,
          textAnchor: "middle",
          dy: "0.3em",
          fontSize: "10",
          fill: "white",
          pointerEvents: "none",
          style: { textShadow: "0px 0px 2px rgba(0,0,0,0.5)" },
          children: slice.name
        }
      )
    ] }, idx))
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
export {
  BarChart,
  LineChart,
  PieChart,
  createChart
};
//# sourceMappingURL=index.mjs.map