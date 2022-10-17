import Head from 'next/head';
import Hero from '../components/hero';

function IndexPage() {
  return (
    <>
      <Head>
        <title>The Red Bag - Donate blood, save life.</title>
      </Head>
      <div>
        <Hero />
      </div>
    </>
  );
}

export default IndexPage;
