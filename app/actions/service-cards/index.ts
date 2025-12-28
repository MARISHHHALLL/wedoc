"use server";

import prisma from "@/lib/prisma";
import { createServiceCardSchema, type CreateServiceCard } from "@/app/actions/service-cards/service-card";
import { revalidatePath } from "next/cache";

type ActionResult = { success: true; data: unknown } | { success: false; error: string; details?: unknown } | null;

async function createServiceCardAction(
  prevState: ActionResult,
  formData: CreateServiceCard
): Promise<ActionResult> {
  try {
    const validatedData = createServiceCardSchema.parse(formData);
    const serviceCard = await prisma.serviceCard.create({
      data: validatedData,
    });

    revalidatePath("/dashboard");

    return { success: true, data: serviceCard };
  } catch (error) {
    console.error("Error creating service card:", error);
    if (error && typeof error === "object" && "issues" in error) {
      return {
        success: false,
        error: "Validation failed",
        details: error,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create service card",
    };
  }
}

export { createServiceCardAction as createServiceCard };

/**
 * Fetch all active service cards ordered by their order field
 */
export async function getServiceCards() {
  try {
    const serviceCards = await prisma.serviceCard.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return serviceCards;
  } catch (error) {
    console.error("Error fetching service cards:", error);
    throw new Error("Failed to fetch service cards");
  }
}

