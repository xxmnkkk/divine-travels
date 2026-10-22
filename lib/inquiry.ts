import { z } from "zod";
import { inquiryBudgets, inquiryDestinations, inquiryInterests } from "@/content/inquiry";

const isRealDate = (value: string) => {
  if (!value) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const dateField = z.string().max(10).refine(isRealDate, "Enter a valid date.");

export const inquirySchema = z
  .object({
    destination: z
      .string()
      .min(1, "Choose a destination, or select that you’re open to ideas.")
      .refine((value) => inquiryDestinations.some((option) => option.value === value), "Choose a destination from the list."),
    departureDate: dateField,
    returnDate: dateField,
    flexibility: z.enum(["flexible", "fixed", "deciding"]),
    travelers: z.number({ error: "Enter the number of travelers." }).int("Use a whole number of travelers.").min(1, "Include at least one traveler.").max(24, "For groups over 24, please contact us directly."),
    budget: z
      .string()
      .min(1, "Choose a budget range, or select that you’d like guidance.")
      .refine((value) => inquiryBudgets.some((option) => option.value === value), "Choose a budget from the list."),
    interests: z
      .array(z.string().refine((value) => inquiryInterests.some((interest) => interest === value), "Choose an interest from the list."))
      .max(8),
    name: z.string().trim().min(2, "Enter your name (at least 2 characters).").max(100, "Keep your name under 100 characters."),
    email: z.string().trim().email("Enter a valid email address.").max(254, "Keep your email under 254 characters."),
    phone: z.string().trim().max(40, "Keep your phone number under 40 characters."),
    notes: z.string().trim().max(2000, "Keep your notes under 2,000 characters."),
    _formCheck: z.string().max(200).optional(),
  })
  .superRefine((data, context) => {
    if (data.flexibility === "fixed") {
      if (!data.departureDate) context.addIssue({ code: "custom", path: ["departureDate"], message: "Add your departure date, or choose flexible dates." });
      if (!data.returnDate) context.addIssue({ code: "custom", path: ["returnDate"], message: "Add your return date, or choose flexible dates." });
    }
    if (data.departureDate && data.returnDate && data.returnDate < data.departureDate) {
      context.addIssue({ code: "custom", path: ["returnDate"], message: "Your return date must be on or after departure." });
    }
  });

export type InquiryData = z.infer<typeof inquirySchema>;

export const inquiryDefaultValues: InquiryData = {
  destination: "",
  departureDate: "",
  returnDate: "",
  flexibility: "flexible",
  travelers: 2,
  budget: "",
  interests: [],
  name: "",
  email: "",
  phone: "",
  notes: "",
  _formCheck: "",
};

export const inquiryStepFields: (keyof InquiryData)[][] = [
  ["destination", "flexibility", "departureDate", "returnDate"],
  ["travelers", "budget", "interests"],
  ["name", "email", "phone", "notes"],
];
