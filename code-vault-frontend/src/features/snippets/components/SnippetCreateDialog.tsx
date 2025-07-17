import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../..//components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { useCreateSnippet } from "../hooks/useCreateSnippet"; // We'll use the same hook
import { type CreateSnippet } from "../types";
import { snippetCreateFormSchema } from "../schemas/snippetCreateFormSchema";
import { Input } from "../../../components/ui/input";

export const SnippetCreateDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const snippetCreateMutation = useCreateSnippet();
  const form = useForm<z.infer<typeof snippetCreateFormSchema>>({
    resolver: zodResolver(snippetCreateFormSchema),
    defaultValues: { title: "", description: "", tags: [], language: "" },
  });
  const onSubmit = (data: Omit<CreateSnippet, "content">) => {
    snippetCreateMutation.mutate({
      ...data,
      content: "",
    });
  };
  if (snippetCreateMutation.isSuccess && isOpen) setIsOpen(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Create Snippet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Snippet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React Fetch Hook" {...field} />
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
                    <Input placeholder="e.g., typescript" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="A short description." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row justify-between pt-4">
              <Button type="submit" disabled={snippetCreateMutation.isPending}>
                {snippetCreateMutation.isPending
                  ? "Creating..."
                  : "Continue to Editor"}
              </Button>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
