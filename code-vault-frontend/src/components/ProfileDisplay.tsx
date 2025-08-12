import { UserRound } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";

export const ProfileDisplay = () => {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-4">
      <div className="aspect-square border-8 p-2 rounded-4xl border-primary ">
        <UserRound size={90} />
      </div>
      <p>{user?.username}</p>
    </div>
  );
};
