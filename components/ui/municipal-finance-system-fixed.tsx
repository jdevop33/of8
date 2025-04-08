import React, { useState } from 'react';
import { BarChart, LineChart } from 'recharts';
import { AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

// Custom Tab Component
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
      active 
        ? 'bg-white text-[#1C3D5A] border-t border-x border-gray-200' 
        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
    }`}
  >
    {children}
  </button>
);

const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Department budget tracking with alerts
  const budgetStatus = [
    {
      department: "Public Works",
      budget: 1000000,
      spent: 750000,
      projected: 980000,
      alert: false
    },
    {
      department: "Public Safety",
      budget: 2000000,
      spent: 1800000,
      projected: 2100000,
      alert: true
    }
  ];

  // Compliance tracking
  const complianceItems = [
    {
      title: "Q3 Financial Report",
      dueDate: "2024-10-15",
      status: "pending",
      type: "quarterly"
    },
    {
      title: "Annual Audit",
      dueDate: "2024-12-31",
      status: "upcoming",
      type: "annual"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Financial Control Center
        </h1>
        <p className="text-gray-600">
          FY 2024 Q3 Overview
        </p>
      </header>

      {/* Critical Alerts Section */}
      <section className="mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Critical Alerts</h2>
          <div className="space-y-4">
            {budgetStatus
              .filter(dept => dept.alert)
              .map(dept => (
                <div key={dept.department} 
                     className="flex items-center p-4 bg-red-50 rounded-lg">
                  <AlertCircle className="text-red-500 mr-3" />
                  <div>
                    <p className="font-medium text-red-800">
                      {dept.department} projected to exceed budget
                    </p>
                    <p className="text-sm text-red-600">
                      Projected: ${dept.projected.toLocaleString()} 
                      (${(dept.projected - dept.budget).toLocaleString()} over budget)
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="flex gap-2 mb-4">
        <TabButton 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </TabButton>
        <TabButton 
          active={activeTab === 'departments'} 
          onClick={() => setActiveTab('departments')}
        >
          Departments
        </TabButton>
        <TabButton 
          active={activeTab === 'compliance'} 
          onClick={() => setActiveTab('compliance')}
        >
          Compliance
        </TabButton>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Department Budget Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Department Spending</h3>
              <div className="space-y-4">
                {budgetStatus.map(dept => (
                  <div key={dept.department} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{dept.department}</span>
                      <span className={dept.alert ? 'text-red-600' : 'text-green-600'}>
                        {Math.round((dept.spent / dept.budget) * 100)}% Used
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${
                          dept.alert ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{
                          width: `${(dept.spent / dept.budget) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Calendar */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Deadlines</h3>
              <div className="space-y-4">
                {complianceItems.map(item => (
                  <div 
                    key={item.title} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">Due: {item.dueDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      item.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Department Details</h3>
            {/* Department content */}
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Compliance Calendar</h3>
            {/* Compliance content */}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <button className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Generate Financial Report
        </button>
        <button className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Update Budget Projections
        </button>
        <button className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Review Grant Opportunities
        </button>
      </div>
    </div>
  );
};

export default FinanceDashboard;
