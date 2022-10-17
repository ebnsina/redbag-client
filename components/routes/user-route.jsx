import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../context/auth-context';
import { currentUser } from '../../services/auth';

function UserRoute({ children }) {
  const [authState, setAuthState] = useContext(AuthContext);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const fetchCurrentUser = async () => {
    try {
      const { data } = await currentUser();
      setSuccess(data.success);
    } catch (error) {
      console.log(error);
      router.push('/signin');
    }
  };

  useEffect(() => {
    if (authState && authState?.token) {
      fetchCurrentUser();
    }
  }, [authState && authState?.token]);

  if (typeof window !== 'undefined') {
    authState === null &&
      setTimeout(() => {
        fetchCurrentUser();
      }, 1000);
  }

  return !success ? (
    <p className='text-center mt-5'>Loading..</p>
  ) : (
    <>{children}</>
  );
}

export default UserRoute;
