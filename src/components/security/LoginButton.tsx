// LoginButton.tsx
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Login to Task Dashboard Page</h1>
        <Button onClick={handleLogin}>Log In</Button>
        <p>
          Clicking the login button will redirect you to the Auth0 Universal
          Login page. After successful authentication, you will be redirected
          back to the profile page.
        </p>
        <p>
          If you need to sign up, please follow the directions the Auth0
          Universal Login page.
        </p>
      </div>
    );
  }
  return null;
};

export default LoginButton;
