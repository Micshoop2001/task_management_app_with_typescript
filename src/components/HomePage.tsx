//Home-page.tsx
import { Col, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./security/LoginButton";
import LogoutButton from "./security/LogoutButton";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <Container>
        <Col>
          <h2>Welcome back!</h2>
          <p>You are currently logged in.</p>
          <LogoutButton />
        </Col>
      </Container>
    );
  } else {
    return (
      <Container>
        <Col>
          <h1>Welcome to the Task Dashboard</h1>
          <p>Please log in to continue.</p>
          <LoginButton />
        </Col>
      </Container>
    );
  }
};

export default HomePage;
