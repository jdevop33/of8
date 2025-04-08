// lib/DataProvider.tsx
import React, { createContext, useContext, useCallback } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from '@tanstack/react-query';

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Types
interface Department {
  id: string;
  name: string;
  budget: number;
  spent: number;
  projected: number;
}

interface ComplianceItem {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  type: string;
}

interface DataContextType {
  departments: {
    data: Department[];
    isLoading: boolean;
    error: unknown;
    refetch: () => Promise<void>;
  };
  compliance: {
    data: ComplianceItem[];
    isLoading: boolean;
    error: unknown;
  };
  budget: {
    updateBudget: (deptId: string, amount: number) => Promise<void>;
    generateReport: () => Promise<void>;
  };
}

// Create Context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Custom hook for using the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Data Provider Component
export function DataProvider({ children }: { children: React.ReactNode }) {
  // Fetch departments data
  const {
    data: departmentsData = [],
    isLoading: isDepartmentsLoading,
    error: departmentsError,
    refetch: refetchDepartments,
  } = useQuery({
    queryKey: ['departments'],
    queryFn: async () => {
      const response = await fetch('/api/departments');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  // Fetch compliance data
  const {
    data: complianceData = [],
    isLoading: isComplianceLoading,
    error: complianceError,
  } = useQuery({
    queryKey: ['compliance'],
    queryFn: async () => {
      const response = await fetch('/api/compliance');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  // Budget update mutation
  const { mutateAsync: updateBudget } = useMutation({
    mutationFn: async ({ departmentId, amount }: { departmentId: string; amount: number }) => {
      const response = await fetch(`/api/departments/${departmentId}/budget`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      if (!response.ok) {
        throw new Error('Failed to update budget');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['departments']);
    },
  });

  // Report generation mutation
  const { mutateAsync: generateReport } = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      return response.json();
    },
  });

  // Context value
  const value = {
    departments: {
      data: departmentsData,
      isLoading: isDepartmentsLoading,
      error: departmentsError,
      refetch: refetchDepartments,
    },
    compliance: {
      data: complianceData,
      isLoading: isComplianceLoading,
      error: complianceError,
    },
    budget: {
      updateBudget: async (departmentId: string, amount: number) => {
        await updateBudget({ departmentId, amount });
      },
      generateReport: async () => {
        await generateReport();
      },
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <DataContext.Provider value={value}>{children}</DataContext.Provider>
    </QueryClientProvider>
  );
}

// Example usage in a component:
/*
function DepartmentList() {
  const { departments } = useData();

  if (departments.isLoading) {
    return <div>Loading...</div>;
  }

  if (departments.error) {
    return <div>Error loading departments</div>;
  }

  return (
    <div>
      {departments.data.map(dept => (
        <div key={dept.id}>
          <h3>{dept.name}</h3>
          <p>Budget: ${dept.budget}</p>
          <p>Spent: ${dept.spent}</p>
        </div>
      ))}
    </div>
  );
}
*/
