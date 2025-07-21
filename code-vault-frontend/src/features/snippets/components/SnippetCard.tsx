import type { Snippet } from "../types";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";

export const SnippetCard = ({ snippet }: { snippet: Snippet }) => {
  return (
    <Card className="flex flex-col gap-2 max-w-sm">
      <CardHeader>
        <CardTitle className="text-center">{snippet.title}</CardTitle>
        <CardAction>
          <Badge className=" !text-accent-foreground">{snippet.language}</Badge>
        </CardAction>
      </CardHeader>

      <CardContent className=" flex flex-col gap-2 flex-1">
        <Separator orientation="horizontal" />
        <p className="p-2">Description</p>
        <div className="flex flex-wrap border-2 rounded-sm p-2 text-sm text-muted-foreground">
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
