import Nav from "../../shared/components/Nav";

export default function ImportBookmarks () {
    return (
        <div className="container">
            <Nav showHomeLink={ true } />

            <h1 className="mb-1">
                import bookmarks
            </h1>
            <button
                className="button button-blue"
                title="import bookmarks">import</button>
        </div>
    );
}