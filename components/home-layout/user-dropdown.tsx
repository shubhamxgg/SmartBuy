import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

const UserDropdown = async () => {
  const user = await currentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full flex gap-2 items-center"
          size="icon"
          variant="outline"
        >
          {user ? (
            <Image
              alt="Avatar"
              className="overflow-hidden rounded-full"
              height={32}
              src={user?.imageUrl!}
              style={{
                aspectRatio: "36/36",
                objectFit: "cover",
              }}
              width={36}
            />
          ) : (
            ""
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>{user?.firstName}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
