import * as react_jsx_runtime from 'react/jsx-runtime';

type OptionLike = {
    xAxis?: {
        data?: (string | number)[];
        type?: string;
        boundaryGap?: boolean;
    };
    yAxis?: {
        type?: string;
        min?: number;
        max?: number;
    } | {
        type?: string;
    }[];
    series?: {
        name?: string;
        data?: (number | {
            value: number;
            name?: string;
            itemStyle?: {
                color?: string | {
                    type: string;
                    colorStops: {
                        offset: number;
                        color: string;
                    }[];
                };
            };
        })[];
        type?: string;
        smooth?: boolean;
        areaStyle?: {
            color?: string;
            opacity?: number;
        };
        lineStyle?: {
            color?: string | {
                type: string;
                colorStops: {
                    offset: number;
                    color: string;
                }[];
            };
            width?: number;
            type?: 'solid' | 'dashed' | 'dotted';
        };
        itemStyle?: {
            color?: string | {
                type: string;
                colorStops: {
                    offset: number;
                    color: string;
                }[];
            };
            borderRadius?: number;
            borderColor?: string;
            borderWidth?: number;
        };
        stack?: string;
        step?: string;
        symbol?: string;
        symbolSize?: number;
        radius?: string | string[];
        roseType?: string | boolean;
        center?: string[];
        startAngle?: number;
        label?: {
            show?: boolean;
            position?: string;
            color?: string;
        };
    }[];
    backgroundColor?: string;
    title?: {
        text: string;
        left?: string;
        top?: string;
        textStyle?: {
            color?: string;
        };
    };
    tooltip?: any;
    legend?: any;
};
interface LineChartProps {
    option: OptionLike | null;
    width?: number | string;
    height?: number | string;
    className?: string;
}
declare function LineChart({ option, width, height, className }: LineChartProps): react_jsx_runtime.JSX.Element;

interface BarChartProps {
    option: OptionLike | null;
    width?: number | string;
    height?: number | string;
    className?: string;
}
declare function BarChart({ option, width, height, className }: BarChartProps): react_jsx_runtime.JSX.Element;

interface PieChartProps {
    option: OptionLike | null;
    width?: number | string;
    height?: number | string;
    className?: string;
}
declare function PieChart({ option, width, height, className }: PieChartProps): react_jsx_runtime.JSX.Element;

declare function createChart(container: HTMLElement): {
    setOption: (option: OptionLike) => void;
    resize: () => void;
    dispose: () => void;
};

export { BarChart, type BarChartProps, LineChart, type LineChartProps, type OptionLike, PieChart, type PieChartProps, createChart };
