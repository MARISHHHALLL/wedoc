import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createServiceCardSchema } from "@/app/actions/service-cards/service-card";

/**
 * GET /api/service-cards
 * Get all service cards (optionally filtered by isActive)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const isActive = searchParams.get("isActive");

    const where = isActive !== null ? { isActive: isActive === "true" } : {};


    const serviceCards = await prisma.serviceCard.findMany({
      where,
      orderBy: {
        order: "asc",
      },
    });

    return NextResponse.json(serviceCards);
  } catch (error) {
    console.error("Error fetching service cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch service cards" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/service-cards
 * Create a new service card
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body using the schema
    const validatedData = createServiceCardSchema.parse(body);

    const serviceCard = await prisma.serviceCard.create({
      data: validatedData,
    });

    return NextResponse.json(serviceCard, { status: 201 });
  } catch (error) {
    console.error("Error creating service card:", error);
    
    // Handle validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create service card" },
      { status: 500 }
    );
  }
}

