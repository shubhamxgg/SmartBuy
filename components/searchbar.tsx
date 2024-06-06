import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

const Searchbar = () => {
  return (
    <div className="relative w-auto">
      <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
      <Input
        className="w-full pl-8 md:w-[400px] lg:w-[400px]"
        placeholder="Search product..."
      />
    </div>
  );
};

export default Searchbar;
