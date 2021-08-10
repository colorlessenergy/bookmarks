import { editBookmark } from '../../bookmarks/bookmarks';

export default function EditBookmark ({ editingBookmark, setEditingBookmark, setBookmarks, toggleModal }) {
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
                value={ editingBookmark.link }
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
                value={ editingBookmark.title }
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
    );
}