import Head from 'next/head';
import Link from 'next/link';

import JoinForm from '../components/forms/join';
import Layout from '../components/layouts/layout';

function JoinPage() {
  return (
    <>
      <Head>
        <title>Join as a donor - The Red Bag</title>
      </Head>
      <section>
        <Layout className='max-w-xl bg-white shadow-md mt-10 border border-red-600 rounded-xl'>
          <div className='p-8'>
            <h3 className='text-3xl font-medium mb-5 text-center'>
              Join as a donor
            </h3>

            <JoinForm />

            <Link href='/signin'>
              <a className='block mt-2 text-center'>Already have an account?</a>
            </Link>
          </div>
        </Layout>
      </section>
    </>
  );
}

export default JoinPage;
