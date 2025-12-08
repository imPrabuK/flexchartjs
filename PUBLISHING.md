# Publishing FlexChartJS to NPM and CDN

This guide explains how to package and publish the FlexChartJS library so developers can install it via `npm` or use it via a CDN.

## 1. Project Structure

To publish the library separately from this documentation website, we recommend restructuring the project into a **monorepo** or creating a separate repository for the library code.

**Recommended Monorepo Structure:**
```
flexchartjs/
├── apps/
│   └── docs/           # This Next.js website
├── packages/
│   └── core/           # The actual library code to publish
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── package.json
└── turbo.json          # (Optional) If using Turborepo
```

## 2. Preparing the Package (`packages/core`)

Your library's `package.json` is critical for publishing. It tells NPM what files to include and how to load them.

**Example `package.json`:**
```json
{
  "name": "flexchartjs",
  "version": "1.0.0",
  "description": "A modern, responsive charting library for React",
  "main": "./dist/index.js",        # CommonJS entry
  "module": "./dist/index.mjs",     # ES Module entry
  "types": "./dist/index.d.ts",     # TypeScript definitions
  "files": [                        # Files to include in the npm package
    "dist",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

## 3. Building the Library

You cannot publish raw TypeScript files. You must compile them to JavaScript. We recommend using **tsup** (simplest) or **Rollup**.

**Install tsup:**
```bash
npm install -D tsup typescript
```

**Build Command:**
```bash
npm run build
```
This will generate a `dist/` folder containing `.js`, `.mjs`, and `.d.ts` files.

## 4. Publishing to NPM

1.  **Create an NPM Account**: Go to [npmjs.com](https://www.npmjs.com/) and sign up.
2.  **Login in Terminal**:
    Run the following command and authenticate via the browser. This uses the new secure authentication flow.
    ```bash
    npm login
    ```
3.  **Publish**:
    Navigate to your package directory (`packages/flexchartjs`) and run:
    ```bash
    npm publish --access public
    ```

## 5. CDN Availability

Once published to NPM, your package is **automatically** available on public CDNs. You don't need to do anything extra!

*   **UNPKG**: `https://unpkg.com/flexchartjs@1.0.0/dist/index.js`
*   **jsDelivr**: `https://cdn.jsdelivr.net/npm/flexchartjs@1.0.0/dist/index.js`

### Custom CDN (Optional)
If you want a custom domain like `cdn.flexchartjs.com`:
1.  Set up an AWS S3 bucket.
2.  Set up CloudFront (CDN) pointing to that bucket.
3.  In your CI/CD pipeline (GitHub Actions), add a step to upload the `dist/` folder to S3 after a successful build.

## 6. GitHub Actions (Automated Publishing)

We recommend using **Trusted Publishing** (OIDC) instead of managing long-lived tokens. This is more secure and avoids the need to rotate tokens.

1.  **Configure npm**:
    *   Go to your package settings on [npmjs.com](https://www.npmjs.com/).
    *   Click "Settings" -> "Publishing Access".
    *   Under "Trusted Publishing", connect your GitHub repository.
    *   Select the workflow filename (`publish.yml`) and the environment (optional).

2.  **Create Workflow**:
    Create `.github/workflows/publish.yml` with the following content. Note the `permissions: id-token: write` which is required for OIDC.

```yaml
name: Publish Package
on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write # Required for Trusted Publishing
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
        working-directory: ./packages/flexchartjs
      - run: npm publish --provenance --access public
        working-directory: ./packages/flexchartjs
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }} # Optional fallback
```
