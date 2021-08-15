import { useEffect, useState } from 'react';

export default function AddBookmark ({ toggleModal, setBookmarks }) {
    const [ newBookmark, setNewBookmark ] = useState({
        category: '',
        bookmarks: []
    });

    const handleInputChange = (event) => {
        setNewBookmark(previousNewBookmark => ({
            ...previousNewBookmark,
            [ event.target.id ]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        addBookmark({ bookmark: bookmarkObject, setBookmarks });
        toggleModal();
    }

    const [ allBookmarks, setAllBookmarks ] = useState([]);
    useEffect(() => {
        setAllBookmarks(JSON.parse(localStorage.getItem('bookmarks')).all);
    }, []);

    const addBookmark = (bookmark) => {
        if (newBookmark.bookmarks.find(newBookmark => newBookmark.link === bookmark.link)) {
            return;
        }

        let cloneNewBookmark = JSON.parse(JSON.stringify(newBookmark));
        cloneNewBookmark.bookmarks.push(bookmark);

        setNewBookmark(previousNewBookmark => ({
            ...previousNewBookmark,
            bookmarks: cloneNewBookmark.bookmarks
        }));
    }

    const unaddBookmark = (bookmark) => {
        let cloneNewBookmark = JSON.parse(JSON.stringify(newBookmark));
        const bookmarkIndex = cloneNewBookmark.bookmarks.findIndex(newBookmark => newBookmark.link === bookmark.link);
        cloneNewBookmark.bookmarks.splice(bookmarkIndex, 1);

        setNewBookmark(previousNewBookmark => ({
            ...previousNewBookmark,
            bookmarks: cloneNewBookmark.bookmarks
        }));
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
                value={ newBookmark.category }
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
                className="input input-form mb-1" />

            <div className="all-bookmarks-form">
                { allBookmarks.map((bookmark, index) => {
                    return (
                            <div key={ index }>
                                <p className="mt-2 mb-1">
                                    { bookmark.title }
                                </p>
                                <p className="mt-1 mb-2">
                                    { bookmark.description }
                                </p>

                                { newBookmark.bookmarks.find(newBookmark => newBookmark.link === bookmark.link) ? (
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
                <button className="button button-light-blue button-min-width">
                    add
                </button>
            </div>
        </form>
    );
}