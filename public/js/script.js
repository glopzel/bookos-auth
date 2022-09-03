const deleteBtn = document.querySelectorAll('.delete');
const readBtn = document.querySelectorAll('.read');
const unreadBtn = document.querySelectorAll('.unread');

Array.from(readBtn).forEach(element => {
    element.addEventListener('click', markRead)
})

Array.from(unreadBtn).forEach(element => {
    element.addEventListener('click', markUnread)
})

Array.from(deleteBtn).forEach(element => {
    element.addEventListener('click', deleteBook)
})

async function markRead() {
    // get the mongo id
    // const bookID = this.parentNode.parentNode.childNodes[3].dataset.id
    const bookID = this.parentNode.parentNode.dataset.id
    // console.log(this.parentNode.parentNode.dataset.id)

    try {
        const response = await fetch('books/markRead', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                bookReadID: bookID
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function markUnread() {
    // const bookID = this.parentNode.parentNode.childNodes[3].dataset.id
    const bookID = this.parentNode.parentNode.dataset.id

    try {
        const response = await fetch('books/markUnread', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                bookReadID: bookID
            })
        })
        const data = await response.json()
        location.reload()
    } catch(err) {
        console.log(err)
    }
}

async function deleteBook() {
    // const bookID = this.parentNode.parentNode.childNodes[3].dataset.id
    const bookID = this.parentNode.parentNode.dataset.id

    try {
        const response = await fetch('books/deleteBook', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                bookDeleteID: bookID
            })
        })
        const data = await response()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}