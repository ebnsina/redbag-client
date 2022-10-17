import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';
import Layout from './layout';

function Header() {
  const [authState, setAuthState] = useContext(AuthContext);

  const router = useRouter();

  const logoutHandler = () => {
    setAuthState(null);
    localStorage.removeItem('rb-auth');
    router.push('/signin');
  };

  return (
    <header className='bg-white shadow-sm sticky top-0 left-0 w-full z-10 py-3'>
      <Layout className='flex justify-between items-center'>
        <Link href='/'>
          <a className='text-fancy text-2xl font-bold'>
            <span className='inline-block text-red-600'>Red</span>
            <span className='inline-block text-slate-900 ml-2'>bag</span>
          </a>
        </Link>

        <nav>
          <ul className='flex space-x-4 items-center'>
            {authState === null && (
              <li>
                <Link href='/join'>
                  <a className='inline-block bg-black text-white px-8 py-2 rounded-xl text-xl'>
                    Join As Donor
                  </a>
                </Link>
              </li>
            )}

            {authState !== null && (
              <li>
                <button
                  onClick={logoutHandler}
                  className='inline-block bg-black text-white px-8 py-2 rounded-xl text-xl'
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </Layout>
    </header>
  );
}

export default Header;
