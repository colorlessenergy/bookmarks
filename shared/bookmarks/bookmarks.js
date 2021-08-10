/**
 * 
 * add a single bookmark to bookmarks in localStorage
 * 
 * @param { Object } bookmark - bookmark object
 * @param { String } bookmark.website- website name of bookmark link
 * @param { String } bookmark.link - link to bookmark
 * @param { String } bookmark.description - description of bookmark
 * @param { String } bookmark.title - title of bookmark
 * @param { Function } setBookmark - set bookmarks to rerender
 */

export function addBookmark ({ bookmark, setBookmarks }) {
    if (!localStorage.getItem('bookmarks')) {
        localStorage.setItem('bookmarks', JSON.stringify({}));
    }

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if (bookmarks[bookmark.website]) {
        let isNewBookmark = true;
        for (let i = 0; i < bookmarks[bookmark.website].length; i++) {
            if (bookmarks[bookmark.website][i].link === bookmark.link) {
                isNewBookmark = false;
                break;
            }
        }

        if (isNewBookmark) {
            bookmarks[bookmark.website].push(bookmark);
        }
    } else {
        bookmarks[bookmark.website] = [ bookmark ];
    }

    if (setBookmarks) {
        setBookmarks(bookmarks);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

/**
 * 
 * @param { Object } bookmark - object with information about the bookmark that was edited
 * @param { String } bookmark.link - updated link
 * @param { String } bookmark.title - updated title
 * @param { String } bookmark.description - updated description
 * @param { String } bookmark.website - updated website
 * @param { String } bookmark.index - bookmark index in array 
 */

export function editBookmark ({ editingBookmark : bookmark , setBookmarks }) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    bookmarks[bookmark.website][bookmark.index] = {
        link: bookmark.link,
        title: bookmark.title,
        description: bookmark.description,
        website: bookmark.website,
    }

    setBookmarks(bookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}