import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/auth-context';

import { login } from '../../services/auth';
import Button from '../ui/button';
import Spinner from '../ui/spinner';

function SigninForm() {
  const [authState, setAuthState] = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');

      const { data } = await login({ email, password });
      toast.success('User login successfully.');
      console.log(data);
      setAuthState({ user: data.user, token: data.token });
      window.localStorage.setItem('rb-auth', JSON.stringify(data));
      router.push('/home');
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
        <Button>{isLoading ? <Spinner /> : 'Sign in'}</Button>
      </div>
    </form>
  );
}

export default SigninForm;
