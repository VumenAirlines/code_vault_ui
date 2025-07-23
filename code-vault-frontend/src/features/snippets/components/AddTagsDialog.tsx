import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";
const tagObject = {
  javascript: 5,
  typescript: 5,
  array: 5,
  sorting: 5,
  test: 5,
};

export const AddTagsDialog = ({
  isOpen,
  onClose,
  prevTags,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  prevTags?: string[];
  onSave: (tags: string[]) => void;
}) => {
  const [newTag, setNewTag] = useState("");
  const [existingTags, setExistingTags] = useState(
    new Map<string, number>(Object.entries(tagObject))
  );
  const [selectedTags, setSelectedTags] = useState(new Set<string>(prevTags));
  const handleAddTag = () => {
    if (!newTag.trim()) return;
    const newSet = new Set(selectedTags);
    newSet.add(newTag);
    setSelectedTags(newSet);
    const newMap = new Map(existingTags);
    newMap.set(newTag, 1);
    setExistingTags(newMap);
    setNewTag("");
  };
  const handleRemoveTag = (tag: string) => {
    const newSet = new Set(selectedTags);
    newSet.delete(tag);
    setSelectedTags(newSet);

    if (existingTags.has(tag)) {
      const newMap = new Map(existingTags);
      const count = newMap.get(tag)! - 1;
      if (count <= 0) newMap.delete(tag);
      else newMap.set(tag, count);

      setExistingTags(newMap);
    }
  };
  const handleSelectTag = (tag: string) => {
    const newSet = new Set(selectedTags);
    newSet.add(tag);
    setSelectedTags(newSet);

    if (existingTags.has(tag)) {
      const newMap = new Map(existingTags);
      const count = newMap.get(tag)! + 1;
      newMap.set(tag, count);
      setExistingTags(newMap);
    }
  };
  const handleClick = (has: boolean, tag: string) => {
    if (has) handleRemoveTag(tag);
    else handleSelectTag(tag);
  };
  const handleSave = () => {
    onSave([...selectedTags]);
  };
  const handleClose = () => {
    const newSet = new Set(prevTags);

    setSelectedTags(newSet);
    const newMap = new Map(Object.entries(tagObject));

    setExistingTags(newMap);
    setNewTag("");
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add tag</DialogTitle>
          <DialogDescription>
            Add an existing tag, or create a new one
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col ">
          <p className="font-semibold">Existing tags</p>
          <div className="flex flex-wrap overflow-hidden items-start gap-2">
            {[...existingTags.entries()].map((tag, index) => (
              <Badge
                onClick={() => handleClick(selectedTags.has(tag[0]), tag[0])}
                variant={selectedTags.has(tag[0]) ? "default" : "secondary"}
                className=""
                key={index}
              >
                <span>{tag[0]}</span>
                <span
                  className={clsx(
                    " px-1.5 py-0.5 rounded-sm text-xs",
                    selectedTags.has(tag[0])
                      ? "!bg-muted text-secondary-foreground"
                      : "!bg-primary text-button-text"
                  )}
                >
                  {tag[1] == 0 ? "x" : tag[1]}
                </span>
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Create new tag</p>
          <div className=" flex justify-center gap-2">
            <Input
              maxLength={20}
              value={newTag}
              onChange={(val) => setNewTag(val.target.value)}
            />
            <Plus onClick={handleAddTag} size={30} className="mt-0.5" />
          </div>
        </div>
        <div className="flex flex-row justify-between pt-4">
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
