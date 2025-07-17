import { SnippetContentDisplay } from "./SnippetContentDisplay";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../..//components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import { useGetSnippetById } from "../hooks/useGetSnippetById";
export const SnippetDetailDisplay = ({
  id,
  isOpen,
  onClose,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { data: snippet, isLoading, isError } = useGetSnippetById(id);
  if (isLoading) return <div>Loading snippet...</div>;
  if (isError) return <div>Error: Could not load the snippet.</div>;
  if (!snippet) return <div>Snippet not found.</div>;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-3xl w-fit">
        <DialogHeader>
          <DialogTitle>{snippet.title}</DialogTitle>
          <DialogDescription>{snippet.description}</DialogDescription>
        </DialogHeader>
        <SnippetContentDisplay snippet={snippet} />
        <DialogFooter className="flex !justify-start space-x-2">
          {snippet.tags.map((tag, index) => {
            return (
              <Badge variant={"secondary"} key={index}>
                {tag}
              </Badge>
            );
          })}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
