//AuthenticationGuard.tsx
import type { ComponentType } from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";

type AuthenticationGuard = <P extends object>(
  component: ComponentType<P>,
) => ComponentType<P>;

const AuthenticationGuard: AuthenticationGuard = (component) => {
  return withAuthenticationRequired(component, {
    onRedirecting: () => <div>Redirecting you to the login page...</div>,
  });
};

export default AuthenticationGuard;
