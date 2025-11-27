import * as react_jsx_runtime from 'react/jsx-runtime';

type OptionLike = {
    xAxis?: {
        data?: (string | number)[];
    };
    yAxis?: {
        type?: string;
    };
    series?: {
        data?: number[];
        type?: string;
    }[];
};
interface LineChartProps {
    option: OptionLike | null;
    width?: number | string;
    height?: number | string;
    className?: string;
}
declare function LineChart({ option, width, height, className }: LineChartProps): react_jsx_runtime.JSX.Element;

declare function createChart(container: HTMLElement): {
    setOption: (option: any) => void;
    resize: () => void;
    dispose: () => void;
};

export { LineChart, type LineChartProps, type OptionLike, createChart };
