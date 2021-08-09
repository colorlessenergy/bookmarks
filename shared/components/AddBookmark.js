import { useState } from 'react';

import { addBookmark } from "../bookmarks/bookmarks";

export default function AddBookmark ({ toggleModal, setBookmarks }) {
    const [ bookmark, setBookmark ] = useState({
        link: '',
        title: '',
        description: '',
    });

    const handleInputChange = (event) => {
        setBookmark(previousBookmark => ({
            ...previousBookmark,
            [ event.target.id ]: event.target.value
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const websiteRegex = /\/[a-z.]+\//;
        if (bookmark.link.match(websiteRegex) === null) {
            return;
        }

        let bookmarkObject = {
            ...bookmark,
            website: bookmark.link.match(websiteRegex)[0]
        }

        addBookmark({ bookmark: bookmarkObject, setBookmarks });
        toggleModal();
    }

    return (
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
                autoComplete="off"
                id="link"
                value={ bookmark.link }
                onChange={ handleInputChange }
                className="input input-form mb-1"
                required />

            <label
                htmlFor="title"
                className="mb-05">
                title
            </label>
            <input
                type="text"
                autoComplete="off"
                id="title"
                value={ bookmark.title }
                onChange={ handleInputChange }
                className="input input-form mb-1"
                required />

            <label
                htmlFor="description"
                className="mb-05">
                description
            </label>
            <textarea
                type="text"
                autoComplete="off"
                id="description"
                value={ bookmark.description }
                onChange={ handleInputChange }
                className="input input-form textarea mb-2 pt-1"></textarea>
            
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