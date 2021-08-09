import Nav from "../../shared/components/Nav";

export default function ImportBookmarks () {
    const importBookmarks = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const importedBookmarks = e.target.result;
            const parser = new DOMParser();
            const parsedHTML = parser.parseFromString(importedBookmarks, "text/html");
            let bookmarks = parsedHTML.querySelectorAll('a');
        }

        reader.readAsText(event.target.files[0]);
    }
    
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
                onChange={ importBookmarks }
                className="d-none" />
        </div>
    );
}