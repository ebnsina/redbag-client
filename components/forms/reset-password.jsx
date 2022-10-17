import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { resetPassword } from '../../services/auth';
import Button from '../ui/button';
import Spinner from '../ui/spinner';

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');
      const phone = formData.get('phone');

      const { data } = await resetPassword({ email, password, phone });
      toast.success('Password reset successfully.');
      router.push('/signin');
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='mb-3'>
        <label className='block text-sm text-slate-600 mb-1' htmlFor='email'>
          Email
        </label>
        <input
          className='px-4 py-3 border border-slate-400 rounded-xl w-full'
          type='text'
          name='email'
          placeholder='ebnsina@gmail.com'
        />
      </div>

      <div className='mb-3'>
        <label className='block text-sm text-slate-600 mb-1' htmlFor='email'>
          Phone Number
        </label>
        <input
          className='px-4 py-3 border border-slate-400 rounded-xl w-full'
          type='text'
          name='phone'
          placeholder='01712345678'
        />
      </div>

      <div className='mb-3'>
        <label className='block text-sm text-slate-600 mb-1' htmlFor='password'>
          Password
        </label>
        <input
          className='px-4 py-3 border border-slate-400 rounded-xl w-full'
          type='password'
          name='password'
          placeholder='********'
        />
      </div>

      <div className='mt-5'>
        <Button>{isLoading ? <Spinner /> : 'Reset'}</Button>
      </div>
    </form>
  );
}

export default ResetPassword;
