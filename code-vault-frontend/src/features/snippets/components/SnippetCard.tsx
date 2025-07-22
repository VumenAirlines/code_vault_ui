import type { Snippet } from "../types";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";

//todo:lang names
export const SnippetCard = ({
  snippet,
  click,
  editClick,
}: {
  snippet: Snippet;
  click: () => void;
  editClick: () => void;
}) => {
  return (
    <Card
      className="flex flex-col gap-2 cursor-pointer w-full sm:max-w-md lg:max-w-sm overflow-x-clip"
      onClick={click}
    >
      <CardHeader>
        <CardAction className="font-semibold leading-none text-center !row-start-1 !col-start-1 !justify-self-center !self-center mx-auto">
          {snippet.title}
        </CardAction>
        <CardAction className="space-x-2 flex-row flex !col-start-1">
          <Badge onClick={editClick} className="!text-accent-foreground">
            Edit
          </Badge>
        </CardAction>
        <CardAction className="!col-start-1 !self-start !justify-self-start">
          <Badge className="!text-accent-foreground ">{snippet.language}</Badge>
        </CardAction>
      </CardHeader>

      <CardContent className=" flex flex-col gap-2 flex-1">
        <Separator orientation="horizontal" />
        <p className="px-2">Description</p>
        <div className="flex flex-1 px-2 text-sm text-muted-foreground break-all whitespace-pre-wrap w-full  max-h-sm h-sm">
          {snippet.description}
        </div>

        <p className="p-2">Tags</p>
        <div className="flex flex-wrap p-2 text-sm">
          {snippet.tags.map((tag, index) => (
            <Badge
              className="flex flex-none size-fit !text-accent-foreground"
              key={index}
            >
              {tag}
            </Badge>
          ))}
        </div>

        <Separator orientation="horizontal" />
      </CardContent>
      <CardFooter className="flex flex-col text-sm justify-end ">
        <div className=" flex flex-row justify-between text-sm text-muted-foreground gap-2">
          <span>
            {`Created: ${
              new Date(snippet.createdAt).toISOString().split("T")[0]
            }`}
          </span>
          <span>
            {`Updated: ${
              snippet.updatedAt
                ? new Date(snippet.updatedAt).toISOString().split("T")[0]
                : "-"
            }`}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
