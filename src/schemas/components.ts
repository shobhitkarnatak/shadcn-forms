import z from "zod";

export const ComponentSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  age: z.string().min(1, { message: "age is required" }),
  role: z.string().min(1, { message: "Role is required" }),
  description: z.string().optional(),
  gender: z.string().optional(),
  notifications: z.boolean().optional(),
  isActive: z.boolean().optional(),
  dob: z.date({ message: "From date is required" }).max(new Date(2020, 1, 1), {
    message: "Date should be less than 01-01-2020",
  }),
  location: z.array(z.number()).min(1, { message: "Location is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  experienceDetails: z.array(
    z.object({
      companyName: z.string().min(1, "Company name required"),
      email: z.string().min(1, "Email is required"),
      idProof: z.array(z.number()).optional(),
    })
  ),
});

export type FormValues = z.infer<typeof ComponentSchema>;
