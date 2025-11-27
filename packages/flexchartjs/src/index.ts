export * from './LineChart';
export * from './BarChart';
export * from './PieChart';

// Helper to create a chart instance (mock for now, or we can make it return an object)
// The user's example code used `createChart(container)`. 
// We can implement a simple version that renders into the container if we want to support vanilla JS,
// but for React we primarily export components.

import { OptionLike } from './LineChart';

export function createChart(container: HTMLElement) {
    // This is a placeholder for vanilla JS support.
    // In a real library, this would mount the React component or use a canvas renderer.
    console.log('createChart called on', container);
    return {
        setOption: (option: OptionLike) => {
            console.log('setOption called with', option);
        },
        resize: () => { },
        dispose: () => { }
    };
}
