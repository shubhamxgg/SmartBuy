import { User2, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Image from "next/image";

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full flex gap-2 items-center"
          size="icon"
          variant="ghost"
        >
          <Image
            alt="Avatar"
            className="overflow-hidden rounded-full"
            height={32}
            src="/user.jpg"
            style={{
              aspectRatio: "36/36",
              objectFit: "cover",
            }}
            width={36}
          />
          {/* <span className="hidden sm:block">Shubham</span> */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Shubham</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
