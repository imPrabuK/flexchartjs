import { ChartExample } from "./pieChartData";

export const pieChartExamples: ChartExample[] = [
  {
    id: "basic-pie",
    title: "Basic Pie Chart",
    description: "A simple pie chart showing data distribution.",
    previewData: {
      slices: [
        { value: 1048, color: "#3b82f6" },
        { value: 735, color: "#ef4444" },
        { value: 580, color: "#10b981" },
        { value: 484, color: "#f59e0b" },
        { value: 300, color: "#8b5cf6" }
      ]
    },
    code: `option = {
  title: {
    text: 'Referer of a Website',
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
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine', itemStyle: { color: '#3b82f6' } },
        { value: 735, name: 'Direct', itemStyle: { color: '#ef4444' } },
        { value: 580, name: 'Email', itemStyle: { color: '#10b981' } },
        { value: 484, name: 'Union Ads', itemStyle: { color: '#f59e0b' } },
        { value: 300, name: 'Video Ads', itemStyle: { color: '#8b5cf6' } }
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
  },
  {
    id: "doughnut-chart",
    title: "Doughnut Chart",
    description: "A pie chart with a hole in the center.",
    previewData: {
      slices: [
        { value: 1048, color: "#3b82f6" },
        { value: 735, color: "#ef4444" },
        { value: 580, color: "#10b981" },
        { value: 484, color: "#f59e0b" },
        { value: 300, color: "#8b5cf6" }
      ],
      innerRadius: 0.5
    },
    code: `option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine', itemStyle: { color: '#3b82f6' } },
        { value: 735, name: 'Direct', itemStyle: { color: '#ef4444' } },
        { value: 580, name: 'Email', itemStyle: { color: '#10b981' } },
        { value: 484, name: 'Union Ads', itemStyle: { color: '#f59e0b' } },
        { value: 300, name: 'Video Ads', itemStyle: { color: '#8b5cf6' } }
      ]
    }
  ]
};`
  },
  {
    id: "nightingale-chart",
    title: "Nightingale Chart",
    description: "A rose diagram where radius varies with value.",
    previewData: {
      slices: [
        { value: 40, color: "#06b6d4" },
        { value: 38, color: "#ec4899" },
        { value: 32, color: "#8b5cf6" },
        { value: 30, color: "#f97316" },
        { value: 28, color: "#10b981" },
        { value: 26, color: "#f59e0b" },
        { value: 22, color: "#ef4444" },
        { value: 18, color: "#3b82f6" }
      ],
      roseType: true,
      innerRadius: 0.2
    },
    code: `option = {
  legend: {
    top: 'bottom'
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [20, 150],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: [
        { value: 40, name: 'rose 1', itemStyle: { color: '#06b6d4' } },
        { value: 38, name: 'rose 2', itemStyle: { color: '#ec4899' } },
        { value: 32, name: 'rose 3', itemStyle: { color: '#8b5cf6' } },
        { value: 30, name: 'rose 4', itemStyle: { color: '#f97316' } },
        { value: 28, name: 'rose 5', itemStyle: { color: '#10b981' } },
        { value: 26, name: 'rose 6', itemStyle: { color: '#f59e0b' } },
        { value: 22, name: 'rose 7', itemStyle: { color: '#ef4444' } },
        { value: 18, name: 'rose 8', itemStyle: { color: '#3b82f6' } }
      ]
    }
  ]
};`
  },
  {
    id: "customized-pie",
    title: "Customized Pie",
    description: "Pie chart with custom colors and styles.",
    previewData: {
      slices: [
        { value: 335, color: "#5470c6" },
        { value: 310, color: "#91cc75" },
        { value: 274, color: "#fac858" },
        { value: 235, color: "#ee6666" },
        { value: 400, color: "#73c0de" }
      ]
    },
    code: `option = {
  backgroundColor: '#2c343c',
  title: {
    text: 'Customized Pie',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 335, name: 'Direct', itemStyle: { color: '#5470c6' } },
        { value: 310, name: 'Email', itemStyle: { color: '#91cc75' } },
        { value: 274, name: 'Union Ads', itemStyle: { color: '#fac858' } },
        { value: 235, name: 'Video Ads', itemStyle: { color: '#ee6666' } },
        { value: 400, name: 'Search Engine', itemStyle: { color: '#73c0de' } }
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        color: 'rgba(255, 255, 255, 0.3)'
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  ]
};`
  },
  {
    id: "half-doughnut",
    title: "Half Doughnut",
    description: "A semi-circle doughnut chart (gauge style).",
    previewData: {
      slices: [
        { value: 1048, color: "#3b82f6" },
        { value: 735, color: "#ef4444" },
        { value: 580, color: "#10b981" },
        { value: 2363, color: "transparent" } // Half hidden
      ],
      innerRadius: 0.6
    },
    code: `option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '70%'],
      startAngle: 180,
      endAngle: 360,
      data: [
        { value: 1048, name: 'Search Engine', itemStyle: { color: '#3b82f6' } },
        { value: 735, name: 'Direct', itemStyle: { color: '#ef4444' } },
        { value: 580, name: 'Email', itemStyle: { color: '#10b981' } }
      ]
    }
  ]
};`
  },
  {
    id: "rounded-pie",
    title: "Rounded Corner Pie",
    description: "Pie chart with rounded corners on slices.",
    previewData: {
      slices: [
        { value: 1048, color: "#6366f1" },
        { value: 735, color: "#ec4899" },
        { value: 580, color: "#14b8a6" },
        { value: 484, color: "#f97316" }
      ],
      innerRadius: 0.5
    },
    code: `option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      data: [
        { value: 1048, name: 'Search Engine', itemStyle: { color: '#6366f1' } },
        { value: 735, name: 'Direct', itemStyle: { color: '#ec4899' } },
        { value: 580, name: 'Email', itemStyle: { color: '#14b8a6' } },
        { value: 484, name: 'Union Ads', itemStyle: { color: '#f97316' } }
      ]
    }
  ]
};`
  },
  {
    id: "nested-pies",
    title: "Nested Pies",
    description: "Two pie charts nested to show hierarchy.",
    previewData: {
      slices: [
        { value: 335, color: "#5470c6" },
        { value: 310, color: "#91cc75" },
        { value: 234, color: "#fac858" }
      ],
      innerRadius: 0.3
    },
    code: `option = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],
      label: {
        position: 'inner',
        fontSize: 14
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1548, name: 'Search Engine', itemStyle: { color: '#5470c6' } },
        { value: 775, name: 'Direct', itemStyle: { color: '#91cc75' } },
        { value: 679, name: 'Marketing', itemStyle: { color: '#fac858' } }
      ]
    },
    {
      name: 'Access From',
      type: 'pie',
      radius: ['45%', '60%'],
      data: [
        { value: 1048, name: 'Baidu', itemStyle: { color: '#5470c6' } },
        { value: 335, name: 'Direct', itemStyle: { color: '#91cc75' } },
        { value: 310, name: 'Email', itemStyle: { color: '#fac858' } },
        { value: 251, name: 'Google', itemStyle: { color: '#ee6666' } },
        { value: 234, name: 'Union Ads', itemStyle: { color: '#73c0de' } }
      ]
    }
  ]
};`
  },
  {
    id: "texture-pie",
    title: "Texture on Pie",
    description: "Applying textures or patterns to pie slices.",
    previewData: {
      slices: [
        { value: 1048, color: "#3b82f6" },
        { value: 735, color: "#ef4444" },
        { value: 580, color: "#10b981" }
      ]
    },
    code: `option = {
  title: {
    text: 'Texture on Pie',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine', itemStyle: { color: '#3b82f6', decal: { symbol: 'rect' } } },
        { value: 735, name: 'Direct', itemStyle: { color: '#ef4444', decal: { symbol: 'circle' } } },
        { value: 580, name: 'Email', itemStyle: { color: '#10b981', decal: { symbol: 'diamond' } } }
      ]
    }
  ]
};`
  },
  {
    id: "monochrome-pie",
    title: "Monochrome Pie",
    description: "Pie chart using shades of a single color.",
    previewData: {
      slices: [
        { value: 500, color: "#1e3a8a" },
        { value: 400, color: "#1d4ed8" },
        { value: 300, color: "#2563eb" },
        { value: 200, color: "#3b82f6" },
        { value: 100, color: "#60a5fa" }
      ]
    },
    code: `option = {
  title: { text: 'Monochrome Theme', left: 'center' },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { value: 500, name: 'A', itemStyle: { color: '#1e3a8a' } },
        { value: 400, name: 'B', itemStyle: { color: '#1d4ed8' } },
        { value: 300, name: 'C', itemStyle: { color: '#2563eb' } },
        { value: 200, name: 'D', itemStyle: { color: '#3b82f6' } },
        { value: 100, name: 'E', itemStyle: { color: '#60a5fa' } }
      ]
    }
  ]
};`
  },
  {
    id: "gap-pie",
    title: "Pie with Gaps",
    description: "Pie chart with gaps between slices.",
    previewData: {
      slices: [
        { value: 300, color: "#f43f5e" },
        { value: 200, color: "#ec4899" },
        { value: 100, color: "#d946ef" }
      ],
      innerRadius: 0.5
    },
    code: `option = {
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 5
      },
      data: [
        { value: 300, name: 'A', itemStyle: { color: '#f43f5e' } },
        { value: 200, name: 'B', itemStyle: { color: '#ec4899' } },
        { value: 100, name: 'C', itemStyle: { color: '#d946ef' } }
      ]
    }
  ]
};`
  },
  {
    id: "hidden-label",
    title: "Hidden Labels",
    description: "Clean pie chart without labels.",
    previewData: {
      slices: [
        { value: 400, color: "#84cc16" },
        { value: 300, color: "#22c55e" },
        { value: 200, color: "#10b981" }
      ]
    },
    code: `option = {
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'pie',
      radius: '60%',
      label: { show: false },
      data: [
        { value: 400, name: 'A', itemStyle: { color: '#84cc16' } },
        { value: 300, name: 'B', itemStyle: { color: '#22c55e' } },
        { value: 200, name: 'C', itemStyle: { color: '#10b981' } }
      ]
    }
  ]
};`
  },
  {
    id: "selected-slice",
    title: "Selected Slice",
    description: "Pie chart with one slice exploded.",
    previewData: {
      slices: [
        { value: 500, color: "#f97316" },
        { value: 300, color: "#fb923c" },
        { value: 200, color: "#fdba74" }
      ]
    },
    code: `option = {
  series: [
    {
      type: 'pie',
      radius: '55%',
      data: [
        { value: 500, name: 'Selected', selected: true, itemStyle: { color: '#f97316' } },
        { value: 300, name: 'B', itemStyle: { color: '#fb923c' } },
        { value: 200, name: 'C', itemStyle: { color: '#fdba74' } }
      ]
    }
  ]
};`
  },
  {
    id: "mini-pie",
    title: "Mini Pie",
    description: "Small pie chart for dashboards.",
    previewData: {
      slices: [
        { value: 60, color: "#6366f1" },
        { value: 40, color: "#e5e7eb" }
      ]
    },
    code: `option = {
  series: [
    {
      type: 'pie',
      radius: ['0%', '90%'],
      label: { show: false },
      data: [
        { value: 60, itemStyle: { color: '#6366f1' } },
        { value: 40, itemStyle: { color: '#e5e7eb' } }
      ]
    }
  ]
};`
  },
  {
    id: "gradient-pie",
    title: "Gradient Pie",
    description: "Pie slices with gradient fills.",
    previewData: {
      slices: [
        { value: 300, color: "#8b5cf6" },
        { value: 200, color: "#a78bfa" }
      ]
    },
    code: `option = {
  series: [
    {
      type: 'pie',
      radius: '60%',
      data: [
        { 
          value: 300, 
          name: 'Gradient 1',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [{ offset: 0, color: '#8b5cf6' }, { offset: 1, color: '#c4b5fd' }]
            }
          }
        },
        { value: 200, name: 'Normal', itemStyle: { color: '#a78bfa' } }
      ]
    }
  ]
};`
  },
  {
    id: "bordered-pie",
    title: "Bordered Pie",
    description: "Pie chart with thick borders.",
    previewData: {
      slices: [
        { value: 400, color: "#0ea5e9" },
        { value: 300, color: "#38bdf8" },
        { value: 200, color: "#7dd3fc" }
      ]
    },
    code: `option = {
  series: [
    {
      type: 'pie',
      radius: '60%',
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 5
      },
      data: [
        { value: 400, name: 'A', itemStyle: { color: '#0ea5e9' } },
        { value: 300, name: 'B', itemStyle: { color: '#38bdf8' } },
        { value: 200, name: 'C', itemStyle: { color: '#7dd3fc' } }
      ]
    }
  ]
};`
  },
  {
    id: "transparent-pie",
    title: "Transparent Pie",
    description: "Pie chart with semi-transparent slices.",
    previewData: {
      slices: [
        { value: 300, color: "rgba(239, 68, 68, 0.5)" },
        { value: 200, color: "rgba(59, 130, 246, 0.5)" },
        { value: 100, color: "rgba(16, 185, 129, 0.5)" }
      ]
    },
    code: `option = {
  series: [
    {
      type: 'pie',
      radius: '60%',
      data: [
        { value: 300, name: 'A', itemStyle: { color: 'rgba(239, 68, 68, 0.5)' } },
        { value: 200, name: 'B', itemStyle: { color: 'rgba(59, 130, 246, 0.5)' } },
        { value: 100, name: 'C', itemStyle: { color: 'rgba(16, 185, 129, 0.5)' } }
      ]
    }
  ]
};`
  },
  {
    id: "legend-bottom",
    title: "Legend at Bottom",
    description: "Pie chart with legend positioned at the bottom.",
    previewData: {
      slices: [
        { value: 335, color: "#5470c6" },
        { value: 310, color: "#91cc75" },
        { value: 234, color: "#fac858" }
      ]
    },
    code: `option = {
  legend: {
    bottom: '0%',
    left: 'center'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      data: [
        { value: 335, name: 'A', itemStyle: { color: '#5470c6' } },
        { value: 310, name: 'B', itemStyle: { color: '#91cc75' } },
        { value: 234, name: 'C', itemStyle: { color: '#fac858' } }
      ]
    }
  ]
};`
  },
  {
    id: "legend-right",
    title: "Legend at Right",
    description: "Pie chart with legend positioned at the right.",
    previewData: {
      slices: [
        { value: 335, color: "#5470c6" },
        { value: 310, color: "#91cc75" },
        { value: 234, color: "#fac858" }
      ]
    },
    code: `option = {
  legend: {
    orient: 'vertical',
    right: '10%',
    top: 'center'
  },
  series: [
    {
      type: 'pie',
      radius: '50%',
      center: ['40%', '50%'],
      data: [
        { value: 335, name: 'A', itemStyle: { color: '#5470c6' } },
        { value: 310, name: 'B', itemStyle: { color: '#91cc75' } },
        { value: 234, name: 'C', itemStyle: { color: '#fac858' } }
      ]
    }
  ]
};`
  },
  {
    id: "variable-radius",
    title: "Variable Radius",
    description: "Slices with manually different radii.",
    previewData: {
      slices: [
        { value: 400, color: "#f472b6" },
        { value: 300, color: "#fb7185" },
        { value: 200, color: "#e879f9" }
      ],
      roseType: true // Simulating variable radius look
    },
    code: `option = {
  series: [
    {
      type: 'pie',
      radius: [20, 100],
      roseType: 'radius',
      data: [
        { value: 400, name: 'A', itemStyle: { color: '#f472b6' } },
        { value: 300, name: 'B', itemStyle: { color: '#fb7185' } },
        { value: 200, name: 'C', itemStyle: { color: '#e879f9' } }
      ]
    }
  ]
};`
  },
  {
    id: "scrollable-legend",
    title: "Scrollable Legend",
    description: "Pie chart with many items and scrollable legend.",
    previewData: {
      slices: [
        { value: 10, color: "#1f2937" },
        { value: 10, color: "#374151" },
        { value: 10, color: "#4b5563" },
        { value: 10, color: "#6b7280" },
        { value: 10, color: "#9ca3af" }
      ]
    },
    code: `option = {
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 20,
    bottom: 20
  },
  series: [
    {
      type: 'pie',
      radius: '55%',
      center: ['40%', '50%'],
      data: Array.from({length: 20}).map((_, i) => ({
          value: Math.floor(Math.random() * 100),
          name: 'Item ' + i
      }))
    }
  ]
};`
  },
  {
    id: "rich-text",
    title: "Rich Text Labels",
    description: "Labels with rich text formatting.",
    previewData: {
      slices: [
        { value: 1048, color: "#3b82f6" },
        { value: 735, color: "#ef4444" }
      ]
    },
    code: `option = {
  series: [
    {
      type: 'pie',
      radius: '50%',
      label: {
        formatter: '{b}: {c} ({d}%)',
        rich: {
          b: { fontSize: 16, fontWeight: 'bold' },
          c: { color: '#999' }
        }
      },
      data: [
        { value: 1048, name: 'A', itemStyle: { color: '#3b82f6' } },
        { value: 735, name: 'B', itemStyle: { color: '#ef4444' } }
      ]
    }
  ]
};`
  }
];
