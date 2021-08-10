import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Nav from '../shared/components/Nav';
import Modal from '../shared/components/Modal';
import EditBookmark from '../shared/components/EditBookmark/EditBookmark';
import AddBookmark from '../shared/components/AddBookmark';

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

        setEditingBookmark({
            link: '',
            title: '',
            description: '',
            website: '',
            index: null
        });
    }

    const [ editingBookmark, setEditingBookmark ] = useState({
        link: '',
        title: '',
        description: '',
        website: '',
        index: null
    });

    const openEditBookmarkModal = ({ bookmark, bookmarkIndex }) => {
        toggleModal();

        setEditingBookmark({
            link: bookmark.link,
            title: bookmark.title,
            description: bookmark.description,
            website: bookmark.website,
            index: bookmarkIndex
        });
    }

    const [ isAddBookmarkModalOpen, setIsAddBookmarkModalOpen ] = useState(false);
    const toggleAddBookmarkModal = () => {
        setIsAddBookmarkModalOpen(previousIsAddBookmarkModalOpen => !previousIsAddBookmarkModalOpen);
    }


    const [ searchValue, setSearchValue ] = useState('');
    const handleFilterChange = (event) => {
        setSearchValue(event.target.value);
    }

    const filterByBookmarkTitleOrDescription = (bookmark) => {
        return bookmark.title.toLowerCase().includes(searchValue.toLowerCase().trim()) || bookmark.description.toLowerCase().includes(searchValue.toLowerCase().trim());
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
                    onChange={ handleFilterChange } 
                    className="input"
                    placeholder="filter..." />
                <button
                    className="button button-light-blue button-min-width ml-1"
                    onClick={ toggleAddBookmarkModal }>add</button>
            </div>

            { bookmarks ? Object.keys(bookmarks).map((bookmarkKey, index) => {
                if (bookmarks[bookmarkKey].filter(filterByBookmarkTitleOrDescription).length === 0) {
                    return null;
                }

                return (
                    <div
                        key={ index }
                        className="bookmark-card">
                        <div className="text-large text-bold word-break">
                            { bookmarkKey.replace('/', '').replace('www.', '') }
                        </div>
                       { bookmarks[bookmarkKey].filter(filterByBookmarkTitleOrDescription).map((bookmark, bookmarkIndex) => {
                           return (
                                <div key={ bookmarkIndex }>
                                    <Link href={ bookmark.link }>
                                        <a className="text-decoration-none">
                                            <p className="mt-2 mb-1">
                                                { bookmark.title }
                                            </p>
                                            <p className="mt-1 mb-2">
                                                { bookmark.description }
                                            </p>
                                        </a> 
                                    </Link>

                                    <button
                                        className="button button-pink button-min-width mr-1"
                                        onClick={ () => removeBookmark({ website: bookmarkKey, index: bookmarkIndex }) }>remove</button>
                                    <button
                                        className="button button-green button-min-width"
                                        onClick={ () => openEditBookmarkModal({ bookmark, bookmarkIndex }) }>edit</button>
                                </div>
                            )
                       }) } 
                    </div>
                );
            }) : (null) }

            <Modal isOpen={ isModalOpen }>
                <EditBookmark
                    editingBookmark={ editingBookmark }
                    setEditingBookmark={ setEditingBookmark }
                    setBookmarks={ setBookmarks }
                    toggleModal={ toggleModal } />
            </Modal>

            { isAddBookmarkModalOpen ? (
                <Modal isOpen={ isAddBookmarkModalOpen }>
                    <AddBookmark
                        toggleModal={ toggleAddBookmarkModal }
                        setBookmarks={ setBookmarks } /> 
                </Modal>
            ) : (null) }
        </div>
    );
}
