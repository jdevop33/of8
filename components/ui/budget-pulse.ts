// src/types/budget.ts
export interface Department {
  id: string;
  name: string;
  budgetCode: string;
  fiscalYear: number;
  allocations: {
    personnel: number;
    operations: number;
    capital: number;
  };
}

// src/services/budget-monitor.ts
export class BudgetMonitorService {
  async trackSpending(departmentId: string): Promise<SpendingReport> {
    const department = await this.getDepartment(departmentId);
    const transactions = await this.getTransactions(departmentId);
    
    return {
      currentSpending: this.calculateSpending(transactions),
      projectedSpending: this.forecastSpending(transactions),
      alerts: this.generateAlerts(transactions, department)
    };
  }

  private async forecastSpending(transactions: Transaction[]): Promise<Forecast> {
    // AI-powered spending forecasting
    const model = await this.loadForecastModel();
    return model.predict(transactions);
  }

  private generateAlerts(transactions: Transaction[], department: Department): Alert[] {
    const alerts = [];
    
    // Check spending pace
    if (this.isOverspendingPace(transactions, department)) {
      alerts.push({
        type: 'OVERSPENDING_RISK',
        severity: 'HIGH',
        message: `Department ${department.name} is on pace to exceed budget by ${this.calculateOverage()}`
      });
    }

    return alerts;
  }
}

// src/api/routes/dashboard.ts
router.get('/dashboard/overview', async (req: Request, res: Response) => {
  const departments = await Department.findAll();
  const overview = await Promise.all(
    departments.map(async (dept) => {
      const monitor = new BudgetMonitorService();
      const spending = await monitor.trackSpending(dept.id);
      return {
        department: dept,
        spending,
        alerts: spending.alerts
      };
    })
  );
  
  res.json({
    timestamp: new Date(),
    overview,
    summaryMetrics: calculateSummaryMetrics(overview)
  });
});
