const form = document.querySelector('#myForm');
let siteName = document.querySelector('#siteName');
let siteURL = document.querySelector('#siteUrl');
let resultDiv = document.querySelector('#bookmarksResults');
let bookmarks = getLocalData();


function getLocalData() {
    let bookmarks = '';
    if (localStorage.getItem('bookmarks') === null) {
        bookmarks = [];
    } else {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    }
    return bookmarks;
}

function saveToStorage(bookmark) {
    let bookmarkArr = '';
    if (localStorage.getItem('bookmarks') === null) {
        bookmarkArr = [];
        bookmarkArr.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkArr));
    } else {
        bookmarkArr = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarkArr.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkArr));
    }
}

function bookmarkSite(e) {
    e.preventDefault();
    let bookmarkObj = createObject(siteName.value, siteURL.value);
    if (bookmarkObj) {
        bookmarks.push(bookmarkObj);
        saveToStorage(bookmarkObj);
        getBookmarks(bookmarks);
    }
    this.reset();
}

function getBookmarks(bookmarks) {
    resultDiv.innerHTML = '';
    if (bookmarks.length > 0) {
        bookmarks.map(bookmark => {
            resultDiv.innerHTML += `<div class='well'>
            <a href='${bookmark.URL}' class='btn btn-primary btn-sm mb-1' target='_blank'>${bookmark.name}</a>
            <a onclick="deleteLink(${bookmark.id})" class='btn btn-danger btn-sm'>Delete</a>`;
        });
    }
};

function deleteLink(id) {
    let linkId = Number.parseInt(id);
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let filteredBookmarks = bookmarks.filter(bookmark => bookmark.id !== linkId);
    localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
    if (filteredBookmarks.length == 0) {
        location.reload();
    }
    getBookmarks(filteredBookmarks);
}

getBookmarks(bookmarks);

function createObject(name, URL) {
    let id = new Date().getMilliseconds();
    if (name.length <= 0 || URL.length <= 0) {
        alert('Empty Fields Not Allowed!');
    } else {
        return { id: id, name, URL };
    }
}

form.addEventListener('submit', bookmarkSite);
