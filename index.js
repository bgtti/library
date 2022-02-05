// Open/Close Modal
const closeModal = document.querySelector('#closeModal');
const modalContainer = document.querySelector('#modalContainer')
const addBookBtn = document.querySelector('#addBookBtn')

function closeModalF (){
 modalContainer.classList.add('hideModal');
}
function openModalF (){
 modalContainer.classList.remove('hideModal');
}
closeModal.addEventListener('click', ()=>{
closeModalF();
}, false);

addBookBtn.addEventListener('click', ()=>{
openModalF();
}, false);

let myLibrary = [];
function Book(title, author,pages,status,rating){
 this.title = title;
 this.author = author;
 this.pages = pages;
 this.status = status;
 this.rating = rating;
 this.comments = comments;
}

let authorInput = document.querySelector('#author');
let titleInput = document.querySelector('#title');
let pagesInput = document.querySelector('#pages');
let statusInput = document.querySelector('#status');
let ratingInput = document.querySelector('#rating');
let commentsInput = document.querySelector('#comments');

function resetInputValues(){
authorInput.value = "";
titleInput.value = "";
pagesInput.value = "";
ratingInput.value = "";
commentsInput.value = "";



}
function addBookToLibrary(){
 myLibrary.push(new Book(authorInput.value, titleInput.value, pagesInput.value, statusInput.value, ratingInput.value, commentsInput.value ))
 myLibrary.push(authorInput.value);
 console.log(myLibrary);
resetInputValues();
 
}

function addNewBookToTable (){
 
}

const saveBookBtn = document.querySelector('#saveBookBtn');
saveBookBtn.addEventListener('click', ()=>{
addBookToLibrary();
closeModalF();
}, false)



