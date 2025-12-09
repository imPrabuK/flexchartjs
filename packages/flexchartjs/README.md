# FlexChartJS

A modern, responsive, and lightweight charting library for React. Built with performance and simplicity in mind.

## Features

*   **Lightweight**: Zero heavy dependencies, built for speed.
*   **Responsive**: Charts automatically adjust to fit their container.
*   **Customizable**: Flexible styling options to match your design system.
*   **TypeScript**: Fully typed for excellent developer experience.
*   **React Native**: Designed to work seamlessly within React applications.

## Installation

Install the package via npm:

```bash
npm install flexchartjs
```

## Usage

FlexChartJS provides easy-to-use components like `BarChart`, `LineChart`, and `PieChart`.

### Bar Chart Example

```tsx
import { BarChart } from 'flexchartjs';

const MyChart = () => {
  const option = {
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: { color: '#3b82f6' },
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <BarChart option={option} />
    </div>
  );
};

export default MyChart;
```

### Line Chart Example

```tsx
import { LineChart } from 'flexchartjs';

const MyLineChart = () => {
  const option = {
    xAxis: {
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330],
        itemStyle: { color: '#ef4444' },
      },
    ],
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <LineChart option={option} />
    </div>
  );
};
```

## Publishing

This package uses **Trusted Publishing** via GitHub Actions.
To publish a new version:

1.  Update the version in `package.json`.
2.  Create a new GitHub Release.
3.  The GitHub Action will automatically build and publish the package to npm.

## License

MIT License

Copyright (c) 2025 Prabhu

Permission is hereby granted, free of charge, to any person obtaining a copy
  
