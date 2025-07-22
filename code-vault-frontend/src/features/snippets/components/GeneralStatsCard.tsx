import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
export const GeneralStatsCard = ({
  totalCount,
  langCount,
  tagCount,
}: {
  totalCount: number;
  langCount: number;
  tagCount: number;
}) => {
  return (
    <Card className="flex flex-1 flex-col gap-2  w-full sm:max-w-md lg:max-w-sm ">
      <CardHeader className="items-center">
        <CardTitle>Stats</CardTitle>
        <CardDescription>Your general statistics</CardDescription>
        <Separator orientation="horizontal" />
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        <div className="text-center">
          <p className="text-muted-foreground">Snippets</p>
          <p className="text-lg font-semibold text-accent-foreground">
            {totalCount}
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Languages</p>
          <p className="text-lg font-semibold text-accent-foreground">
            {langCount}
          </p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Tags</p>
          <p className="text-lg font-semibold text-accent-foreground">
            {tagCount}
          </p>
        </div>
        <Separator
          orientation="horizontal"
          className="self-end col-span-full w-full"
        />
      </CardContent>
      <CardFooter className="flex  flex-col text-sm justify-end ">
        <div className="text-sm text-muted-foreground mx-auto">
          As of {new Date().toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};
