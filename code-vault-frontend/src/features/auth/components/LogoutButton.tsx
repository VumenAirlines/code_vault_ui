import { Button } from "../../../components/ui/button";
import { useLogout } from "../hooks/useLogout";

export const LogoutButton = ({ onLogout }: { onLogout?: () => void }) => {
  const doLogout = useLogout();
  function handleLogout() {
    doLogout();
    onLogout?.();
  }
  return <Button onClick={handleLogout}>Log out</Button>;
};
