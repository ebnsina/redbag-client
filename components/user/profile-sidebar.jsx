import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';

function ProfileSidebar({ followings, unfollowHandler }) {
  const [authState, setAuthState] = useContext(AuthContext);

  return (
    <div className='min-h-[85vh]'>
      <div className='flex items-center'>
        <Image
          src={authState?.user?.image?.url}
          width={60}
          height={60}
          className='rounded-xl object-cover flex-shrink-0'
          alt=''
        />
        <div className='ml-3'>
          <h3 className='text-2xl font-semibold'>
            {authState?.user?.username}
          </h3>
          <p className='text-base mb-3'>{authState?.user?.email}</p>
        </div>
      </div>

      <ul className='mt-8'>
        <li>
          <Link href={`/users/${authState?.user?.username}`}>
            <a className='-mx-4 inline-flex px-4 py-2 rounded-xl transition hover:bg-black hover:text-white'>
              My Profile
            </a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a className='-mx-4 inline-flex px-4 py-2 rounded-xl transition hover:bg-black hover:text-white'>
              Following:{' '}
              {authState?.user?.following?.length
                ? authState?.user?.following?.length
                : 0}
            </a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a className='-mx-4 inline-flex px-4 py-2 rounded-xl transition hover:bg-black hover:text-white'>
              Followers:{' '}
              {authState?.user?.followers?.length
                ? authState?.user?.followers?.length
                : 0}
            </a>
          </Link>
        </li>
      </ul>

      <hr className='my-5' />

      <ul className='space-y-4'>
        {followings.map((user) => (
          <li
            key={user._id}
            className='bg-white p-4 rounded-xl flex justify-between items-center'
          >
            <div className='mr-4'>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <p className='text-sm text-gray-600'>@{user.username}</p>
              <p className='text-sm text-gray-600'>{user.bloodGroup}</p>
            </div>
            <button
              onClick={() => unfollowHandler(user._id)}
              className='bg-black text-sm px-6 py-2 text-white rounded-full'
            >
              Unfollow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfileSidebar;
