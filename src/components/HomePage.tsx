//Home-page.tsx
import { Col, Container } from "react-bootstrap";
import LoginButton from "./security/LoginButton";
import LogoutButton from "./security/LogoutButton";

const HomePage: React.FC = () => {
  return (
    <Container>
      <Col>
        <LoginButton />
        <LogoutButton />
      </Col>
    </Container>
  );
};

export default HomePage;
