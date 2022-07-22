import { createContext, useState } from 'react';

import { User } from '@coop/shared/data-access';

type AuthType = Partial<{
  user: User;
  acessToken: string;
}>;

export const AuthContext = createContext<{
  auth: AuthType;
  setAuthentication?: (value: AuthType) => void;
}>({ auth: {} });

interface AuthProps {
  children: React.ReactNode;
}
export const AuthProvider = (props: AuthProps) => {
  const { children } = props;
  const [auth, setAuth] = useState<AuthType>({});
  const setAuthentication = (value: AuthType) => {
    setAuth(value);
  };
  return (
    <AuthContext.Provider value={{ auth, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
