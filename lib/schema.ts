import { z } from "zod";

const phoneRegex = /^[+()0-9\s-]{7,20}$/;

export const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(3, "A short subject helps").max(100),
  message: z.string().min(10, "Please share at least 10 characters").max(2000),

  // Optional enrichments
  phone: z
    .string()
    .optional()
    .refine((v) => !v || phoneRegex.test(v), "Phone format looks off"),
  linkedin: z
    .string()
    .optional()
    .refine((v) => !v || v.startsWith("http"), "Add full URL (https://...)"),

  service: z
    .enum(["web_dev", "full_stack", "api_backend", "security_review", "other"])
    .optional(),
  budget: z
    .enum(["<€500", "€500–€1k", "€1k–€3k", "€3k+"])
    .optional(),
  timeline: z
    .enum(["ASAP", "<1 month", "1–3 months", "3+ months"])
    .optional(),

  // Honeypot (hidden)
  company: z.string().optional(),
});

export type ContactForm = z.infer<typeof ContactSchema>;
