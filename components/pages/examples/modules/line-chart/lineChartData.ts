import { OptionLike } from "../../../../../packages/flexchartjs/src/LineChart";

export type ChartExample = {
  id: string;
  title: string;
  description: string;
  code: string;
  previewData?: {
    series: {
      points: number[];
      color: string;
      type?: 'line' | 'area' | 'smooth' | 'step';
      fill?: boolean;
    }[];
  };
};

export const lineChartExamples: ChartExample[] = [
  {
    id: "basic-line",
    title: "Basic Line Chart",
    description: "A simple line chart showing trends over time.",
    previewData: {
      series: [{ points: [150, 230, 224, 218, 135, 147, 260], color: "#3b82f6", type: 'line' }]
    },
    code: `option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};`
  },
  {
    id: "smoothed-line",
    title: "Smoothed Line Chart",
    description: "A line chart with smoothed curves for a more organic look.",
    previewData: {
      series: [{ points: [820, 932, 901, 934, 1290, 1330, 1320], color: "#8b5cf6", type: 'smooth' }]
    },
    code: `option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#8b5cf6'
      }
    }
  ]
};`
  },
  {
    id: "basic-area",
    title: "Basic Area Chart",
    description: "A line chart with the area below the line filled.",
    previewData: {
      series: [{ points: [100, 200, 150, 300, 250, 400, 350], color: "#10b981", type: 'area', fill: true }]
    },
    code: `option = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [100, 200, 150, 300, 250, 400, 350],
      type: 'line',
      areaStyle: {
        color: '#10b981',
        opacity: 0.3
      },
      lineStyle: {
        color: '#10b981'
      }
    }
  ]
};`
  },
  {
    id: "gradient-line",
    title: "Gradient Line",
    description: "A line chart with a gradient stroke.",
    previewData: {
      series: [{ points: [50, 100, 80, 120, 90, 150, 130], color: "#f59e0b", type: 'smooth' }]
    },
    code: `option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  },
  yAxis: {},
  series: [
    {
      data: [50, 100, 80, 120, 90, 150, 130],
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 4,
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 1, y2: 0,
          colorStops: [{
              offset: 0, color: '#f59e0b' // color at 0%
          }, {
              offset: 1, color: '#ef4444' // color at 100%
          }]
        }
      }
    }
  ]
};`
  },
  {
    id: "stacked-line",
    title: "Stacked Line Chart",
    description: "Multiple lines stacked on top of each other.",
    previewData: {
      series: [
        { points: [120, 132, 101, 134, 90, 230, 210], color: "#f59e0b", type: 'line' },
        { points: [220, 182, 191, 234, 290, 330, 310], color: "#3b82f6", type: 'line' }
      ]
    },
    code: `option = {
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
      lineStyle: { color: '#f59e0b' }
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310],
      lineStyle: { color: '#3b82f6' }
    }
  ]
};`
  },
  {
    id: "step-line",
    title: "Step Line Chart",
    description: "A line chart that steps between values.",
    previewData: {
      series: [{ points: [30, 50, 40, 60, 50, 70, 60], color: "#ec4899", type: 'step' }]
    },
    code: `option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Step Start',
      type: 'line',
      step: 'start',
      data: [30, 50, 40, 60, 50, 70, 60],
      lineStyle: { color: '#ec4899' }
    }
  ]
};`
  },
  {
    id: "dashed-line",
    title: "Dashed Line Style",
    description: "A line chart using dashed lines.",
    previewData: {
      series: [{ points: [20, 40, 30, 50, 40, 60, 50], color: "#6366f1", type: 'line' }]
    },
    code: `option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: { type: 'value' },
  series: [
    {
      data: [20, 40, 30, 50, 40, 60, 50],
      type: 'line',
      lineStyle: {
        type: 'dashed',
        color: '#6366f1'
      }
    }
  ]
};`
  },
  {
    id: "marker-points",
    title: "Line with Markers",
    description: "Line chart highlighting specific data points.",
    previewData: {
      series: [{ points: [10, 20, 15, 25, 20, 30, 25], color: "#14b8a6", type: 'line' }]
    },
    code: `option = {
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  },
  yAxis: {},
  series: [
    {
      data: [10, 20, 15, 25, 20, 30, 25],
      type: 'line',
      symbol: 'circle',
      symbolSize: 10,
      lineStyle: { color: '#14b8a6' },
      itemStyle: { color: '#14b8a6' }
    }
  ]
};`
  },
  {
    id: "dark-mode",
    title: "Dark Mode Line",
    description: "A line chart optimized for dark backgrounds.",
    previewData: {
      series: [{ points: [5, 15, 10, 20, 15, 25, 20], color: "#f472b6", type: 'smooth' }]
    },
    code: `option = {
  backgroundColor: '#1f2937',
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine: { lineStyle: { color: '#9ca3af' } }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#9ca3af' } }
  },
  series: [
    {
      data: [5, 15, 10, 20, 15, 25, 20],
      type: 'line',
      smooth: true,
      lineStyle: { color: '#f472b6' }
    }
  ]
};`
  },
  {
    id: "confidence-band",
    title: "Confidence Band",
    description: "Visualizing the confidence interval around a trend.",
    previewData: {
      series: [
        { points: [100, 110, 105, 115, 110, 120, 115], color: "#0ea5e9", type: 'area', fill: true }
      ]
    },
    code: `option = {
  title: { text: 'Confidence Band' },
  xAxis: { data: ['1', '2', '3', '4', '5', '6', '7'] },
  yAxis: {},
  series: [
    {
      name: 'L',
      type: 'line',
      data: [90, 100, 95, 105, 100, 110, 105],
      lineStyle: { opacity: 0 },
      stack: 'confidence-band',
      symbol: 'none'
    },
    {
      name: 'U',
      type: 'line',
      data: [20, 20, 20, 20, 20, 20, 20], // Difference
      lineStyle: { opacity: 0 },
      areaStyle: { color: '#ccc' },
      stack: 'confidence-band',
      symbol: 'none'
    },
    {
      type: 'line',
      data: [100, 110, 105, 115, 110, 120, 115],
      itemStyle: { color: '#0ea5e9' }
    }
  ]
};`
  },
  {
    id: "multi-axis",
    title: "Multiple Y Axes",
    description: "Line chart with dual Y-axes for different scales.",
    previewData: {
      series: [
        { points: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6], color: "#d946ef", type: 'line' },
        { points: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3], color: "#f97316", type: 'line' }
      ]
    },
    code: `option = {
  tooltip: { trigger: 'axis' },
  legend: { data: ['Evaporation', 'Temperature'] },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Evaporation',
      position: 'right'
    },
    {
      type: 'value',
      name: 'Temperature',
      position: 'left'
    }
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'line',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
      lineStyle: { color: '#d946ef' }
    },
    {
      name: 'Temperature',
      type: 'line',
      yAxisIndex: 1,
      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3],
      lineStyle: { color: '#f97316' }
    }
  ]
};`
  },
  {
    id: "log-axis",
    title: "Logarithmic Axis",
    description: "Line chart using a logarithmic scale.",
    previewData: {
      series: [{ points: [1, 10, 100, 1000, 10000, 100000, 1000000], color: "#84cc16", type: 'line' }]
    },
    code: `option = {
  xAxis: {
    type: 'category',
    data: ['1', '2', '3', '4', '5', '6', '7']
  },
  yAxis: {
    type: 'log',
    name: 'Log Axis'
  },
  series: [
    {
      name: 'Log3',
      type: 'line',
      data: [1, 3, 9, 27, 81, 247, 741],
      lineStyle: { color: '#84cc16' }
    }
  ]
};`
  },
  {
    id: "rainfall",
    title: "Rainfall vs Evaporation",
    description: "Comparing two datasets with area styles.",
    previewData: {
      series: [
        { points: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6], color: "#06b6d4", type: 'area', fill: true },
        { points: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6], color: "#f43f5e", type: 'area', fill: true }
      ]
    },
    code: `option = {
  title: { text: 'Rainfall vs Evaporation' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['Rainfall', 'Evaporation'] },
  xAxis: {
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  },
  yAxis: {},
  series: [
    {
      name: 'Rainfall',
      type: 'line',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
      areaStyle: {},
      lineStyle: { color: '#06b6d4' },
      itemStyle: { color: '#06b6d4' }
    },
    {
      name: 'Evaporation',
      type: 'line',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
      areaStyle: {},
      lineStyle: { color: '#f43f5e' },
      itemStyle: { color: '#f43f5e' }
    }
  ]
};`
  },
  {
    id: "dynamic-data",
    title: "Dynamic Data",
    description: "Simulating real-time data updates.",
    previewData: {
      series: [{ points: [50, 40, 60, 55, 70, 65, 80], color: "#a855f7", type: 'smooth' }]
    },
    code: `option = {
  title: { text: 'Dynamic Data' },
  xAxis: {
    type: 'category',
    data: (function (){
        var now = new Date();
        var res = [];
        var len = 10;
        while (len--) {
            res.unshift(now.toLocaleTimeString().replace(/^\\D*/,''));
            now = new Date(now - 2000);
        }
        return res;
    })()
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'Dynamic Line',
      type: 'line',
      data: (function (){
          var res = [];
          var len = 10;
          while (len--) {
              res.push(Math.round(Math.random() * 1000));
          }
          return res;
      })(),
      smooth: true,
      lineStyle: { color: '#a855f7' }
    }
  ]
};`
  },
  {
    id: "custom-graphic",
    title: "Custom Graphic",
    description: "Line chart with custom graphic elements.",
    previewData: {
      series: [{ points: [10, 50, 30, 70, 50, 90, 70], color: "#fbbf24", type: 'line' }]
    },
    code: `option = {
  legend: {},
  tooltip: {},
  xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] },
  yAxis: {},
  series: [
    {
      type: 'line',
      data: [10, 50, 30, 70, 50, 90, 70],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      lineStyle: { color: '#fbbf24' },
      itemStyle: { color: '#fbbf24' }
    }
  ]
};`
  }
];
