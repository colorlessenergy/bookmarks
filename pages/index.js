import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Nav from '../shared/components/Nav';
import Modal from '../shared/components/Modal';
import EditBookmark from '../shared/components/EditBookmark/EditBookmark';
import AddBookmarkCategory from '../shared/components/AddBookmarkCategory';
import EditBookmarkCategory from '../shared/components/EditBookmarkCategory';

import { removeBookmarkFromLocalStorage } from '../shared/bookmarks/bookmarks';

export default function Home () {
    let [ bookmarks, setBookmarks ] = useState(null);

    useEffect(() => {
        setBookmarks(JSON.parse(localStorage.getItem('bookmarks')));
    }, []);

    const [ isEditBookmarkModalOpen, setIsEditBookmarkModalOpen ] = useState(false);
    const toggleEditBookmarkModal = () => {
        setIsEditBookmarkModalOpen(previousIsEditBookmarkModalOpen => !previousIsEditBookmarkModalOpen);

        setEditingBookmark({
            link: '',
            title: '',
            description: '',
            category: '',
            index: null
        });
    }

    const [ editingBookmark, setEditingBookmark ] = useState({
        link: '',
        title: '',
        description: '',
        category: '',
        index: null
    });

    const openEditBookmarkModal = ({ bookmark, bookmarkIndex }) => {
        toggleEditBookmarkModal();

        setEditingBookmark({
            link: bookmark.link,
            title: bookmark.title,
            description: bookmark.description,
            category: bookmark.category,
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

    const deleteBookmarkCategory = (bookmarkCategory) => {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        delete bookmarks[ bookmarkCategory ];
        setBookmarks(bookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    const [ isEditBookmarkCategoryModalOpen, setIsEditBookmarkCategoryModalOpen ] = useState(false);
    const toggleEditBookmarkCategoryModal = (category) => {
        setEditingBookmarkCategory(category)
        setIsEditBookmarkCategoryModalOpen(previousIsEditBookmarkCategoryModalOpen => !previousIsEditBookmarkCategoryModalOpen);
    }

    const [ editBookmarkCategory, setEditingBookmarkCategory ] = useState('');

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

            { bookmarks && Object.keys(bookmarks).length ? Object.keys(bookmarks).map((bookmarkKey, index) => {
                if (bookmarks[bookmarkKey].filter(filterByBookmarkTitleOrDescription).length === 0 ||
                    Object.keys(bookmarks).length > 1 && bookmarkKey === 'all') {
                    return null;
                }

                return (
                    <div
                        key={ index }
                        className="bookmark-card">
                        <div className="flex justify-content-between">
                            <div className="text-large text-bold word-break">
                                { bookmarkKey }
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={ () => deleteBookmarkCategory(bookmarkKey) }
                                    className="button button-pink button-min-width mr-1">
                                    delete
                                </button>
                                <button 
                                    type="button"
                                    onClick={ () => toggleEditBookmarkCategoryModal(bookmarkKey) }
                                    className="button button-green button-min-width">
                                    edit
                                </button>
                            </div>
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
                                        onClick={ () => removeBookmarkFromLocalStorage({ bookmark, setBookmarks, category: bookmarkKey }) }>remove</button>
                                    <button
                                        className="button button-green button-min-width"
                                        onClick={ () => openEditBookmarkModal({ bookmark, bookmarkIndex }) }>edit</button>
                                </div>
                            )
                       }) } 
                    </div>
                );
            }) : (
                <div className="text-center">
                    <Link href="/settings/import-bookmarks">
                        <a className="text-large text-bold">
                            import bookmarks
                        </a>
                    </Link>
                </div>
            ) }

            { isEditBookmarkModalOpen ? (
                <Modal isOpen={ isEditBookmarkModalOpen }>
                    <EditBookmark
                        editingBookmark={ editingBookmark }
                        setEditingBookmark={ setEditingBookmark }
                        setBookmarks={ setBookmarks }
                        toggleModal={ toggleEditBookmarkModal } />
                </Modal>
            ) : (null) }

            { isAddBookmarkModalOpen ? (
                <Modal isOpen={ isAddBookmarkModalOpen }>
                    <AddBookmarkCategory
                        toggleModal={ toggleAddBookmarkModal }
                        setBookmarks={ setBookmarks } /> 
                </Modal>
            ) : (null) }

            { isEditBookmarkCategoryModalOpen ? (
                <Modal isOpen={ isEditBookmarkCategoryModalOpen }>
                    <EditBookmarkCategory
                        toggleModal={ toggleEditBookmarkCategoryModal }
                        category={ editBookmarkCategory }
                        setBookmarks={ setBookmarks } />
                </Modal>
            ) : (null) }
        </div>
    );
}
