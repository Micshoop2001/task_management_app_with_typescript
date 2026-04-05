//App.tsx
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import CallbackPage from "./components/CallbackPage";
import ProtectedPage from "./components/security/ProtectedPage";
import { useAuth0 } from "@auth0/auth0-react";
import ProfilePage from "./components/ProfilePage";
import AuthenticationGuard from "./components/security/AuthenticationGuard";

const GuardedProfilePage = AuthenticationGuard(ProfilePage);
const GuardedProtectedPage = AuthenticationGuard(ProtectedPage);

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/profile"
        element={<GuardedProfilePage />}
      />
      <Route
        path="/protected"
        element={<GuardedProtectedPage />}
      />
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
};

export default App;
