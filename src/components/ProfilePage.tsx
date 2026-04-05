//ProfilePage.tsx
import { useAuth0 } from "@auth0/auth0-react";
import PageLayout from "./PageLayout";
import { Row } from "react-bootstrap";
import ItemComponent from "./tasks/ItemComponent";
import { TaskProvider } from "./tasks/TaskContext";

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  if (!user) {
    return <div>No user profile</div>;
  }

  getAccessTokenSilently().then((token) => console.log("token", token));

  return (
    <PageLayout>
      <h2>Tasks Page</h2>
      <Row>
        {user?.picture && <img src={user.picture} alt={user.name} />}
        <h3>{user.name}</h3>
      </Row>
      <TaskProvider>
        <ItemComponent />
      </TaskProvider>
    </PageLayout>
  );
};

export default ProfilePage;
