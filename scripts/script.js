const openFormButton = document.querySelector("#open-form");
const closeFormButton = document.querySelector("#close-form");
const addBookButton = document.querySelector("#add-book");
const bookForm = document.querySelector("form");
const bookContainer = document.querySelector("#book-container");
const darkenDiv = document.querySelector("#darken-div");
const inputList = document.querySelectorAll("input");
const myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBook(userList) {
  /* use values from form */
  return new Book(
    userList[0].value,
    userList[1].value,
    userList[2].value,
    userList[3].checked
  );
}

function updateBookStatus(book) {
  if (book.read) {
    book.read = false;
  } else {
    book.read = true;
  }
}

function deleteBook(userArray, index) {
  userArray.splice(index, 1);
}

Book.prototype.updateBookStatus = updateBookStatus;

/* functions to handle UI */

function updateCardStatus(book, status, icon) {
  if (book.read) {
    status.textContent = "Read";
    icon.src = "./assets/images/check.svg";
  } else {
    status.textContent = "Unread";
    icon.src = "./assets/images/book-open.svg";
  }
}

function deleteCard(container, card, index) {
  card.remove();

  /* shift indices down one for proceeding book
    cards */
  for (let i = index; i < container.children.length; i++) {
    container.children[i].dataset.indexNumber -= 1;
  }
}

function createCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("card");
  bookCard.dataset.indexNumber = myLibrary.length;

  const bookName = document.createElement("h3");
  bookName.textContent = book.name;

  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = book.author;

  const bookPages = document.createElement("p");
  bookPages.textContent = book.pages;

  const bookStatus = document.createElement("p");

  const iconContainer = document.createElement("div");

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./assets/images/delete.svg";

  const readIcon = document.createElement("img");
  updateCardStatus(book, bookStatus, readIcon);

  readIcon.addEventListener("click", () => {
    updateBookStatus(book);
    updateCardStatus(book, bookStatus, readIcon);
  });

  deleteIcon.addEventListener("click", () => {
    deleteBook(myLibrary, bookCard.dataset.indexNumber);
    deleteCard(bookContainer, bookCard, bookCard.dataset.indexNumber);
  });

  iconContainer.append(readIcon, deleteIcon);
  bookCard.append(bookName, bookAuthor, bookPages, bookStatus, iconContainer);
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
  const newBook = createBook(inputList);
  createCard(newBook);
  myLibrary.push(newBook);
  closeForm();
});
