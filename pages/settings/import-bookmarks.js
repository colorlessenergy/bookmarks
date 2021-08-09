import Nav from "../../shared/components/Nav";

export default function ImportBookmarks () {
    return (
        <div className="container">
            <Nav showHomeLink={ true } />

            <h1 className="mb-1">
                import bookmarks
            </h1>

            <label
                htmlFor="import-bookmarks"
                className="button button-blue d-inline-block"
                title="import bookmarks">import</label>
            <input
                type="file"
                id="import-bookmarks"
                accept=".html"
                className="d-none" />
        </div>
    );
}