const openFormButton = document.querySelector("#open-form");
const closeFormButton = document.querySelector("#close-form");
const addBookButton = document.querySelector("#add-book");
const bookForm = document.querySelector("form");
const bookContainer = document.querySelector("#book-container");
const darkenDiv = document.querySelector("#darken-div");
const inputList = document.querySelectorAll("input");
const myLibrary = [];

function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
}

function createBook() {
    /* use values from form */
    return new Book(inputList[0].value, inputList[1].value, 
    inputList[2].value);
}

function updateUI(book) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.dataset.indexNumber = myLibrary.length;

    const bookName = document.createElement("h3");
    bookName.textContent = book.name;

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement("p");
    bookPages.textContent = book.pages;

    const iconContainer = document.createElement("div")

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./assets/images/delete.svg";

    deleteIcon.addEventListener("click", () => {
        const deletedIndex = bookCard.dataset.indexNumber;
        
        bookCard.remove();
        myLibrary.splice(deletedIndex, 1);

        /* shift indices down one for proceeding book
        cards */
        for(let i = deletedIndex;
            i < bookContainer.children.length;
            i++) {
                bookContainer.children[i].dataset.indexNumber -= 1;
            }
    })

    iconContainer.append(deleteIcon);

    bookCard.append(bookName, bookAuthor, bookPages,
                    iconContainer);

    bookContainer.appendChild(bookCard);
}

function openForm() {
    bookForm.style.display = "flex";
    darkenDiv.classList.add("darken");
}

function closeForm() {
    bookForm.style.display = "none";
    darkenDiv.classList.remove("darken");
}

openFormButton.addEventListener("click", openForm);

closeFormButton.addEventListener("click", closeForm);

addBookButton.addEventListener("click", (e) => {
    e.preventDefault();
    const newBook = createBook();
    updateUI(newBook);
    myLibrary.push(newBook);
    closeForm();
});
