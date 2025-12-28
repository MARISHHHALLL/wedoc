import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { updateServiceCardSchema } from "@/app/actions/service-cards/service-card";

/**
 * GET /api/service-cards/[id]
 * Get a single service card by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const serviceCard = await prisma.serviceCard.findUnique({
      where: { id },
    });

    if (!serviceCard) {
      return NextResponse.json(
        { error: "Service card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(serviceCard);
  } catch (error) {
    console.error("Error fetching service card:", error);
    return NextResponse.json(
      { error: "Failed to fetch service card" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/service-cards/[id]
 * Update a service card
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Validate the request body using the schema
    const validatedData = updateServiceCardSchema.parse(body);

    const serviceCard = await prisma.serviceCard.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(serviceCard);
  } catch (error) {
    console.error("Error updating service card:", error);
    
    // Handle Prisma not found error
    if (error instanceof Error && error.message.includes("Record to update not found")) {
      return NextResponse.json(
        { error: "Service card not found" },
        { status: 404 }
      );
    }

    // Handle validation errors
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update service card" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/service-cards/[id]
 * Delete a service card
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.serviceCard.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Service card deleted successfully" });
  } catch (error) {
    console.error("Error deleting service card:", error);
    
    // Handle Prisma not found error
    if (error instanceof Error && error.message.includes("Record to delete does not exist")) {
      return NextResponse.json(
        { error: "Service card not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete service card" },
      { status: 500 }
    );
  }
}

