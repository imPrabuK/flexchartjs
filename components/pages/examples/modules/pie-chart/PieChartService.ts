import { ChartExample, pieChartExamples } from "./pieChartData";

export class PieChartService {
    static getExamples(): ChartExample[] {
        return pieChartExamples;
    }

    static getExampleById(id: string): ChartExample | undefined {
        return pieChartExamples.find(ex => ex.id === id);
    }
}
