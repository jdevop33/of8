// src/services/finance.ts
import { prisma } from '../lib/prisma';
import { analyzeSpending, predictOverruns } from '../lib/ai';

export class FinanceService {
  async getDepartmentStatus(fiscalYear: number, quarter: number) {
    // Get actual spending data
    const spending = await prisma.departmentSpending.findMany({
      where: {
        fiscalYear,
        quarter
      },
      include: {
        department: true,
        lineItems: true
      }
    });

    // Analyze spending patterns and predict end-of-year totals
    const analysis = await Promise.all(
      spending.map(async (dept) => {
        const prediction = await analyzeSpending({
          historical: dept.lineItems,
          current: dept.currentSpending,
          seasonality: dept.department.seasonalFactors
        });

        return {
          departmentId: dept.departmentId,
          name: dept.department.name,
          budget: dept.budgetedAmount,
          spent: dept.currentSpending,
          projected: prediction.endOfYear,
          alert: prediction.endOfYear > dept.budgetedAmount,
          risk: prediction.riskLevel,
          factors: prediction.contributingFactors
        };
      })
    );

    return analysis;
  }

  async getComplianceCalendar() {
    const today = new Date();
    const threeMonthsOut = new Date();
    threeMonthsOut.setMonth(today.getMonth() + 3);

    return prisma.complianceItem.findMany({
      where: {
        dueDate: {
          gte: today,
          lte: threeMonthsOut
        }
      },
      orderBy: {
        dueDate: 'asc'
      }
    });
  }

  async generateFinancialReport(type: 'monthly' | 'quarterly' | 'annual') {
    // Get required data
    const [
      revenues,
      expenses,
      assets,
      liabilities
    ] = await Promise.all([
      this.getRevenues(),
      this.getExpenses(),
      this.getAssets(),
      this.getLiabilities()
    ]);

    // Generate report with AI analysis
    const report = await generateReport({
      type,
      data: {
        revenues,
        expenses,
        assets,
        liabilities
      },
      previousReports: await this.getPreviousReports(type)
    });

    // Save and return
    await prisma.financialReport.create({
      data: {
        type,
        content: report,
        generatedAt: new Date()
      }
    });

    return report;
  }

  async predictBudgetImpact(scenario: BudgetScenario) {
    // Run AI prediction model
    const impact = await predictImpact({
      scenario,
      historicalData: await this.getHistoricalData(),
      economicIndicators: await this.getEconomicIndicators()
    });

    return {
      revenueImpact: impact.revenue,
      expenseImpact: impact.expenses,
      netImpact: impact.net,
      risks: impact.risks,
      opportunities: impact.opportunities,
      recommendations: impact.recommendations
    };
  }
}
