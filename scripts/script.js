// DOM elements

const openButton = document.querySelector("#open-form");
const closeButton = document.querySelector("#close-form");
const addBookButton = document.querySelector("#add-book");
const bookContainer = document.querySelector("#book-container");
const inputList = document.querySelectorAll("input");

// Variables

const myLibrary = [];
const deleteIcon = "./assets/images/delete.svg";
const readIcon = "./assets/images/check.svg";
const unreadIcon = "./assets/images/book-open.svg";

// Book constructor and functions

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read, library) {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);

  return newBook;
}

Book.prototype.updateBookStatus = function () {
  this.read = !this.read;
};

// UI functions

function createCard(title, author, pages, status, iconOne, iconTwo) {
  const card = document.createElement("div");

  const cardTitle = document.createElement("h3");
  cardTitle.textContent = title;

  const cardAuthor = document.createElement("p");
  cardAuthor.textContent = author;

  const cardPages = document.createElement("p");
  cardPages.textContent = pages;

  const cardRead = document.createElement("p");
  cardRead.textContent = status;

  const buttonContainer = document.createElement("div");

  const imgOne = document.createElement("img");
  imgOne.src = iconOne;

  const imgTwo = document.createElement("img");
  imgTwo.src = iconTwo;

  buttonContainer.append(imgOne, imgTwo);

  card.append(cardTitle, cardAuthor, cardPages, cardRead, buttonContainer);

  return card;
}

function deleteCard(container, card) {
  const index = card.dataset.indexNumber;
  card.remove();

  for (let i = index; i < container.children.length; i += 1) {
    const child = container.children[i];
    child.dataset.indexNumber -= 1;
  }
}

// Event Listeners

openButton.addEventListener("click", () => {
  document.querySelector("#darken-div").classList.add("darken");
  document.querySelector("form").style.display = "flex";
});

closeButton.addEventListener("click", () => {
  document.querySelector("#darken-div").classList.remove("darken");
  document.querySelector("form").style.display = "none";
});

addBookButton.addEventListener("click", (event) => {
  event.preventDefault();

  const newBook = addBookToLibrary(
    inputList[0].value,
    inputList[1].value,
    inputList[2].value,
    inputList[3].checked,
    myLibrary
  );

  const card = newBook.read
    ? createCard(
        newBook.title,
        newBook.author,
        `${newBook.pages} pages`,
        "Read",
        readIcon,
        deleteIcon
      )
    : createCard(
        newBook.title,
        newBook.author,
        `${newBook.pages} pages`,
        "Unread",
        unreadIcon,
        deleteIcon
      );

  card.dataset.indexNumber = myLibrary.indexOf(newBook).toString();
  card.classList.add("card");

  card.lastChild.firstChild.addEventListener("click", (e) => {
    if (myLibrary[card.dataset.indexNumber].read) {
      card.children[3].textContent = "Unread";
      e.target.src = unreadIcon;
    } else {
      card.children[3].textContent = "Read";
      e.target.src = readIcon;
    }

    myLibrary[card.dataset.indexNumber].updateBookStatus();
  });

  card.lastChild.lastChild.addEventListener("click", () => {
    deleteCard(bookContainer, card);
    myLibrary.splice(card.dataset.indexNumber, 1);
  });

  bookContainer.append(card);

  // close form
  document.querySelector("#darken-div").classList.remove("darken");
  document.querySelector("form").style.display = "none";
});
