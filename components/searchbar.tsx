import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";

const Searchbar = () => {
  return (
    <div className="relative w-auto flex gap-2">
      <SearchIcon className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
      <Input
        className="w-full pl-8 md:w-[400px] lg:w-[400px]"
        placeholder="Search product..."
      />
      <Link href={"/search"} >
        <Button>Search</Button>
      </Link>
    </div>
  );
};

export default Searchbar;
