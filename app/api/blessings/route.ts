import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for blessing data
const createBlessingSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  message: z.string().min(1, 'Message is required').max(1000, 'Message is too long'),
});

// GET /api/blessings - Fetch all blessings
export async function GET() {
  try {
    const blessings = await prisma.blessing.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 50 // Limit to 50 most recent blessings
    });

    return NextResponse.json({
      success: true,
      data: blessings
    });
  } catch (error) {
    console.error('Error fetching blessings:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch blessings' 
      },
      { status: 500 }
    );
  }
}

// POST /api/blessings - Create a new blessing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the input data
    const validatedData = createBlessingSchema.parse(body);
    
    // Create the blessing in the database
    const blessing = await prisma.blessing.create({
      data: {
        name: validatedData.name,
        email: validatedData.email || null,
        message: validatedData.message,
      }
    });

    return NextResponse.json({
      success: true,
      data: blessing,
      message: 'Blessing created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating blessing:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues
        },
        { status: 400 }
      );
    }
    
    // Handle database errors
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create blessing'
      },
      { status: 500 }
    );
  }
}