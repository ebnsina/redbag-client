import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { formatRelative, subDays } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Layout from '../../../components/layouts/layout';
import UserRoute from '../../../components/routes/user-route';
import { AuthContext } from '../../../context/auth-context';
import {
  addComment,
  deletePost,
  getPost,
  removeComment,
} from '../../../services/post';

function PostDetail() {
  const [authState, setAuthState] = useContext(AuthContext);
  const [post, setPost] = useState({});

  const [comment, setComment] = useState('');
  const [commentFormIsVisible, setCommentFormIsVisible] = useState(false);

  const router = useRouter();
  const { _id } = router.query;

  const fetchPost = async () => {
    try {
      const { data } = await getPost(_id);
      console.log(data);
      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!_id) {
      return;
    }

    fetchPost();
  }, [_id]);

  const deleteHandler = async () => {
    try {
      if (confirm('Are you sure to delete?')) {
        const { data } = await deletePost(_id);
        if (data.success) {
          router.push('/home');
          toast.success('Post deleted');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async (e) => {
    e.preventDefault();

    if (comment.trim().length <= 0) {
      toast.error('Comment field can not be empty.');
      return;
    }

    try {
      await addComment(_id, comment);
      toast.success('Comment added!');
      setComment('');
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  const commentRemoveHandler = async (_id, comment) => {
    try {
      if (confirm('Are you sure to delete?')) {
        await removeComment(_id, comment);
        toast.success('Comment remove!');
      }
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{post.content}</title>
      </Head>

      <UserRoute>
        <Layout>
          <Link href='/home'>
            <a className='block font-semibold my-3 underline'>
              Back to All Posts
            </a>
          </Link>

          <div className='max-w-xl mx-auto mt-5'>
            <div className='bg-white p-4 rounded-xl shadow-sm text-center'>
              <h1 className='text-2xl font-semibold'>{post.content}</h1>

              {authState && authState?.user?._id === post?.postedBy && (
                <div className='space-x-4 mt-8'>
                  <Link href={`/posts/${post._id}/edit`}>
                    <a className='border border-slate-400 px-4 py-2 rounded-xl'>
                      Edit
                    </a>
                  </Link>
                  <button
                    onClick={deleteHandler}
                    className='border border-slate-400 px-4 py-2 rounded-xl'
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div className='bg-white p-4 rounded-xl shadow-sm mt-8'>
              {post && post?.comments?.length > 0 ? (
                <ul className='space-y-4 divide-y'>
                  {post?.comments?.map((comment) => (
                    <li key={comment._id} className='pt-5'>
                      <h3>
                        {comment?.text}
                        <span className='flex text-sm text-slate-600'>
                          <time className='capitalize inline-flex text-sm text-slate-700'>
                            {formatRelative(
                              subDays(new Date(comment?.createdAt), 0),
                              new Date()
                            )}
                          </time>
                          <span className='inline-flex ml-2'>
                            {' '}
                            {`${comment?.postedBy?.firstName} ${comment?.postedBy?.lastName}`}
                          </span>
                        </span>
                      </h3>

                      <div className='space-x-4 mt-5'>
                        {/* <button className='px-4 py-1 border border-black text-sm text-slate-700 rounded-xl'>
                          Edit
                        </button> */}
                        <button
                          onClick={() => commentRemoveHandler(_id, comment)}
                          className='px-4 py-1 border border-black text-sm text-slate-700 rounded-xl'
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className='flex justify-center items-center flex-col'>
                  <ChatBubbleBottomCenterIcon className='h-10 w-10 text-slate-900' />
                  <p className='my-3'>No comments yet!</p>
                </div>
              )}

              <div className='flex justify-center items-center mt-5'>
                <button
                  onClick={() => setCommentFormIsVisible(!commentFormIsVisible)}
                  className='border border-slate-400 px-4 py-2 rounded-xl'
                >
                  {!commentFormIsVisible
                    ? 'Add a comment'
                    : 'Close Comment Form'}
                </button>
              </div>

              {commentFormIsVisible && (
                <form onSubmit={commentHandler} className='mt-5'>
                  <div className='mb-3'>
                    <label
                      className='sr-only block text-sm mb-1 text-slate-600'
                      htmlFor='comment'
                    >
                      Comment
                    </label>
                    <textarea
                      name='comment'
                      id='comment'
                      rows='4'
                      className='border border-slate-400 rounded-xl w-full'
                      placeholder='Add a comment'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>

                  <button
                    className='px-4 py-2 w-full bg-sky-500 text-white rounded-xl'
                    type='submit'
                  >
                    Add
                  </button>
                </form>
              )}
            </div>
          </div>
        </Layout>
      </UserRoute>
    </>
  );
}

export default PostDetail;
