import * as z from "zod";
import { availableLanguages } from "../types";

export const snippetSearchFormSchema = z
  .object({
    query: z.string().optional(),
    language: z
      .enum(Object.values(availableLanguages) as [string, ...string[]])
      .optional(),
    sortBy: z.enum(["createdAt", "updatedAt", "title"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    createdAfter: z.string().optional(),
    createdBefore: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })
  .refine(
    (data) =>
      !data.createdAfter ||
      !data.createdBefore ||
      new Date(data.createdAfter) <= new Date(data.createdBefore),
    {
      message: "Created After must be earlier than Created Before",
      path: ["createdBefore"],
    }
  );
