
import { useEffect, useState } from 'react';

import { editBookmarkInLocalStorage, removeBookmarkFromLocalStorage } from '../bookmarks/bookmarks'

export default function EditBookmarkCategory ({ toggleModal, category, setBookmarks }) {
    const [ newBookmarkCategory, setNewBookmarkCategory ] = useState({
        category: '',
        bookmarks: [],
        unaddedBookmarks: []
    });
    const [ allBookmarks, setAllBookmarks ] = useState([]);
    useEffect(() => {
        setAllBookmarks(JSON.parse(localStorage.getItem('bookmarks')).all);
        setNewBookmarkCategory({
            category: category,
            bookmarks: JSON.parse(localStorage.getItem('bookmarks'))[category],
            unaddedBookmarks: [],
        });
    }, []);

    const handleInputChange = (event) => {
        setNewBookmarkCategory(previousNewBookmarkCategory => ({
            ...previousNewBookmarkCategory,
            [ event.target.id ]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

         newBookmarkCategory.bookmarks.forEach(bookmark => {
            const bookmarkObject = {
                ...bookmark,
                category:  newBookmarkCategory.category
            }

            editBookmarkInLocalStorage({ bookmark: bookmarkObject, setBookmarks, previousCategory: category });
        });

        newBookmarkCategory.unaddedBookmarks.forEach(bookmark => { 
            const bookmarkObject = {
                ...bookmark,
                category:  newBookmarkCategory.category
            }
            removeBookmarkFromLocalStorage({ bookmark: bookmarkObject, setBookmarks, category: newBookmarkCategory.category });
        });

        toggleModal();
    } 

    const addBookmark = (bookmark) => {
        if (newBookmarkCategory.bookmarks.find(newBookmark => newBookmark.link === bookmark.link)) {
            return;
        }

        let cloneNewBookmarkCategory = JSON.parse(JSON.stringify(newBookmarkCategory));
        cloneNewBookmarkCategory.bookmarks.push(bookmark);

        setNewBookmarkCategory(previousNewBookmarkCategory => ({
            ...previousNewBookmarkCategory,
            bookmarks: cloneNewBookmarkCategory.bookmarks
        }));
    }

    const unaddBookmark = (bookmark) => {
        let cloneNewBookmarkCategory = JSON.parse(JSON.stringify(newBookmarkCategory));
        const bookmarkIndex = cloneNewBookmarkCategory.bookmarks.findIndex(newBookmarkCategory => newBookmarkCategory.link === bookmark.link);

        cloneNewBookmarkCategory.bookmarks.splice(bookmarkIndex, 1);
        cloneNewBookmarkCategory.unaddedBookmarks.push(bookmark);

        setNewBookmarkCategory(previousNewBookmarkCategory => ({
            ...previousNewBookmarkCategory,
            bookmarks: cloneNewBookmarkCategory.bookmarks,
            unaddedBookmarks: cloneNewBookmarkCategory.unaddedBookmarks
        }));
    }

    const [ filter, setFilter ] = useState('');
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    return (
        <form
            onSubmit={ handleSubmit }
            className="flex flex-direction-column align-items-start">
            <label
                htmlFor="category"
                className="mb-05">
                bookmark category
            </label>
            <input
                type="text"
                autoComplete="off"
                id="category"
                placeholder="category"
                value={ newBookmarkCategory.category }
                onChange={ handleInputChange }
                className="input input-form mb-1"
                required />

            <label
                htmlFor="filter"
                className="mb-05">
                filter bookmarks
            </label>
            <input
                type="text"
                autoComplete="off"
                id="filter"
                placeholder="filter"
                value={ filter }
                onChange={ handleFilterChange } 
                className="input input-form mb-1" />

            <div className="all-bookmarks-form">
                { allBookmarks.filter(bookmark => bookmark.title.toLowerCase().trim().includes(filter.toLowerCase().trim())).map((bookmark, index) => {
                    return (
                            <div key={ index }>
                                <p className="mt-2 mb-1">
                                    { bookmark.title }
                                </p>
                                <p className="mt-1 mb-2">
                                    { bookmark.description }
                                </p>

                                { newBookmarkCategory.bookmarks.find(newBookmark => newBookmark.link === bookmark.link) ? (
                                    <button
                                        type="button"
                                        className="button button-pink button-min-width mr-1"
                                        onClick={ () => unaddBookmark(bookmark) }>unadd</button>
                                ) : (
                                    <button
                                        type="button"
                                        className="button button-light-blue button-min-width"
                                        onClick={ () => addBookmark(bookmark) }>add</button>
                                ) }
                            </div>
                        );
                }) }
            </div>

            
            <div className="align-self-end">
                <button
                    type="button"
                    onClick={ toggleModal }
                    className="button button-pink button-min-width mr-1">
                    cancel
                </button>
                <button className="button button-green button-min-width">
                    edit
                </button>
            </div>
        </form>
    );
}