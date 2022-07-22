import { createContext, useState } from 'react';

export const AuthContext = createContext<{auth:object,setAuthentication:(value:any)=>void}>({});

interface AuthProps {
  children: React.ReactNode;
}
export const AuthProvider = (props: AuthProps) => {
  const { children } = props;
  const [auth, setAuth] = useState({});
  const setAuthentication = (value: any) => {
    setAuth(value);
  };
  return (
    <AuthContext.Provider value={{ auth, setAuthentication }}>
      {children}
    </AuthContext.Provider>
  );
};
