export interface Customer {
  id: string;
  name: string;
  age: number;
  tenure: number; // months
  usageScore: number; // 0-100
  supportCalls: number;
  paymentMethod: 'Credit Card' | 'Bank Transfer' | 'Electronic Check';
  contractType: 'Month-to-month' | 'One year' | 'Two year';
  monthlyCharge: number;
  totalCharges: number;
  churnProbability: number;
  churnStatus: 'Retained' | 'At Risk' | 'Churned';
}

export interface ChurnFactors {
  name: string;
  importance: number;
}

export interface DashboardStats {
  totalCustomers: number;
  churnRate: number;
  avgLTV: number;
  atRiskCount: number;
}
