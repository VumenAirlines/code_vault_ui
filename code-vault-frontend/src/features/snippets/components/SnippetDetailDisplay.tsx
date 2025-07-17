import { type SnippetDetail } from "../types";
import { SnippetContentDisplay } from "./SnippetContentDisplay";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../..//components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
export const SnippetDetailDisplay = ({
  snippet,
  isOpen,
  onClose,
}: {
  snippet: SnippetDetail;
  isOpen: boolean;
  onClose: () => void;
}) => {
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
