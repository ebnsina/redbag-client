import { useState } from 'react';
import { ArrowUturnUpIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { createPost, uploadImage } from '../../../services/post';
import Image from 'next/image';
import { toast } from 'react-toastify';

function NewPost({ fetchPosts }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data } = await createPost({ content, image });
      console.log(data);
      if (data) {
        toast.success('Post created!');
        setContent('');
        setImage({});
        fetchPosts();
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
        <button
          disabled={!content || isUploading || isLoading}
          className='block px-8 py-2 bg-sky-500 text-white rounded-xl disabled:bg-slate-300 disabled:cursor-not-allowed'
        >
          Post
        </button>
      </div>
    </form>
  );
}

export default NewPost;
