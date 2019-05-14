import Head from 'next/head';
import Index from '../components/Index';

const Home = () => (
  <>
    <Head>
      <title>Herb's GitHub User Search!</title>
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
    </Head>
    <Index />
  </>
);

export default Home;
