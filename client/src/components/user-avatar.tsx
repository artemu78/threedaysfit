import { useUser } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const UserAvatar = () => {
  const { user, setUser } = useUser((state) => state);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="IconButton" aria-label="Customise options">
          {user?.googleData ? (
            <img
              src={user.googleData.picture}
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600">U</span>
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="DropdownMenuContent" sideOffset={5}>
        {/* <DropdownMenuItem
          className="DropdownMenuItem"
          onSelect={() => console.log("Profile clicked")}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="DropdownMenuItem"
          onSelect={() => console.log("Settings clicked")}
        >
          Settings
        </DropdownMenuItem> */}

        <DropdownMenuSeparator className="DropdownMenuSeparator" />
        <DropdownMenuItem
          className="DropdownMenuItem"
          onSelect={() => setUser({})}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
