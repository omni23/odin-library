const openFormButton = document.querySelector("#open-form");
const closeFormButton = document.querySelector("#close-form");
const bookForm = document.querySelector("form");
const darkenDiv = document.querySelector("#darken-div");

openFormButton.addEventListener("click", () => {
    bookForm.style.display = "flex";
    darkenDiv.classList.add("darken");
});

closeFormButton.addEventListener("click", () => {
    bookForm.style.display = "none";
    darkenDiv.classList.remove("darken");

});
