import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useGetSnippetById } from "../features/snippets/hooks/useGetSnippetById";
import {
  type SnippetDetail,
  type UpdateSnippet,
} from "../features/snippets/types";
import { SnippetEditor } from "../features/snippets/components/SnippetEditor";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Circle } from "lucide-react";
import { useUpdateSnippet } from "../features/snippets/hooks/useUpdateSnippet";
import { useState, type ChangeEventHandler } from "react";
import { Pen, Plus } from "lucide-react";
import { Textarea } from "../components/ui/textarea";
import clsx from "clsx";
import { AddTagsDialog } from "../features/snippets/components/AddTagsDialog";
const SnippetDetailPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [tagAdd, setTagAdd] = useState(false);
  const initialData = useLoaderData() as SnippetDetail;
  const { id } = useParams<{ id: string }>();
  const { data: snippet, isLoading, isError } = useGetSnippetById(id);
  const navigate = useNavigate();
  const updateSnippetMutation = useUpdateSnippet();
  if (isLoading) return <div>Loading snippet...</div>;
  if (isError) return <div>Error: Could not load the snippet.</div>;
  if (!snippet) return <div>Snippet not found.</div>;
  //todo:toast
  //todo: add logos

  const [updatedSnippet, setUpdatedSnippet] = useState<UpdateSnippet>({
    title: snippet.title,
    content: snippet.content,
    language: snippet.language,
    description: snippet.description ?? "",
    tags: snippet.tags,
  });
  const changedDetails = (newSnippet: UpdateSnippet): UpdateSnippet => {
    return {
      title: newSnippet.title == snippet.title ? null : newSnippet.title,
      content:
        newSnippet.content == snippet.content ? null : newSnippet.content,
      language:
        newSnippet.language == snippet.language ? null : newSnippet.language,
      description:
        newSnippet.description == snippet.description
          ? null
          : newSnippet.description,
      tags:
        JSON.stringify(newSnippet.tags) !== JSON.stringify(snippet.tags)
          ? newSnippet.tags
          : null,
    } as UpdateSnippet;
  };
  const handleSaveClick = () => {
    if (!id) return;

    updateSnippetMutation.mutate(
      { id, data: changedDetails(updatedSnippet) },
      {
        onSuccess: () => {
          setIsEdit(false);
        },
        onError: (error: Error) => {
          console.error("Failed to update snippet:", error);
        },
      }
    );
  };
  const handleTitleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setUpdatedSnippet((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setUpdatedSnippet((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleCodeChange = (newCode: string) => {
    setUpdatedSnippet((prev) => ({
      ...prev,
      content: newCode,
    }));
  };
  const handleTagSave = (newTags: string[]) => {
    setUpdatedSnippet((prev) => ({
      ...prev,
      tags: newTags,
    }));
    setTagAdd(false);
  };
  const handleTagAddOpen = () => {
    setTagAdd(true);
  };
  const toggleEdit = () => setIsEdit(!isEdit);
  return (
    <div className="w-full flex h-[calc(100vh-80px)] gap-4 px-4 py-6">
      <AddTagsDialog
        isOpen={tagAdd}
        onClose={() => setTagAdd(false)}
        prevTags={updatedSnippet.tags}
        onSave={handleTagSave}
      />
      <div className="flex flex-col justify-between flex-none w-[300px] max-w-[300px] border-r-2 border-accent px-4 py-4 overflow-hidden">
        <div
          className={clsx(
            "mb-4 flex flex-row justify-center gap-4 px-2 relative rounded-lg",
            isEdit && " border-2 "
          )}
        >
          <Textarea
            className="text-pretty resize-none text-center font-bold !text-lg border-0 focus-visible:!border-0 focus-visible:!ring-0  mr-6 "
            value={updatedSnippet.title}
            readOnly={!isEdit}
            onChange={handleTitleChange}
            maxLength={50}
          />
          <Pen
            className="mt-1 absolute right-3 top-0.5"
            fill={isEdit ? "white" : "transparent"}
            onClick={toggleEdit}
          />
        </div>

        <div className="flex justify-center mb-4 text-primary">
          <Circle size={200} />
        </div>

        <div className="mb-8 h-full max-h-40">
          <p className="text-md font-semibold">Description:</p>
          <div
            className={clsx("mb-4 rounded-lg h-full", isEdit && " border-2 ")}
          >
            <Textarea
              className="text-pretty resize-none text-start border-0 focus-visible:!border-0 focus-visible:!ring-0 mr-6 h-full"
              value={updatedSnippet.description}
              readOnly={!isEdit}
              onChange={handleDescriptionChange}
              maxLength={120}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-row justify-between pr-3">
            <p className="text-md font-semibold mb-1">Tags:</p>
            <Plus className="" onClick={handleTagAddOpen} />
          </div>
          <div className="flex flex-wrap gap-2 max-w-full overflow-hidden">
            {updatedSnippet.tags?.map((tag, index) => (
              <Badge variant="secondary" key={index}>
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <p className=" text-xs mb-2 text-muted-foreground">{`ID: {${snippet.id}}`}</p>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            className="w-1/2 cursor-pointer"
            onClick={handleSaveClick}
            disabled={updateSnippetMutation.isPending}
          >
            {updateSnippetMutation.isPending ? "Saving..." : "Save"}
          </Button>
          <Button
            onClick={() => navigate("/snippets")}
            className="w-1/2 cursor-pointer"
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="flex-1 h-full min-w-sm">
        <SnippetEditor
          className="w-full h-full"
          code={updatedSnippet.content ?? ""}
          language={updatedSnippet.language ?? "text"}
          change={handleCodeChange}
        />
      </div>
    </div>
  );
};

export default SnippetDetailPage;
