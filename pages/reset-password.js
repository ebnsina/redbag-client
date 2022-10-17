import Head from 'next/head';
import ResetPassword from '../components/forms/reset-password';

import Layout from '../components/layouts/layout';

function ResetPasswordPage() {
  return (
    <>
      <Head>
        <title>Sign in - The Red Bag</title>
      </Head>
      <section>
        <Layout className='max-w-xl bg-white shadow-md mt-10 border border-red-600 rounded-xl'>
          <div className='p-8'>
            <h3 className='text-3xl font-medium mb-5 text-center'>
              Reset your password
            </h3>

            <ResetPassword />
          </div>
        </Layout>
      </section>
    </>
  );
}

export default ResetPasswordPage;
