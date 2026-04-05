//LogoutButton.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (!isAuthenticated) return null;
  return (
    <div>
      <h1>Logged out of Task Dashboard</h1>
      <Button onClick={handleLogout}>Log Out</Button>
      <p>
        Thank you for using the Task Dashboard. Clicking the logout button will
        log you out
      </p>
    </div>
  );
};

export default LogoutButton;
