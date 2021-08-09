import { useEffect, useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';

export default function Home () {
    let [ bookmarks, setBookmarks ] = useState([])

    useEffect(() => {
        setBookmarks(JSON.parse(localStorage.getItem('bookmarks')));
    }, []);

    return (
        <div className="container">
            <Head>
                <title>bookmarks</title>
                <meta name="description" content="bookmarks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />

            { bookmarks ? Object.keys(bookmarks).map((bookmarkKey, index) => {
                return (
                    <div key={ index }>
                        <div>
                            { bookmarkKey }
                        </div>
                       { bookmarks[bookmarkKey].map((bookmark, bookmarkIndex) => {
                           return (
                                <div key={ bookmarkIndex }>
                                    <p>
                                        { bookmark.title }
                                    </p>
                                    <p>
                                        { bookmark.description }
                                    </p>

                                    <div>
                                        <button>remove</button>
                                        <button>edit</button>
                                    </div>
                                </div> 
                            )
                       }) } 
                    </div>
                );
            }) : (null) }
        </div>
    );
}
