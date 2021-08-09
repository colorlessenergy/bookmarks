export default function AddBookmark () {
    return (
        <form
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
                className="input input-form textarea mb-2 pt-1"></textarea>
            
            <div className="align-self-end">
                <button
                    type="button"
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