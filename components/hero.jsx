import Link from 'next/link';
import Lottie from 'lottie-react';

import blood from '../assets/blood.json';
import Layout from './layouts/layout';

function Hero() {
  return (
    <section className='bg-white py-48'>
      <Layout className='grid md:grid-cols-2 md:gap-8'>
        <div>
          <h2 className='text-6xl font-semibold mb-5'>
            Donate blood, Save Life.
          </h2>
          <p className='mb-8'>
            The Red Bag - is a real time free blood donation platform to help
            people to get blood as close as possible around the Bangladesh.
          </p>
          <Link href='/home'>
            <a className='px-8 py-4 text-xl font-medium border border-transparent bg-red-600 text-white inline-block rounded-xl transition hover:bg-transparent hover:text-red-600 hover:border-red-600 focus:ring focus:ring-rose-600'>
              Explore Bags
            </a>
          </Link>
        </div>
        <div>
          <Lottie animationData={blood} loop={true} />
        </div>
      </Layout>
    </section>
  );
}

export default Hero;
