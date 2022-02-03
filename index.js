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
let authorInput = document.querySelector('#title');
let authorInput = document.querySelector('#pages');
let authorInput = document.querySelector('#status');
let authorInput = document.querySelector('#rating');
let authorInput = document.querySelector('#author');

function resetInputValues(){
authorInput.value = "";
}
function addBookToLibrary(){
 myLibrary.push(new Book(authorInput.value, ))
 myLibrary.push(authorInput.value);
 console.log(myLibrary);
resetInputValues();
 
}

const saveBookBtn = document.querySelector('#saveBookBtn');
saveBookBtn.addEventListener('click', ()=>{
addBookToLibrary();
closeModalF();
}, false)



