import { Customer } from './types';

const NAMES = ['Alice Smith', 'Bob Johnson', 'Charlie Brown', 'Diana Prince', 'Ethan Hunt', 'Fiona Gallagher', 'George Miller', 'Hannah Abbott', 'Ian Wright', 'Julia Roberts'];

export const generateSyntheticData = (count: number = 100): Customer[] => {
  return Array.from({ length: count }).map((_, i) => {
    const id = `CUST-${1000 + i}`;
    const tenure = Math.floor(Math.random() * 72); // 0 to 6 years
    const usageScore = Math.floor(Math.random() * 100);
    const supportCalls = Math.floor(Math.random() * 10);
    const contractType = ['Month-to-month', 'One year', 'Two year'][Math.floor(Math.random() * 3)] as any;
    const monthlyCharge = 20 + Math.random() * 100;
    
    // Simple heuristic for churn probability
    let prob = 0.1;
    if (contractType === 'Month-to-month') prob += 0.3;
    if (supportCalls > 5) prob += 0.2;
    if (usageScore < 30) prob += 0.2;
    if (tenure < 6) prob += 0.1;
    
    prob = Math.min(Math.max(prob, 0.05), 0.95);
    
    const churnStatus = prob > 0.7 ? 'Churned' : (prob > 0.4 ? 'At Risk' : 'Retained');

    return {
      id,
      name: NAMES[i % NAMES.length],
      age: 18 + Math.floor(Math.random() * 60),
      tenure,
      usageScore,
      supportCalls,
      paymentMethod: ['Credit Card', 'Bank Transfer', 'Electronic Check'][Math.floor(Math.random() * 3)] as any,
      contractType,
      monthlyCharge,
      totalCharges: monthlyCharge * tenure,
      churnProbability: prob,
      churnStatus
    };
  });
};

export const CHURN_FACTORS = [
  { name: 'Contract Type', importance: 0.35 },
  { name: 'Support Calls', importance: 0.25 },
  { name: 'Monthly Charges', importance: 0.15 },
  { name: 'Tenure', importance: 0.12 },
  { name: 'Usage Frequency', importance: 0.08 },
  { name: 'Other', importance: 0.05 },
];
