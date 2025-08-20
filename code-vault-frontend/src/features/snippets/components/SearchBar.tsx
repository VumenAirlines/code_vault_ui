import { Search } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchBar = ({ className }: { className: string }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
    }
  };
  return (
    <div className={cn("w-lg", className)}>
      <span className="flex flex-row justify-end pr-4 border-2 rounded-xl items-center border-accent bg-accent">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none focus-visible:!border-0 focus-visible:!ring-0 !bg-transparent"
        />
        <Search className="cursor-pointer" onClick={handleSearch} />
      </span>
    </div>
  );
};
