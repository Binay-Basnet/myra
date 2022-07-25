import { useContext } from 'react';

import { AuthContext } from '../utils/AuthProvider';

export const useAuth = () => {
  return useContext(AuthContext);
};
