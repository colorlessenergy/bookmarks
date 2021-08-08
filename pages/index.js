import Head from 'next/head';

import Nav from '../shared/components/Nav';

export default function Home () {
  return (
    <div>
      <Head>
        <title>bookmarks</title>
        <meta name="description" content="bookmarks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
    </div>
  );
}
