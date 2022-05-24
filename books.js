const addBook = document.querySelector("#addBook");
const table = document.querySelector("#tabulka");
const plusBookButton = document.querySelector("#dpbtn");
const content = document.querySelector("#content");
const readButton = document.querySelector("#read");

const sortButton = document.querySelector("#sortButton");
const contentSort = document.querySelector("#sortContent");
const authorSort = document.querySelector("#sortAuthor");
const titleSort = document.querySelector("#sortTitle");
const pagesSort = document.querySelector("#sortPages");
const readSort = document.querySelector("#sortRead");

function book(author, title, pages, read) {
    this.author = author
    this.title = title;
    this.pages = pages; 
    this.read = read;

    this.addBookToLibrary = addBookToLibrary();
    this.updateTable = updateTable();
}


let myLibrary = [];
addBookToLibrary();

// sort
let sortCounter = 1;
sortButton.addEventListener("click", () => {
    if(sortCounter === 1) {
        contentSort.style.display = "block";
        sortCounter = 0;
    }else{
        contentSort.style.display = "none";
        sortCounter = 1;
    }
})


let a
let authorCounter = 0;
let titleCounter = 0;
let readCounter = 0;
authorSort.addEventListener("click", () => {
    a = 0;
    if(authorCounter === 0) {
        sortTable();
        authorCounter = 1;
    } else {
        sortTableBackwards();
        authorCounter = 0;
    }
});   

titleSort.addEventListener("click", () => {
    a = 1;
    if(titleCounter === 0) {
        sortTable();
        titleCounter = 1;
    } else {
        sortTableBackwards();
        titleCounter = 0;
    }
});  

pagesSort.addEventListener("click", () => {
    a = 2;
    if(readCounter === 0) {
        sortTable();
        readCounter = 1;
    } else {
        sortTableBackwards();
        readCounter = 0;
    }
});    

readSort.addEventListener("click", () => {
    a = 3;
    if(readCounter === 0) {
        sortTable();
        readCounter = 1;
    } else {
        sortTableBackwards();
        readCounter = 0;
    }
});     

// readButton
readButton.addEventListener("click", () => {
    let value = readButton.value;
    if(value == "YES"){
        document.querySelector("#read").value = "NO";
        readButton.innerHTML = "NO";
        readButton.setAttribute("style", "background-color:#fc9292");
    }else{
        document.querySelector("#read").value = "YES";
        readButton.innerHTML = "YES";
        readButton.setAttribute("style", "background-color:#8bfc68");
    }
})

let displayAttribute = 1;
plusBookButton.addEventListener("click", () => {
    if(displayAttribute === 1) {
        content.style.display = "block";
        displayAttribute = 2;
    }else{
        content.style.display = "none";
        displayAttribute = 1;
    }
})



function addBookToLibrary() {
    addBook.addEventListener("click", () => {
        let Author = document.querySelector("#author").value;
        let Title = document.querySelector("#title").value;
        let Pages = document.querySelector("#pages").value;
        let Read = readButton.value;
        if(Author === "" || Title === "") {return}

        let newBook = Object.create(book)
        newBook.author = Author;
        newBook.title = Title;
        newBook.pages = Pages;
        newBook.read = Read;
        myLibrary.push(newBook)
        updateTable();
        author.value = "";
        title.value = "";
        pages.value = "";
    }) 
}

function updateTable() {
    const newRow = document.createElement("tr");
    const specificAuthor = document.createElement("td");
    const specificTitle = document.createElement("td");
    const specificPages = document.createElement("td");
    let isRead = document.createElement("td");
    let removeButton = document.createElement("button");
    const changeStatus = document.createElement("td")
    let changeStatusButton = document.createElement("button");

    // set background color - depends if read or not
    if(readButton.value === "YES"){
        specificAuthor.setAttribute("style", "background-color:#a9ff81");
        specificTitle.setAttribute("style", "background-color:#a9ff81");
        specificPages.setAttribute("style", "background-color:#a9ff81");
        isRead.setAttribute("style", "background-color:#a9ff81");

    } else {
        specificAuthor.setAttribute("style", "background-color:#fc9898");
        specificTitle.setAttribute("style", "background-color:#fc9898");
        specificPages.setAttribute("style", "background-color:#fc9898");
        isRead.setAttribute("style", "background-color:#fc9898");
    }
    
    // adding new book
    table.appendChild(newRow);
    newRow.appendChild(specificAuthor);
    newRow.appendChild(specificTitle);
    newRow.appendChild(specificPages);
    newRow.appendChild(isRead);
    newRow.appendChild(removeButton);
    newRow.appendChild(changeStatus);
    changeStatus.appendChild(changeStatusButton)

    myLibrary.forEach(books => {
        for(let key in books) {
            if(key === "author") {
                specificAuthor.innerHTML = books[key]
            }else if(key === "title") {
                specificTitle.innerHTML = books[key]
            }else if(key === "pages") {
                specificPages.innerHTML = books[key]
            } else {
                isRead.innerHTML = readButton.value;
            }
        }
    });
    //button for removing a book
    removeButton.innerHTML = "Remove";
    removeButton.setAttribute("style", "padding:5px; width: 80px; height: 35px")
    removeButton.addEventListener("click", () => {
        table.removeChild(newRow);
    })

    //button for changing read/unread status
    changeStatusButton.innerHTML = "CHANGE";
    let statusRead = 1;
    changeStatus.addEventListener("click", () => {
        if(statusRead === 1) {
            isRead.innerHTML = "NO";
            specificAuthor.setAttribute("style", "background-color:#fc9898");
            specificTitle.setAttribute("style", "background-color:#fc9898");
            specificPages.setAttribute("style", "background-color:#fc9898");
            isRead.setAttribute("style", "background-color:#fc9898");
            statusRead = 2;
        } else {
            isRead.innerHTML = "YES";
            specificAuthor.setAttribute("style", "background-color:#a9ff81");
            specificTitle.setAttribute("style", "background-color:#a9ff81");
            specificPages.setAttribute("style", "background-color:#a9ff81");
            isRead.setAttribute("style", "background-color:#a9ff81");
            statusRead = 1;
        }
    })


}

function sortTable() {
    let  rows, switching, i, shouldSwitch, firstElement, lastElement;
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        firstElement = rows[i].getElementsByTagName("TD")[a];
        lastElement = rows[i + 1].getElementsByTagName("TD")[a];
        if (firstElement.innerHTML.toLowerCase() > lastElement.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
        }
    }
    if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
    }
    }
}


function sortTableBackwards() {
    let  rows, switching, i, shouldSwitch, firstElement, lastElement;
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        firstElement = rows[i].getElementsByTagName("TD")[a];
        lastElement = rows[i + 1].getElementsByTagName("TD")[a];
        if (firstElement.innerHTML.toLowerCase() < lastElement.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
        }
    }
    if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
    }
    }
}