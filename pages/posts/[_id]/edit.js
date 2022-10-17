import { ArrowUturnUpIcon, PhotoIcon } from '@heroicons/react/24/solid';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Layout from '../../../components/layouts/layout';
import UserRoute from '../../../components/routes/user-route';
import { getPost, updatePost } from '../../../services/post';

function EditPost() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const { _id } = router.query;

  const fetchPost = async () => {
    try {
      const { data } = await getPost(_id);
      console.log(data);
      setContent(data.content);
      setImage(data.image);
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

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await updatePost(_id, { content, image });
      if (data) {
        toast.success('Post updated!');
        setContent('');
        setImage({});
        fetchPost();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const imageUploadHandler = async (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file?.size > MAX_FILE_SIZE) {
      return toast.error(`Max file size 5mb`);
    }

    let formData = new FormData();
    formData.append('image', file);

    try {
      setIsUploading(true);
      const { data } = await uploadImage(formData);
      const { url, public_id } = data;

      if (data) {
        setImage({ url, public_id });
      }

      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Edit - {content}</title>
      </Head>

      <UserRoute>
        <Layout>
          <div className='max-w-xl mx-auto mt-5'>
            <div className='bg-white p-4 rounded-xl shadow-sm text-center'>
              <form onSubmit={submitHandler}>
                <div className='mb-3'>
                  <textarea
                    className='w-full border border-slate-300 rounded-xl focus:ring-0 focus:border-sky-400'
                    name='content'
                    id='content'
                    rows='5'
                    placeholder="What's up?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>

                <div className='flex justify-between items-center my-5'>
                  <div>
                    <label htmlFor='image'>
                      <input
                        type='file'
                        name='image'
                        className=''
                        id='image'
                        accept='images/*'
                        onChange={imageUploadHandler}
                        hidden
                      />

                      {image && image?.url ? (
                        <div key={image?.public_id}>
                          <Image
                            src={image.url}
                            width={40}
                            height={40}
                            className='rounded-xl object-cover'
                            alt=''
                          />
                        </div>
                      ) : isUploading ? (
                        <ArrowUturnUpIcon className='h-6 w-6 text-sky-500' />
                      ) : (
                        <PhotoIcon className='h-6 w-6 text-sky-500' />
                      )}
                    </label>
                  </div>

                  <div className='flex gap-4'>
                    <Link href={`/posts/${_id}`}>
                      <a className='block px-8 py-2 bg-black text-white rounded-xl disabled:bg-slate-300 disabled:cursor-not-allowed'>
                        Cancel
                      </a>
                    </Link>

                    <button
                      disabled={!content || isUploading || isLoading}
                      className='block px-8 py-2 bg-sky-500 text-white rounded-xl disabled:bg-slate-300 disabled:cursor-not-allowed'
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Layout>
      </UserRoute>
    </>
  );
}

export default EditPost;
