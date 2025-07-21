import { Badge } from "../../../components/ui/badge";
import type { StatDetails } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
export const TagsStatsCard = ({ tags }: { tags: StatDetails[] }) => {
  return (
    <Card className="flex flex-col gap-2  max-w-sm">
      <CardHeader className="items-center">
        <CardTitle>Tags</CardTitle>
        <CardDescription>Your most used tags</CardDescription>
        <Separator orientation="horizontal" />
      </CardHeader>
      <CardContent className=" flex flex-wrap gap-2 flex-1">
        {tags.map((tag, index) => (
          <Badge
            className="flex flex-none size-fit !text-accent-foreground"
            key={index}
          >
            <span>{tag.name}</span>
            <span className="bg-muted text-secondary-foreground px-1.5 py-0.5 rounded-sm text-xs">
              {tag.count}
            </span>
          </Badge>
        ))}
        <Separator orientation="horizontal" className="self-end" />
      </CardContent>
      <CardFooter className="flex  flex-col text-sm justify-end ">
        <div className="text-sm text-muted-foreground mx-auto">
          Your most used tag is{" "}
          <span className="text-chart-1 font-medium text-sm">
            {tags[0].name}
          </span>{" "}
          with{" "}
          <span className="font-medium  text-foreground text-sm">
            {tags[0].count}
          </span>{" "}
          snippets.
        </div>
      </CardFooter>
    </Card>
  );
};
