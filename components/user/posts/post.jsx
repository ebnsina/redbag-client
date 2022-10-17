import Image from 'next/image';
import { formatRelative, subDays } from 'date-fns';
import {
  HeartIcon,
  MapIcon,
  ChatBubbleBottomCenterIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconFill } from '@heroicons/react/24/solid';
import Link from 'next/link';

import calculateAge from '../../../lib/ageCalculate';
import { addLike, removeLike } from '../../../services/post';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../../../context/auth-context';

function Post({ post, fetchPosts }) {
  const [authState, setAuthState] = useContext(AuthContext);

  const likeHandler = async (_id) => {
    try {
      await addLike(_id);
      toast.success(`Liked added!`);
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const unlikeHandler = async (_id) => {
    try {
      await removeLike(_id);
      toast.success(`Liked removed!`);
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className='bg-white overflow-hidden rounded-xl mb-4 shadow-sm'>
      {post?.image?.url && (
        <Image
          src={post?.image?.url}
          width={610}
          height={300}
          className='object-cover'
          alt=''
        />
      )}

      <div className='flex p-4'>
        {post?.postedBy?.image?.url && (
          <div className='mr-3'>
            <Image
              src={post?.postedBy?.image?.url}
              width={60}
              height={60}
              className='rounded-full object-cover flex-shrink-0'
              alt=''
            />
          </div>
        )}

        <div className='flex items-center space-x-1'>
          <h3 className='text-xl font-semibold'>{`${post?.postedBy?.firstName} ${post.postedBy.lastName}`}</h3>
          <p className='text-slate-700 text-sm'> @{post?.postedBy?.username}</p>
          <span className='inline-flex ml-1'>&middot;</span>
          <time className='inline-flex text-sm text-slate-700'>
            {formatRelative(subDays(new Date(post?.createdAt), 0), new Date())}
          </time>
        </div>
      </div>

      <div className='px-4 py-2 flex gap-4 flex-wrap justify-between items-center text-slate-700'>
        <p>
          <Image src='/images/age-group.png' width={15} height={15} alt='' />{' '}
          {calculateAge(post?.postedBy.dob)} yrs
        </p>
        <p>
          <Image src='/images/blood-drop.png' width={15} height={15} alt='' />{' '}
          {post.postedBy.bloodGroup}
        </p>
        <p className='flex'>
          <MapIcon className='h-4 w-4 text-slate-900 mr-1' />
          {post.postedBy.location}
        </p>
        <p>
          <Image src='/images/gender.png' width={15} height={15} alt='' />{' '}
          {post.postedBy.gender}
        </p>

        <a
          href={`tel:${post.postedBy.phone}`}
          className='bg-sky-500 px-4 py-1 text-white rounded-full inline-block text-sm'
        >
          {post.postedBy.phone}
        </a>
      </div>

      <Link href={`/posts/${post._id}`}>
        <a className='text-2xl font-semibold px-4 py-2 transition hover:text-sky-400 hover:underline block'>
          {post.content}
        </a>
      </Link>

      <div className='bg-slate-50 flex justify-between items-center p-4'>
        {post?.likes?.includes(authState?.user?._id) ? (
          <button
            onClick={() => unlikeHandler(post._id)}
            className='flex items-center'
          >
            <span>
              <HeartIconFill className='h-4 w-4 text-slate-900 mr-1' />
            </span>
            <span>
              {post?.likes?.length > 0 ? post?.likes?.length : null}
              <span className='inline-block ml-1'>Unlike</span>
            </span>
          </button>
        ) : (
          <button
            onClick={() => likeHandler(post._id)}
            className='flex items-center'
          >
            <span>
              <HeartIcon className='h-4 w-4 text-slate-900 mr-1' />
            </span>
            <span>
              {post?.likes?.length > 0 ? post?.likes?.length : null}
              <span className='inline-block ml-1'>Like</span>
            </span>
          </button>
        )}

        <button className='flex items-center'>
          <span>
            <ChatBubbleBottomCenterIcon className='h-4 w-4 text-slate-900 mr-1' />
          </span>
          <span>
            {post?.comments?.length > 0 ? post?.comments?.length : null}
            <span className='inline-block ml-1'>Comment</span>
          </span>
        </button>
      </div>
    </article>
  );
}

export default Post;
