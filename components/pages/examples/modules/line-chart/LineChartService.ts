import { ChartExample, lineChartExamples } from "./lineChartData";

export class LineChartService {
    static getExamples(): ChartExample[] {
        return lineChartExamples;
    }

    static getExampleById(id: string): ChartExample | undefined {
        return lineChartExamples.find(ex => ex.id === id);
    }
}
