import { useEffect, useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import Modal from '../shared/components/Modal';

export default function Home () {
    let [ bookmarks, setBookmarks ] = useState({})

    useEffect(() => {
        setBookmarks(JSON.parse(localStorage.getItem('bookmarks')));
    }, []);

    const removeBookmark = ({ website, index }) => {
        let cloneBookmarks = JSON.parse(JSON.stringify(bookmarks));
        cloneBookmarks[website].splice(index, 1);

        setBookmarks(cloneBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(cloneBookmarks));
    }

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(previousIsModalOpen => !previousIsModalOpen);
    }

    return (
        <div className="container">
            <Head>
                <title>bookmarks</title>
                <meta name="description" content="bookmarks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav />

            <div className="flex justify-content-between align-items-center mb-2">
                <input
                    type="text"
                    className="input"
                    placeholder="filter..." />
                <button className="button button-light-blue button-min-width ml-1">add</button>
            </div>

            { bookmarks ? Object.keys(bookmarks).map((bookmarkKey, index) => {
                if (bookmarks[bookmarkKey].length === 0) {
                    return null;
                }

                return (
                    <div
                        key={ index }
                        className="bookmark-card">
                        <div className="text-large text-bold">
                            { bookmarkKey }
                        </div>
                       { bookmarks[bookmarkKey].map((bookmark, bookmarkIndex) => {
                           return (
                                <div key={ bookmarkIndex }>
                                    <p className="mt-2 mb-1">
                                        { bookmark.title }
                                    </p>
                                    <p className="mt-1 mb-2">
                                        { bookmark.description }
                                    </p>

                                    <button
                                        className="button button-pink button-min-width mr-1"
                                        onClick={ () => removeBookmark({ website: bookmarkKey, index: bookmarkIndex }) }>remove</button>
                                    <button
                                        className="button button-green button-min-width"
                                        onClick={ toggleModal }>edit</button>
                                </div> 
                            )
                       }) } 
                    </div>
                );
            }) : (null) }

            <Modal isOpen={ isModalOpen }>
                <h1>
                    modal
                </h1>
            </Modal>
        </div>
    );
}
