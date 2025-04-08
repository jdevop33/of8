// app/api/departments/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      include: {
        budgetItems: true,
      },
    });

    return NextResponse.json(departments);
  } catch (error) {
    console.error('Failed to fetch departments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}

// app/api/departments/[id]/budget/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { amount } = await request.json();

    const updatedDepartment = await prisma.department.update({
      where: { id: params.id },
      data: { budget: amount },
    });

    return NextResponse.json(updatedDepartment);
  } catch (error) {
    console.error('Failed to update budget:', error);
    return NextResponse.json(
      { error: 'Failed to update budget' },
      { status: 500 }
    );
  }
}
