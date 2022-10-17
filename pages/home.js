import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/layouts/layout';
import UserRoute from '../components/routes/user-route';
import NewPost from '../components/user/posts/new';
import Posts from '../components/user/posts/posts';
import ProfileSidebar from '../components/user/profile-sidebar';
import UserSidebar from '../components/user/user-sidebar';
import { AuthContext } from '../context/auth-context';
import { getPosts } from '../services/post';
import {
  findUsers,
  getFollowings,
  search,
  updateUserFollower,
  updateUserUnfollower,
} from '../services/user';

function HomePage() {
  const [authState, setAuthState] = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const { data } = await getPosts();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await findUsers();
      setUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (authState && authState.token) {
      fetchUsers();
    }
  }, [authState && authState.token]);

  // Follow
  const followHandler = async (_id) => {
    try {
      const { data } = await updateUserFollower(_id);
      const authData = JSON.parse(localStorage.getItem('rb-auth'));
      authData.user = data;
      localStorage.setItem('rb-auth', JSON.stringify(authData));
      setAuthState({ ...authState, user: data });
      const filteredUsers = users.filter((user) => user._id !== _id);
      setUsers(filteredUsers);
      toast.success(`Following!`);
      fetchPosts();
      fetchUsers();
      fetchFollowings();
    } catch (error) {
      console.log(error);
    }
  };

  // Unfollow
  const unfollowHandler = async (_id) => {
    try {
      const { data } = await updateUserUnfollower(_id);
      const authData = JSON.parse(localStorage.getItem('rb-auth'));
      authData.user = data;
      localStorage.setItem('rb-auth', JSON.stringify(authData));
      setAuthState({ ...authState, user: data });
      const filtered = followings.filter((user) => user._id !== _id);
      setFollowings(filtered);
      toast.success(`Unfollowed!`);
      fetchPosts();
      fetchUsers();
      fetchFollowings();
    } catch (error) {
      console.log(error);
    }
  };

  // Search Users
  const [query, setQuery] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);

  const searchHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await search(query);
      setSearchedUsers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch followings
  const [followings, setFollowings] = useState([]);

  const fetchFollowings = async () => {
    try {
      const { data } = await getFollowings();
      console.log(data);
      setFollowings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authState && authState.token) {
      fetchFollowings();
    }
  }, [authState && authState.token]);

  function UserSearch() {
    return (
      <div className='bg-white p-4 shadow-sm rounded-xl mb-8'>
        <form onSubmit={searchHandler} className='flex mb-5'>
          <input
            autoFocus
            className='w-full rounded-xl border border-slate-300'
            type='text'
            name='search'
            placeholder='Type name, blood group..'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type='submit'
            className='px-4 py-2 bg-sky-400 text-white rounded-xl ml-2'
          >
            Search
          </button>
        </form>

        <ul className='space-y-4'>
          {searchedUsers.map((user) => (
            <li key={user._id} className='bg-sky-100 rounded-xl p-4'>
              <h2 className='mb-1 font-semibold'>{user.username}</h2>
              <p>{user.bloodGroup}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <UserRoute>
      <Layout>
        <div className='flex'>
          <div className='w-80 p-4'>
            <ProfileSidebar
              followings={followings}
              unfollowHandler={unfollowHandler}
            />
          </div>
          <div className='flex-1 p-4 h-[90vh] overflow-y-auto'>
            <NewPost fetchPosts={fetchPosts} />
            <Posts posts={posts} fetchPosts={fetchPosts} />
          </div>
          <div className='w-96 p-4'>
            <UserSearch />
            <UserSidebar users={users} followHandler={followHandler} />
          </div>
        </div>
      </Layout>
    </UserRoute>
  );
}

export default HomePage;
