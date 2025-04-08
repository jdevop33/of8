// page.tsx - Main entry point for the Municipal Finance Intelligence Platform
import React from 'react';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building, TrendingUp, FileText, AlertTriangle } from 'lucide-react';

// Define metadata for SEO optimization
export const metadata: Metadata = {
  title: 'Municipal Finance Intelligence Platform | BC Local Government Guide',
  description: 'Comprehensive guide to municipal finance and infrastructure decisions for BC local governments. Learn about asset management, financial planning, and sustainable infrastructure.',
  keywords: 'municipal finance, local government, BC municipalities, asset management, infrastructure planning',
};

// Sample data for financial health indicators
const financialTrends = [
  { year: 2019, operating: -11, sustainability: 77, netAssets: 28 },
  { year: 2020, operating: -8, sustainability: 72, netAssets: 35 },
  { year: 2021, operating: -5, sustainability: 76, netAssets: 40 },
  { year: 2022, operating: -3, sustainability: 77, netAssets: 46 },
  { year: 2023, operating: 0, sustainability: 58, netAssets: 52 }
];

// Component for displaying key metric cards
const MetricCard = ({ 
  title, 
  value, 
  trend, 
  description, 
  icon: Icon 
}: { 
  title: string;
  value: string;
  trend: string;
  description: string;
  icon: React.ElementType;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
        <span className={`text-sm ${
          trend.includes('+') ? 'text-green-500' : 'text-red-500'
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </CardContent>
  </Card>
);

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Introducing the platform's value proposition */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Make Infrastructure Decisions That Last
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl">
            Transform complex municipal finance data into clear, actionable insights 
            for your community's future.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <MetricCard
            title="Operating Health"
            value="Sustainable"
            trend="+3% YoY"
            description="Operating surplus ratio at target level"
            icon={TrendingUp}
          />
          <MetricCard
            title="Asset Management"
            value="Action Needed"
            trend="-19% YoY"
            description="Asset sustainability below target"
            icon={Building}
          />
          <MetricCard
            title="Financial Position"
            value="Strong"
            trend="+6% YoY"
            description="Healthy net financial assets ratio"
            icon={FileText}
          />
        </div>

        {/* Learning Modules Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Start Learning</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Fundamentals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Understanding the core principles of municipal finance and key performance indicators.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Operating Surplus Ratio</li>
                  <li>• Asset Sustainability</li>
                  <li>• Net Financial Position</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Infrastructure Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn how to plan and manage infrastructure assets effectively.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Asset Lifecycle Management</li>
                  <li>• Maintenance Strategies</li>
                  <li>• Risk Assessment</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Decision Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Tools and frameworks for making informed infrastructure decisions.
                </p>
                <ul className="space-y-2 text-sm">
                  <li>• Cost-Benefit Analysis</li>
                  <li>• Funding Strategies</li>
                  <li>• Project Prioritization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trends and Analysis Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Financial Health Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={financialTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="operating" 
                      stroke="#8884d8" 
                      name="Operating Ratio"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sustainability" 
                      stroke="#82ca9d" 
                      name="Sustainability"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="netAssets" 
                      stroke="#ffc658" 
                      name="Net Assets"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Action Items and Alerts */}
        <section>
          <Alert className="bg-blue-50 border-blue-200">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <h3 className="font-semibold mb-2">Important Updates</h3>
              <ul className="space-y-2">
                <li>New infrastructure grant applications open March 2024</li>
                <li>Asset Management BC framework updates coming in Q2</li>
                <li>PSAB reporting requirements changing for 2024</li>
              </ul>
            </AlertDescription>
          </Alert>
        </section>
      </main>

      {/* Footer with quick links and resources */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>Asset Management Guide</li>
                <li>Financial Planning Tools</li>
                <li>Grant Programs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>BC Municipal Guidelines</li>
                <li>Case Studies</li>
                <li>Training Materials</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>Contact Us</li>
                <li>FAQ</li>
                <li>Technical Support</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
