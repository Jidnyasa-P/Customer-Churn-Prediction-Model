import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  Users, UserMinus, DollarSign, Activity, AlertTriangle, 
  CheckCircle, FileText, Code, Github, Terminal,
  ChevronRight, Brain, Briefcase, TrendingUp, Info,
  Lightbulb, Database, Search, Cpu, ListChecks
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateSyntheticData, CHURN_FACTORS } from './data';
import { Customer } from './types';
import { cn } from './lib/utils';

// --- Components ---

const StatCard = ({ title, value, icon: Icon, trend, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start justify-between"
  >
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-3xl font-bold mt-2 text-slate-900">{value}</h3>
      {trend && (
        <div className={cn("flex items-center mt-2 text-xs font-semibold", trend.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>
          {trend} from last month
        </div>
      )}
    </div>
    <div className={cn("p-3 rounded-xl", color)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </motion.div>
);

const TabButton = ({ active, onClick, icon: Icon, label }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200",
      active 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
        : "text-slate-600 hover:bg-slate-100"
    )}
  >
    <Icon size={18} />
    {label}
  </button>
);

// --- Sections ---

const Overview = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Brain size={14} /> Machine Learning for Business
        </div>
        <h2 className="text-4xl font-bold text-slate-900 leading-tight">
          What is Customer Churn?
        </h2>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-900">Simple Explanation:</strong> Churn is when customers stop doing business with a company. It's like a leaky bucket—even if you're pouring new water (customers) in, the bucket won't stay full if there's a hole in the bottom.
          </p>
          <p>
            <strong className="text-slate-900">Technical Explanation:</strong> Churn analysis uses historical customer data to identify patterns that lead to attrition. By training a binary classification model (Churn vs. Stay), we can predict which active customers are likely to leave in the future.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-100 bg-white">
            <TrendingUp className="text-emerald-500 mb-2" />
            <h4 className="font-bold text-slate-900">Retention</h4>
            <p className="text-sm text-slate-500">Keeping existing customers is 5x cheaper than getting new ones.</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-100 bg-white">
            <DollarSign className="text-indigo-500 mb-2" />
            <h4 className="font-bold text-slate-900">Revenue</h4>
            <p className="text-sm text-slate-500">Reducing churn by 5% can increase profits by up to 25%.</p>
          </div>
        </div>
      </div>
      <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-6">
          <h3 className="text-2xl font-bold">The ML Workflow</h3>
          <div className="space-y-4">
            {[
              { step: 'Data Collection', desc: 'Sourcing customer demographics, plans, and behavior.' },
              { step: 'Preprocessing', desc: 'Handling missing values, scaling, and encoding data.' },
              { step: 'Model Training', desc: 'Using Random Forest or XGBoost to learn patterns.' },
              { step: 'Insights', desc: 'Predicting risk and triggering retention campaigns.' }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 font-bold">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-bold">{item.step}</h4>
                  <p className="text-indigo-100 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [data] = useState(() => generateSyntheticData(200));
  const stats = {
    total: data.length,
    churnRate: (data.filter(c => c.churnStatus === 'Churned').length / data.length * 100).toFixed(1),
    atRisk: data.filter(c => c.churnStatus === 'At Risk').length,
    revenue: data.reduce((acc, c) => acc + c.totalCharges, 0)
  };

  const chartData = [
    { name: 'Retained', value: data.filter(c => c.churnStatus === 'Retained').length, color: '#10b981' },
    { name: 'At Risk', value: data.filter(c => c.churnStatus === 'At Risk').length, color: '#f59e0b' },
    { name: 'Churned', value: data.filter(c => c.churnStatus === 'Churned').length, color: '#ef4444' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Customers" value={stats.total} icon={Users} color="bg-indigo-600" />
        <StatCard title="Churn Rate" value={`${stats.churnRate}%`} icon={UserMinus} trend="-2.4%" color="bg-rose-500" />
        <StatCard title="At Risk" value={stats.atRisk} icon={AlertTriangle} color="bg-amber-500" />
        <StatCard title="Est. Lifetime Value" value={`$${(stats.revenue / 1000).toFixed(1)}k`} icon={DollarSign} color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Key Churn Drivers</h3>
            <div className="text-xs font-mono text-slate-400 bg-slate-50 px-2 py-1 rounded">Model: Random Forest (v1.0)</div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHURN_FACTORS} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="importance" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Customer Health</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="block text-2xl font-bold text-slate-900">{stats.total}</span>
                <span className="text-xs text-slate-500 uppercase">Users</span>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {chartData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900">Churn Analysis Simulation</h3>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View Data Lab &rarr;</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer ID</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tenure</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.slice(0, 6).map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <span className="block font-bold text-slate-900">{customer.name}</span>
                    <span className="text-xs text-slate-400">{customer.id}</span>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-600">{customer.tenure} months</td>
                  <td className="px-8 py-5 text-sm text-slate-600">{customer.contractType}</td>
                  <td className="px-8 py-5">
                    <div className="w-full max-w-[100px] bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          customer.churnProbability > 0.7 ? "bg-rose-500" : (customer.churnProbability > 0.4 ? "bg-amber-500" : "bg-emerald-500")
                        )}
                        style={{ width: `${customer.churnProbability * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-bold",
                      customer.churnStatus === 'Churned' ? "bg-rose-100 text-rose-700" : (customer.churnStatus === 'At Risk' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700")
                    )}>
                      {customer.churnStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

const Implementation = () => {
  const steps = [
    { title: 'Environment Setup', icon: Terminal, content: 'Install pandas, scikit-learn, and matplotlib. Create a virtual environment to manage dependencies locally.' },
    { title: 'Data Ingestion', icon: Database, content: 'Loading the customer dataset (CSV/SQL). In school projects, we often use the Kaggle Telco Dataset.' },
    { title: 'EDA', icon: Search, content: 'Exploratory Data Analysis: Checking correlations, distribution of tenure, and class imbalance (Upsampling/SMOTE).' },
    { title: 'Feature Engineering', icon: ListChecks, content: 'Encoding categorical variables (One-Hot), scaling numerical values, and creating new interaction features.' },
    { title: 'Model Selection', icon: Cpu, size: 'large' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="flex items-center gap-4 border-l-4 border-indigo-600 pl-6 py-2">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Python Implementation Guide</h2>
            <p className="text-slate-500 mt-1">Full source code structure for your GitHub repository.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-slate-900 rounded-2xl p-8 overflow-hidden relative group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-4 text-xs font-mono text-slate-400">main.py</span>
              </div>
              <Code size={20} className="text-slate-500" />
            </div>
            <pre className="font-mono text-sm text-indigo-300 leading-relaxed overflow-x-auto whitespace-pre">
{`# 1. Imports
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

# 2. Load Data
df = pd.read_csv('data/telco_churn.csv')

# 3. Preprocessing
df.dropna(inplace=True)
df['Churn'] = df['Churn'].apply(lambda x: 1 if x == 'Yes' else 0)

# 4. Feature Selection
X = df[['tenure', 'MonthlyCharges', 'TotalCharges']]
y = df['Churn']

# 5. Train Model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# 6. Evaluate
predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions)}")`}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Github className="text-slate-900" />
                  <h4 className="font-bold">GitHub Structure</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 font-mono">
                  <li>├── data/ # CSV files</li>
                  <li>├── notebooks/ # EDA Experiments</li>
                  <li>├── src/ # Model Source</li>
                  <li>├── README.md # Documentation</li>
                  <li>└── requirements.txt</li>
                </ul>
             </div>
             <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="text-indigo-600" />
                  <h4 className="font-bold text-indigo-900">Career Proof</h4>
                </div>
                <p className="text-sm text-indigo-700 leading-relaxed">
                  Upload this code to GitHub, include the README generated here, and link it in your resume under <strong>"Predictive Analytics & ML Projects"</strong>.
                </p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'dashboard' | 'implementation'>('overview');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Activity className="text-white" size={24} />
            </div>
            <div>
              <span className="block font-black text-xl tracking-tight text-slate-900">Churn<span className="text-indigo-600">Flow</span></span>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-[-2px]">ML Solutions</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <TabButton 
              active={activeTab === 'overview'} 
              onClick={() => setActiveTab('overview')} 
              icon={BookOpen} 
              label="The Concept" 
            />
             <TabButton 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
              icon={TrendingUp} 
              label="Live Simulation" 
            />
            <TabButton 
              active={activeTab === 'implementation'} 
              onClick={() => setActiveTab('implementation')} 
              icon={Code} 
              label="Implementation" 
            />
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
              title="GitHub Repo Template"
            >
              <Github size={20} />
            </a>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all">
              Tutorial Book
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pt-28 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'implementation' && <Implementation />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center gap-2">
              <Activity className="text-indigo-600" size={20} />
              <span className="font-black text-lg text-slate-900">ChurnFlow</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              An educational project designed to bridge the gap between Data Science theory and industrial business impacts. Build, predict, and retain.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h5 className="font-bold text-slate-900 text-sm mb-4">Resources</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-indigo-600 cursor-pointer">Telco Dataset</li>
                <li className="hover:text-indigo-600 cursor-pointer">ML Basics</li>
                <li className="hover:text-indigo-600 cursor-pointer">Python Patterns</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 text-sm mb-4">Links</h5>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-indigo-600 cursor-pointer">GitHub</li>
                <li className="hover:text-indigo-600 cursor-pointer">Portfolio Tips</li>
                <li className="hover:text-indigo-600 cursor-pointer">LinkedIn Prep</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
            Built for Educational Purposes • 2026 AI Studio
          </p>
        </div>
      </footer>
    </div>
  );
}

const BookOpen = ({ size }: { size: number }) => <FileText size={size} />;
