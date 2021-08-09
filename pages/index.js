import { useEffect, useState } from 'react';
import Head from 'next/head';

import Nav from '../shared/components/Nav';
import Modal from '../shared/components/Modal';

import { editBookmark } from '../shared/bookmarks/bookmarks';

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

    const handleInputChange = (event) => {
        setEditingBookmark(previousEditingBookmark => ({
            ...previousEditingBookmark,
            [ event.target.id ]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        editBookmark({ editingBookmark, setBookmarks });
        toggleModal();
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
                        <div className="text-large text-bold word-break">
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
                                        onClick={ () => openEditBookmarkModal({ bookmark, bookmarkIndex }) }>edit</button>
                                </div>
                            )
                       }) } 
                    </div>
                );
            }) : (null) }

            <Modal isOpen={ isModalOpen }>
                <form
                    onSubmit={ handleSubmit } 
                    className="flex flex-direction-column align-items-start">
                    <label
                        htmlFor="link"
                        className="mb-05">
                        URL
                    </label>
                    <input
                        type="text"
                        autoComplete={ false }
                        id="link"
                        value={ editingBookmark.link }
                        onChange={ handleInputChange }
                        className="input input-form mb-1" />
                    <label
                        htmlFor="title"
                        className="mb-05">
                        title
                    </label>
                    <input
                        type="text"
                        autoComplete={ false }
                        id="title"
                        value={ editingBookmark.title }
                        onChange={ handleInputChange }
                        className="input input-form mb-1" />

                    <label
                        htmlFor="description"
                        className="mb-05">
                        description
                    </label>
                    <textarea
                        type="text"
                        autoComplete={ false }
                        id="description"
                        value={ editingBookmark.description }
                        onChange={ handleInputChange }
                        className="input input-form textarea mb-2 pt-1"></textarea>
                    
                    <div className="align-self-end">
                        <button
                            type="button"
                            onClick={ toggleModal }
                            className="button button-pink button-min-width mr-1">
                            cancel
                        </button>
                        <button
                            className="button button-green button-min-width">
                            edit
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
