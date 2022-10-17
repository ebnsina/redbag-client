function UserSidebar({ users, followHandler }) {
  return (
    <div className='bg-white p-4 rounded-xl'>
      <h4 className='text-base mb-8 text-center font-bold'>
        People you may follow
      </h4>

      <ul className='space-y-8'>
        {users &&
          users.map((user) => (
            <li key={user._id} className='flex justify-between items-center'>
              <div className='mr-4'>
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <p className='text-sm text-gray-600'>@{user.username}</p>
                <p className='text-sm text-gray-600'>{user.bloodGroup}</p>
              </div>
              <button
                onClick={() => followHandler(user._id)}
                className='bg-black text-sm px-6 py-2 text-white rounded-full'
              >
                Follow
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default UserSidebar;
