import z from "zod";

const baseSchema = z.object({
  type: z.enum(["family", "others"]),
  name: z.string().min(1, "Name is required"),
  age: z.string().min(1, "Age must be valid"),
  relation: z.string().min(1, "Relation is required"),
  location: z.string().min(1, "Location is required"),
});

const familySchema = baseSchema.extend({
  type: z.literal("family"),
  occupation: z.string().min(1, "Occupation is required"),
  address: z.string().min(1, "Address is required"),
});

const otherSchema = baseSchema.extend({
  type: z.literal("others"),
  category: z.string().min(1, "Category is required"),
  notes: z.string().optional(),
});

export const formSchema = z.discriminatedUnion("type", [
  familySchema,
  otherSchema,
]);

export type FormValues = z.infer<typeof formSchema>;
