import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Badge } from "../../../components/ui/badge";
import { Calendar } from "../../../components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { snippetSearchFormSchema } from "../schemas/snippetSearchFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../lib/utils";
import { languages, type SearchSnippetParams } from "../types";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export const AdvancedSearchCard = ({
  defaultValues,
  isHidden,
}: {
  defaultValues: SearchSnippetParams;
  isHidden: boolean;
}) => {
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");
  const form = useForm<z.infer<typeof snippetSearchFormSchema>>({
    resolver: zodResolver(snippetSearchFormSchema),
    mode: "onChange",
    defaultValues: {
      query: defaultValues.query || "",
      language: defaultValues.language || undefined,
      sortBy: defaultValues.sortBy || "title",
      sortOrder: defaultValues.sortOrder || "asc",
      page: defaultValues.page || 1,
      pageSize: defaultValues.pageSize || undefined,
      createdAfter: defaultValues.createdAfter || undefined,
      createdBefore: defaultValues.createdBefore || undefined,
      tags: defaultValues.tags || [],
    },
  });

  const onSubmit = (data: z.infer<typeof snippetSearchFormSchema>) => {
    const params = new URLSearchParams();
    console.log(data);
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, String(value));
        }
      }
    });

    navigate(`/search?${params.toString()}`);
  };

  return (
    <Card
      className={cn(
        "origin-top transition-transform duration-500 ease-in-out overflow-hidden ",
        isHidden
          ? "scale-y-0 absolute opacity-0"
          : "scale-y-100 relative opacity-100"
      )}
    >
      <CardHeader>
        <CardTitle>Advanced search</CardTitle>
        <CardDescription>Search by language, tags, etc.</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4 grid grid-cols-2 gap-6"
          >
            <FormField
              name="query"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Query</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React Fetch Hook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="tags"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div>
                      {/* Draft input */}
                      <Input
                        placeholder="Enter a tag"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && tagInput.trim()) {
                            e.preventDefault();
                            if (!field.value?.includes(tagInput.trim())) {
                              field.onChange([
                                ...(field.value || []),
                                tagInput.trim(),
                              ]);
                            }
                            setTagInput("");
                          }
                        }}
                      />

                      {/* Render added tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(field.value || []).map((tag: string) => (
                          <Badge
                            key={tag}
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((t: string) => t !== tag)
                              )
                            }
                            className="cursor-pointer"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="language"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? languages.find((l) => l.value === field.value)
                                ?.label
                            : "Select language"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px] p-0">
                        {languages.map((language) => (
                          <DropdownMenuItem
                            key={language.value}
                            className={cn(
                              language.value === field.value && "bg-accent"
                            )}
                            onSelect={() => field.onChange(language.value)}
                          >
                            {language.label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="createdAfter"
              control={form.control}
              render={({ field: afterField }) => (
                <FormField
                  name="createdBefore"
                  control={form.control}
                  render={({ field: beforeField }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Date Range</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[280px] justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {afterField.value && beforeField.value ? (
                                <>
                                  {format(new Date(afterField.value), "PPP")} –{" "}
                                  {format(new Date(beforeField.value), "PPP")}
                                </>
                              ) : (
                                <span>Pick a date range</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="range"
                              selected={{
                                from: afterField.value
                                  ? new Date(afterField.value)
                                  : undefined,
                                to: beforeField.value
                                  ? new Date(beforeField.value)
                                  : undefined,
                              }}
                              onSelect={(range) => {
                                afterField.onChange(
                                  range?.from?.toISOString() ?? undefined
                                );
                                beforeField.onChange(
                                  range?.to?.toISOString() ?? undefined
                                );
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            />

            <FormField
              name="sortBy"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort By</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between capitalize",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ?? "Select sort"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px] p-0">
                        {["createdAt", "updatedAt", "title"].map((option) => (
                          <DropdownMenuItem
                            key={option}
                            className={cn(
                              "capitalize",
                              option === field.value && "bg-accent "
                            )}
                            onSelect={() => field.onChange(option)}
                          >
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="sortOrder"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sort Order</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {(field.value ?? "Select order") === "asc"
                            ? "Ascending"
                            : "Descending"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[200px] p-0">
                        {["asc", "desc"].map((option) => (
                          <DropdownMenuItem
                            key={option}
                            className={cn(
                              option === field.value && "bg-accent"
                            )}
                            onSelect={() => field.onChange(option)}
                          >
                            {option === "asc" ? "Ascending" : "Descending"}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button type="submit">Search</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
