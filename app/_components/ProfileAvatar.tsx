"use client";
import { useAuthContext } from "../provider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/useSignOut";

function ProfileAvatar() {
  const user = useAuthContext();
  const signOutHandler = useSignOut();

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          {user?.user?.photoURL && (
            <img
              src={user?.user?.photoURL}
              alt="profile"
              className="w-[35px] h-[35px] rounded-full"
            />
          )}
        </PopoverTrigger>
        <PopoverContent className="w-[100px] mx-w-sm">
          <Button variant="ghost" onClick={signOutHandler}>
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ProfileAvatar;
