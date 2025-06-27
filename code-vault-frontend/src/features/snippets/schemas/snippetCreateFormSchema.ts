import * as z from "zod";

export const snippetCreateFormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  language: z.string().min(1, "Language is required."),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});
