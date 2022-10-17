import axios from 'axios';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

import { url } from '../services/api';

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    token: '',
  });

  const router = useRouter();

  useEffect(() => {
    setAuthState(JSON.parse(window.localStorage.getItem('rb-auth')));
  }, []);

  const token = authState && authState.token ? authState.token : '';

  axios.defaults.baseURL = url;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.message;

      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setAuthState(null);
        window.localStorage.removeItem('rb-auth');
        router.push('/signin');
      }
    }
  );

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
