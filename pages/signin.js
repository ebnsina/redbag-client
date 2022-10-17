import Head from 'next/head';
import Link from 'next/link';

import SigninForm from '../components/forms/signin';
import Layout from '../components/layouts/layout';

function SigninPage() {
  return (
    <>
      <Head>
        <title>Sign in - The Red Bag</title>
      </Head>
      <section>
        <Layout className='max-w-xl mt-10 bg-white shadow-md border border-red-600 rounded-xl p-8'>
          <div className='p-8'>
            <h3 className='text-3xl font-medium mb-5 text-center'>Sign in</h3>

            <SigninForm />

            <Link href='/reset-password'>
              <a className='block mt-2 text-center'>Reset your password</a>
            </Link>
          </div>
        </Layout>
      </section>
    </>
  );
}

export default SigninPage;
