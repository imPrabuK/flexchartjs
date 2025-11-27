import { LineChartService } from "./modules/line-chart/LineChartService";

export type Example = {
  id?: string;
  title: string;
  description?: string;
  type: string;
  subtype?: string;
  code: string;
  previewData?: any;
};


const generateBarExamples = (): Example[] => {
  const examples: Example[] = [];
  const titles = [
    "Basic Bar Chart", "Axis Align with Tick", "Bar with Background", "Set Style of Single Bar",
    "Waterfall Chart", "Bar Label Rotation", "Stacked Bar", "Stacked Horizontal Bar",
    "Bar with Negative Value", "Mix Line and Bar", "Animation Delay", "Custom Bar",
    "Large Scale Bar", "Radial Polar Bar", "Tangential Polar Bar"
  ];

  titles.forEach((title, i) => {
    const isStacked = title.includes("Stacked");
    const isHorizontal = title.includes("Horizontal");
    const isMix = title.includes("Mix");

    // Generate some random data for preview
    const data1 = Array.from({ length: 7 }, () => Math.floor(Math.random() * 80) + 10);
    const data2 = Array.from({ length: 7 }, () => Math.floor(Math.random() * 80) + 10);

    const previewSeries = [
      { data: data1, color: "#3b82f6" }
    ];

    if (isStacked || isMix) {
      previewSeries.push({ data: data2, color: isMix ? "#ef4444" : "#10b981" });
    }

    examples.push({
      title,
      type: "Bar",
      subtype: "basic-bar",
      previewData: { series: previewSeries },
      code: `option = {
  title: {
    text: '${title}'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: {
    type: '${isHorizontal ? 'value' : 'category'}',
    ${!isHorizontal ? "data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" : ""}
  },
  yAxis: {
    type: '${isHorizontal ? 'category' : 'value'}',
    ${isHorizontal ? "data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']" : ""}
  },
  series: [
    {
      data: ${JSON.stringify(data1)},
      type: 'bar',
      ${isStacked ? "stack: 'total'," : ""}
      showBackground: ${title.includes("Background")},
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      itemStyle: { color: '#3b82f6' }
    },
    ${(isStacked || isMix) ? `{
      data: ${JSON.stringify(data2)},
      type: '${isMix ? 'line' : 'bar'}',
      ${isStacked ? "stack: 'total'," : ""}
      itemStyle: { color: '${isMix ? '#ef4444' : '#10b981'}' }
    }` : ""}
  ]
};`
    });
  });
  return examples;
};

const generatePieExamples = (): Example[] => {
  const examples: Example[] = [];
  const titles = [
    "Referer of a Website", "Doughnut Chart", "Customized Pie", "Nightingale Chart",
    "Rose Diagram", "Pie with Scrollable Legend", "Rich Text Pie", "Nested Pies",
    "Texture on Pie", "Pie Label Align", "Border Radius Pie", "Half Pie",
    "Pie with Pattern", "Rounded Corner Pie", "Variable Radius Pie"
  ];

  titles.forEach((title, i) => {
    const isDoughnut = title.includes("Doughnut") || title.includes("Nested");
    const isRose = title.includes("Rose") || title.includes("Nightingale");

    examples.push({
      title,
      type: "Pie",
      subtype: "basic-pie",
      code: `option = {
  title: {
    text: '${title}',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ${isDoughnut ? "['40%', '70%']" : "'50%'"},
      ${isRose ? "roseType: 'area'," : ""}
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};`
    });
  });
  return examples;
};

// Generic generator for other types to ensure 15 items exist
const generateGenericExamples = (type: string): Example[] => {
  return Array.from({ length: 15 }).map((_, i) => ({
    title: `${type} Chart Example ${i + 1}`,
    type: type,
    subtype: "basic",
    code: `option = {
  title: {
    text: '${type} Chart ${i + 1}'
  },
  series: []
};`
  }));
};


import { PieChartService } from "./modules/pie-chart/PieChartService";

export const examples: Record<string, Example[]> = {
  "Line": LineChartService.getExamples().map(ex => ({
    ...ex,
    type: "Line",
    subtype: "basic"
  })),
  "Bar": generateBarExamples(),
  "Pie": PieChartService.getExamples().map(ex => ({
    ...ex,
    type: "Pie",
    subtype: "basic"
  })),
  "Scatter": generateGenericExamples("Scatter"),
  "GEO/Map": generateGenericExamples("GEO/Map"),
  "Candlestick": generateGenericExamples("Candlestick"),
  "Radar": generateGenericExamples("Radar"),
  "Boxplot": generateGenericExamples("Boxplot"),
  "Heatmap": generateGenericExamples("Heatmap"),
  "Graph": generateGenericExamples("Graph"),
  "Lines": generateGenericExamples("Lines"),
  "Tree": generateGenericExamples("Tree"),
  "Treemap": generateGenericExamples("Treemap"),
  "Sunburst": generateGenericExamples("Sunburst"),
};
