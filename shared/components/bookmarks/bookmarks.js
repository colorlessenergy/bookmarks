/**
 * 
 * add a single bookmark to bookmarks in localStorage
 * 
 * @param { Object } bookmark - bookmark object
 * @param { String } bookmark.website- website name of bookmark link
 * @param { String } bookmark.link - link to bookmark
 * @param { String } bookmark.title - title of bookmark
 */

export default function addBookmark (bookmark) {
    if (!localStorage.getItem('bookmarks')) {
        localStorage.setItem('bookmarks', JSON.stringify({}));
    }

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if (bookmarks[bookmark.website]) {
        let isNewBookmark = true;
        for (let i = 0; i < bookmarks.length; i++) {
            if (bookmarks[i].link === bookmark.link) {
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


    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}