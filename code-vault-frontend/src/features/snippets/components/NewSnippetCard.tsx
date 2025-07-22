import { Card, CardContent } from "../../../components/ui/card";
import { Plus } from "lucide-react";

export const NewSnippetCard = ({ click }: { click: () => void }) => {
  return (
    <Card
      onClick={click}
      className="flex flex-col justify-center gap-2 w-full sm:max-w-md lg:max-w-sm cursor-pointer"
    >
      <CardContent className="flex justify-center ">
        <Plus size={90} />
      </CardContent>
    </Card>
  );
};
