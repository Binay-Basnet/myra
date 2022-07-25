import { useContext } from 'react';

import { AuthContext } from '../utilComponents/AuthProvider';

export const useAuth = () => {
  return useContext(AuthContext);
};
