import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import ProfileForm from '../../components/forms/profile';
import Layout from '../../components/layouts/layout';
import UserRoute from '../../components/routes/user-route';
import { AuthContext } from '../../context/auth-context';
import { getUser } from '../../services/user';

function UserDetail() {
  const [authState, setAuthState] = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  const [profileFormIsVisible, setProfileFormIsVisible] = useState(false);

  const profileFormOpen = () => {
    setProfileFormIsVisible(true);
  };

  const profileFormClose = () => {
    setProfileFormIsVisible(false);
  };

  const router = useRouter();

  const { username } = router.query;

  const fetchUser = async () => {
    try {
      const { data } = await getUser(username);
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchUser();
    }
  }, [authState && authState.token, username]);

  return (
    <div>
      <UserRoute>
        <Layout>
          {profileFormIsVisible && (
            <ProfileForm profileFormClose={profileFormClose} />
          )}

          <div className='bg-white p-4 mt-8 rounded-lg max-w-xl mx-auto'>
            {userData?.image ? (
              <div className='flex justify-center items-center mb-8'>
                <Image
                  src={userData?.image?.url}
                  alt=''
                  width={96}
                  height={96}
                  className='object-cover rounded-xl'
                />
              </div>
            ) : (
              <div className='flex justify-center items-center mb-8'>
                <div className='w-24 h-24 bg-sky-200 rounded-xl'></div>
              </div>
            )}

            <ul className='space-y-5'>
              <li className='flex justify-between items-center bg-slate-50 p-4 rounded-xl'>
                <p className='text-sm text-slate-700'>Full Name</p>
                <p>
                  {userData?.firstName} {userData?.lastName}
                </p>
              </li>
              <li className='flex justify-between items-center bg-slate-50 p-4 rounded-xl'>
                <p className='text-sm text-slate-700'>Username</p>
                <p>@{userData?.username}</p>
              </li>
              <li className='flex justify-between items-center bg-slate-50 p-4 rounded-xl'>
                <p className='text-sm text-slate-700'>About</p>
                <p>{userData?.about}</p>
              </li>
              <li className='flex justify-between items-center bg-slate-50 p-4 rounded-xl'>
                <p className='text-sm text-slate-700'>Phone</p>
                <p>{userData?.phone}</p>
              </li>
              <li className='flex justify-between items-center bg-slate-50 p-4 rounded-xl'>
                <p className='text-sm text-slate-700'>Location</p>
                <p>{userData?.location}</p>
              </li>
              <li className='flex justify-between items-center bg-slate-50 p-4 rounded-xl'>
                <p className='text-sm text-slate-700'>Gender</p>
                <p>{userData?.gender}</p>
              </li>
              <li className='flex justify-between items-center bg-slate-50 p-4 rounded-xl'>
                <p className='text-sm text-slate-700'>Blood Group</p>
                <p>{userData?.bloodGroup}</p>
              </li>
              <li className='flex justify-between items-center bg-slate-50 p-4 rounded-xl'>
                <p className='text-sm text-slate-700'>Last Donate</p>
                <p>{userData?.lastDonate}</p>
              </li>
            </ul>

            <div className='flex justify-between items-center p-4 mt-8'>
              <Link href='/home'>
                <a className='-mx-4 inline-block px-4 py-2 rounded-xl transition hover:bg-slate-100'>
                  Back to Posts
                </a>
              </Link>
              <button onClick={profileFormOpen} href='/home'>
                <a className='-mx-4 inline-block px-4 py-2 rounded-xl transition bg-sky-400 text-white'>
                  Edit Info
                </a>
              </button>
            </div>
          </div>
        </Layout>
      </UserRoute>
    </div>
  );
}

export default UserDetail;
