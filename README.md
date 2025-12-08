# FlexChartJS Project

This repository contains the source code for **FlexChartJS**, a modern React charting library, and its documentation website.

## Project Structure

*   `packages/flexchartjs`: The core library package.
*   `app/`: The documentation website (Next.js).

## Using the Library

To use FlexChartJS in your project, install it from npm:

```bash
npm install flexchartjs
```

### Example

```tsx
import { BarChart } from 'flexchartjs';

const MyComponent = () => (
  <BarChart
    option={{
      xAxis: { data: ['A', 'B', 'C'] },
      series: [{ data: [10, 20, 30] }]
    }}
  />
);
```

For more detailed documentation, visit the [documentation website](https://flexchartjs.vercel.app) (or run the local dev server).

## Development

To develop locally:

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server (starts the docs site):
    ```bash
    npm run dev
    ```

## Publishing

We use **Trusted Publishing** (OIDC) to publish to npm automatically.
When a new **Release** is created on GitHub, the `.github/workflows/publish.yml` workflow triggers, builds the package in `packages/flexchartjs`, and publishes it to npm.

### How to Release

1.  Update the version in `packages/flexchartjs/package.json`.
2.  Commit and push the change.
3.  Go to the GitHub repository and draft a new **Release**.
4.  Tag the release (e.g., `v1.0.1`).
5.  Publish the release. The Action will handle the rest.
