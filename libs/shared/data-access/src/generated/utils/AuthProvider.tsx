import { createContext, useState } from 'react';

import { User } from '@coop/shared/data-access';

type AuthType = Partial<{
  user: Partial<User>;
  accessToken: string;
}>;

export const AuthContext = createContext<{
  auth: AuthType;
  setAuthentication?: (value: AuthType) => void;
  authenticate?: (value: AuthType) => void;

  isLogged?: boolean | null;
  logout?: () => void;
}>({ auth: {} });

interface AuthProps {
  children: React.ReactNode;
}
export const AuthProvider = (props: AuthProps) => {
  const { children } = props;
  const [auth, setAuth] = useState<AuthType>({});
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const setAuthentication = (value: AuthType) => {
    setAuth(value);
    setIsLogged(true);
  };
  const logout = () => setIsLogged(false);

  const authenticate = (value: AuthType) => {
    setAuth(value);
    setIsLogged(true);
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuthentication, authenticate, isLogged, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
