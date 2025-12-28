import { z } from "zod";

/**
 * Zod schema for ServiceCard validation
 * 
 * This schema is used in:
 * - Admin panel forms (with react-hook-form)
 * - API routes (app/api/service-cards/route.ts and app/api/service-cards/[id]/route.ts)
 * - TypeScript type inference
 * 
 * Always import and use these schemas when working with service cards to ensure data validation.
 */
export const serviceCardSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  price: z.number().min(0, "Price must be non-negative"),
  description: z.string().min(1, "Description is required"),
  logo: z.string().max(500, "Logo file path/URL is too long").optional(), // File path/URL to uploaded logo image
  buttonText: z.string().max(100, "Button text is too long").optional(),
  buttonLink: z
    .string()
    .max(500, "Button link is too long")
    .refine(
      (val) => !val || val === "" || z.string().url().safeParse(val).success,
      "Button link must be a valid URL"
    )
    .optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
});

/**
 * Schema for creating a new ServiceCard (without id, timestamps)
 */
export const createServiceCardSchema = serviceCardSchema;

/**
 * Schema for updating a ServiceCard (all fields optional except id)
 */
export const updateServiceCardSchema = serviceCardSchema.partial();

/**
 * Schema with id for full ServiceCard (used after database operations)
 */
export const serviceCardWithIdSchema = serviceCardSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/**
 * TypeScript types inferred from Zod schemas
 */
export type ServiceCard = z.infer<typeof serviceCardSchema>;
export type CreateServiceCard = z.infer<typeof createServiceCardSchema>;
export type UpdateServiceCard = z.infer<typeof updateServiceCardSchema>;
export type ServiceCardWithId = z.infer<typeof serviceCardWithIdSchema>;

