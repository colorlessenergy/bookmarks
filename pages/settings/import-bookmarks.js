import Nav from "../../shared/components/Nav";

import { addBookmarkToLocalStorage } from "../../shared/bookmarks/bookmarks";

export default function ImportBookmarks () {
    const importBookmarks = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const importedBookmarks = e.target.result;
            const parser = new DOMParser();
            const parsedHTML = parser.parseFromString(importedBookmarks, "text/html");
            let bookmarks = parsedHTML.querySelectorAll('a');
            bookmarks.forEach(bookmark => {
                let bookmarkObject = {
                    link: bookmark.href,
                    title: bookmark.innerText,
                    description: '',
                    category: 'all'
                }
                addBookmarkToLocalStorage({ bookmark: bookmarkObject })
            });
        }

        reader.readAsText(event.target.files[0]);
    }
    
    const setValueToNull = event => { 
        event.target.value = null;
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
                onClick={ setValueToNull }
                className="d-none" />
        </div>
    );
}