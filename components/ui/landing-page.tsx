// app/page.tsx
'use client';

import { BarChart, Buildings, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1C3D5A] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">FIT City Manager</h1>
            <button className="bg-[#8C1F28] px-4 py-2 rounded-lg hover:bg-opacity-90">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#1C3D5A] mb-4">
              Municipal Finance Intelligence
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Streamline your city's financial management with AI-powered insights
            </p>
            <button className="bg-[#1C3D5A] text-white px-8 py-3 rounded-lg hover:bg-opacity-90">
              Get Started
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <BarChart className="w-12 h-12 text-[#8C1F28] mb-4" />
              <h3 className="text-xl font-bold mb-2">Budget Analytics</h3>
              <p className="text-gray-600">
                Real-time insights into your city's financial performance
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Buildings className="w-12 h-12 text-[#8C1F28] mb-4" />
              <h3 className="text-xl font-bold mb-2">Department Management</h3>
              <p className="text-gray-600">
                Track and optimize spending across all departments
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Users className="w-12 h-12 text-[#8C1F28] mb-4" />
              <h3 className="text-xl font-bold mb-2">Resource Planning</h3>
              <p className="text-gray-600">
                Strategic planning tools for better resource allocation
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
