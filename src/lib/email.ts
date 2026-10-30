import { z } from "zod";

export const quoteSchema = z.object({
  service: z
    .union([
      z.string().min(1, "Service selection is required"),
      z.array(z.string()).min(1, "At least one service is required"),
    ])
    .transform((val) => (Array.isArray(val) ? val.join(", ") : val)),
  moveSize: z.string().optional().default(""),
  pickup: z.string().min(1, "Pick-up location is required"),
  dropoff: z.string().optional().default(""),
  preferredDate: z.string().optional().default(""),
  name: z.string().optional().default(""),
  phone: z.string().min(5, "Contact phone is required"),
  email: z.string().email("Valid email is required"),
  isWinsQuote: z.boolean().optional().default(false),
  isWinzQuote: z.boolean().optional().default(false),
  notes: z.string().optional().default(""),
  preferredContact: z.enum(["phone", "email", "whatsapp"]).optional().default("phone"),
});

export type QuoteEnquiryPayload = z.input<typeof quoteSchema>;

export async function submitQuoteEnquiry({ data }: { data: QuoteEnquiryPayload }): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = quoteSchema.parse(data);
    // Simulate brief network delay for authentic UI feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    console.info("Quote request received:", parsed);
    return { success: true };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0]?.message || "Invalid submission details." };
    }
    return { success: false, error: "Failed to submit quote enquiry. Please try again or call our customer team." };
  }
}
