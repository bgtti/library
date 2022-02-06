//****************SAMPLE BOOKS****************
const sampleBook1 = {
	title: 'The Black Swan',
	author: 'N. N. Taleb',
	pages: '444',
	status: 'Read',
	rating: '5',
	comments:
		'Book about the impact of rare and unpredictable extreme events, and the human tendency to find simplistic explanations for these in retrospect.',
}
const sampleBook2 = {
	title: 'Lord of the Rings',
	author: 'J. R. R. Tolkien',
	pages: '1248',
	status: 'Read',
	rating: '5',
	comments: 'A massive but great book!',
}
const sampleBook3 = {
	title: 'One Hundred Years of Solitude',
	author: 'Gabriel García Márquez',
	pages: '417',
	status: 'Read',
	rating: '4',
	comments: 'A massive but great book!',
}

//****************SELECTORS****************
//add book modal:
const closeModal = document.querySelector('#closeModal')
const modalContainer = document.querySelector('#modalContainer')
const addBookBtn = document.querySelector('#addBookBtn')

//selection of inputs from 'Add new book' Modal:
const authorInput = document.querySelector('#author')
const titleInput = document.querySelector('#title')
const pagesInput = document.querySelector('#pages')
const statusInput = document.querySelector('#status')
const ratingInput = document.querySelector('#rating')
const theStars = document.querySelectorAll('.theStars')
const commentsInput = document.querySelector('#comments')

//save book button
const saveBookBtn = document.querySelector('#saveBookBtn')

//reset changes button
const resetBtn = document.querySelector('#resetBtn')

//delete book modal:
const closeDeleteModal = document.querySelector('#closeDeleteModal')
const deleteModalContainer = document.querySelector('#deleteModalContainer')
const keepBookBtn = document.querySelector('#keepBookBtn')

//delete book button
const deleteBtn = document.querySelector('#deleteBtn')

//book table:
let bookTable = document.querySelector('#bookTable')

//Edit book:
const editBookBtn = document.querySelector('#editBookBtn')
const changeToEdit = document.querySelector('#changeToEdit') //this is the h2 em in 'add new book' modal.

//form validation:
const validationAuthor = document.querySelector('#validationAuthor')
const validationTitle = document.querySelector('#validationTitle')
const validationPages = document.querySelector('#validationPages')

//****************GLOBAL VARIABLES****************
//when the trash or edit icons are clicked, index of book saved to the variables by the showTable function
let bookToDelete = undefined
let bookToEdit = undefined

//the trash and edit icon selectors are set in showTable function
let trashIcons = undefined
let editIcons = undefined

//form validation
let formIsValidated = true

//****************BOOK LIBRARY****************
//the array where book objects will be saved to
let myLibrary = [sampleBook1, sampleBook2, sampleBook3]

//****************CONSTRUCTOR ****************
//of the book object:
function Book(title, author, pages, status, rating, comments) {
	this.title = title
	this.author = author
	this.pages = pages
	this.status = status
	this.rating = rating
	this.comments = comments
}

//****************OPEN AND CLOSE MODALS****************
//closes modal
function closeModalF(modalToClose) {
	modalToClose.classList.add('hideModal')

	if (modalToClose === modalContainer) {
		//if the modal is the 'add book' modal
		//this resets the modal from 'edit' to 'add' modus
		changeToEdit.textContent = 'Add'
		editBookBtn.classList.add('btn-edit')
		saveBookBtn.classList.remove('btn-edit')
		resetBtn.classList.remove('btn-edit')

		resetInputValues()
	}
}
//opens modal
function openModalF(modalToOpen) {
	modalToOpen.classList.remove('hideModal')
}

// Event Listener: open/close 'Add new book' Modal

closeModal.addEventListener(
	'click',
	() => {
		closeModalF(modalContainer)
	},
	false
)
addBookBtn.addEventListener(
	'click',
	() => {
		openModalF(modalContainer)
	},
	false
)

// Event Listener: open/close 'delete book' Modal
//(the opening of the modal by clicking the trash icon is done from the showTable function)
closeDeleteModal.addEventListener(
	'click',
	() => {
		closeModalF(deleteModalContainer)
		bookToDelete = undefined
	},
	false
)
keepBookBtn.addEventListener(
	'click',
	() => {
		closeModalF(deleteModalContainer)
		bookToDelete = undefined
	},
	false
)

//****************ADD NEW BOOK MODAL****************
function showStars(ratingValue) {
	theStars.forEach((star) => {
		if (star.dataset.rating <= ratingValue) {
			star.classList.add('selectedStar')
			star.children[0].removeAttribute('name', 'star-outline')
			star.children[0].setAttribute('name', 'star')
		} else {
			star.classList.remove('selectedStar')
			star.children[0].removeAttribute('name', 'star')
			star.children[0].setAttribute('name', 'star-outline')
		}
	})
}
for (let star of theStars) {
	star.addEventListener(
		'click',
		() => {
			ratingInput.value = star.dataset.rating
			showStars(ratingInput.value)
		},
		false
	)
}

//Reset button in 'Add new book' modal: resetting the stars

function resetStars() {
	for (let star of theStars) {
		star.classList.remove('selectedStar')
		star.children[0].removeAttribute('name', 'star')
		star.children[0].setAttribute('name', 'star-outline')
	}
}

resetBtn.addEventListener(
	'click',
	() => {
		resetStars()
	},
	false
)

//resetting input in Modal (after clicking "save book"), which is called by the addBookToLibrary function
function resetInputValues() {
	authorInput.value = ''
	titleInput.value = ''
	pagesInput.value = ''
	ratingInput.value = ''
	commentsInput.value = ''
	resetStars()
	resetValidation()
}

//function that creates a new book object:
function addBookToLibrary() {
	myLibrary.push(
		new Book(
			titleInput.value,
			authorInput.value,
			pagesInput.value,
			statusInput.value,
			ratingInput.value,
			commentsInput.value
		)
	)
	showTable()
	resetInputValues()
}

//****************CREATING TABLE ROWS****************
//function that adds newly created book to 'Book List': to be viewed by user
function showTable() {
	while (bookTable.children.length > 1) {
		bookTable.removeChild(bookTable.lastChild)
	}
	if (myLibrary.length === 0) {
		let newEmptyRow = document.createElement('tr')
		newEmptyRow.classList.add('book-row')
		newEmptyRow.textContent = "You don't have books"
		bookTable.append(newEmptyRow)
	} else {
		for (let book of myLibrary) {
			let newRow = document.createElement('tr')
			newRow.classList.add('book-row')
			bookTable.append(newRow)

			let taps = [book.title, book.author, book.pages, book.status]
			let nrOfStars = parseInt([book.rating])
			if (!nrOfStars) {
				nrOfStars = 0
			}

			for (let el in taps) {
				let newCell = document.createElement('td')
				newCell.textContent = taps[el]
				newRow.append(newCell)
			}

			let newCellRating = document.createElement('td')
			for (let i = 1; i <= nrOfStars; i++) {
				let fullStar = document.createElement('ion-icon')
				fullStar.setAttribute('name', 'star')
				fullStar.classList.add('ministarIcon')
				newCellRating.append(fullStar)
			}
			for (let j = 1; j <= 5 - nrOfStars; j++) {
				let outlineStar = document.createElement('ion-icon')
				outlineStar.setAttribute('name', 'star-outline')
				outlineStar.classList.add('ministarIcon')
				newCellRating.append(outlineStar)
			}
			newRow.append(newCellRating)

			let actionCell = document.createElement('td')
			let newEditIcon = document.createElement('ion-icon')
			newEditIcon.setAttribute('name', 'create-outline')
			newEditIcon.classList.add('editIcon')

			let newTrashIcon = document.createElement('ion-icon')
			newTrashIcon.setAttribute('name', 'trash-outline')
			newTrashIcon.classList.add('trashIcon')

			actionCell.append(newEditIcon)
			actionCell.append(newTrashIcon)
			newRow.append(actionCell)
		}
		trashIcons = document.querySelectorAll('.trashIcon')
		editIcons = document.querySelectorAll('.editIcon')

		trashIcons.forEach((e, i) => {
			e.addEventListener(
				'click',
				() => {
					openModalF(deleteModalContainer)
					bookToDelete = i
				},
				false
			)
		})
		editIcons.forEach((e, i) => {
			e.addEventListener(
				'click',
				() => {
					bookToEdit = i
					openEditBook()
				},
				false
			)
		})
	}
}
showTable()

//****************SAVE NEW BOOK****************
//form validation:

function resetValidation() {
	formIsValidated = true
	validationAuthor.classList.add('hide-issue')
	authorInput.classList.remove('input-not-valid')
	validationTitle.classList.add('hide-issue')
	titleInput.classList.remove('input-not-valid')
	validationPages.classList.add('hide-issue')
	pagesInput.classList.remove('input-not-valid')
}
function validateAuthor() {
	if (authorInput.value === '') {
		formIsValidated = false
		validationAuthor.classList.remove('hide-issue')
		authorInput.classList.add('input-not-valid')
	} else {
		formIsValidated = true
		validationAuthor.classList.add('hide-issue')
		authorInput.classList.remove('input-not-valid')
	}
}

function validateTitle() {
	if (titleInput.value === '') {
		formIsValidated = false
		validationTitle.classList.remove('hide-issue')
		titleInput.classList.add('input-not-valid')
	} else {
		formIsValidated = true
		validationTitle.classList.add('hide-issue')
		titleInput.classList.remove('input-not-valid')
	}
}

function validatePages() {
	if (pagesInput.value.length > 5) {
		formIsValidated = false
		validationPages.classList.remove('hide-issue')
		pagesInput.classList.add('input-not-valid')
	} else {
		formIsValidated = true
		validationPages.classList.add('hide-issue')
		pagesInput.classList.remove('input-not-valid')
	}
}

function validateForm() {
	if (authorInput.value === '') {
		validateAuthor()
	} else if (titleInput.value === '') {
		validateTitle()
	} else if (pagesInput.value.length > 5) {
		validatePages()
	} else {
		resetValidation()
	}
}

authorInput.addEventListener(
	'blur',
	() => {
		validateAuthor()
	},
	false
)
titleInput.addEventListener(
	'blur',
	() => {
		validateTitle()
	},
	false
)
pagesInput.addEventListener(
	'blur',
	() => {
		validatePages()
	},
	false
)

//Event listener to the 'save book' button in 'Add new book' Modal:
//it will call the function to create a new book object (addBookToLibrary) and close the modal.

saveBookBtn.addEventListener(
	'click',
	() => {
		validateForm()
		if (formIsValidated) {
			addBookToLibrary()
			closeModalF(modalContainer)
			resetValidation()
		}
	},
	false
)

//****************DELETE BOOK****************
//DELETE BOOK MODAL: the delete button
//deleting book from list

function deleteBook() {
	myLibrary.splice(bookToDelete, 1)
	bookToDelete = undefined
	showTable()
	closeModalF(deleteModalContainer)
}

deleteBtn.addEventListener(
	'click',
	() => {
		deleteBook()
	},
	false
)

//****************EDITING A BOOK****************

function openEditBook() {
	//the function uses the add book modal. It replaces the h2 wording from 'add' to 'edit', hides the original buttons, and displays the 'edit button'
	changeToEdit.textContent = 'Edit'
	saveBookBtn.classList.add('btn-edit')
	resetBtn.classList.add('btn-edit')
	editBookBtn.classList.remove('btn-edit')

	//the values are pulled from the library using the bookToEdit global variable, set by the showTable function
	authorInput.value = myLibrary[bookToEdit].author
	titleInput.value = myLibrary[bookToEdit].title
	pagesInput.value = myLibrary[bookToEdit].pages
	statusInput.value = myLibrary[bookToEdit].status
	ratingInput.value = myLibrary[bookToEdit].rating
	commentsInput.value = myLibrary[bookToEdit].comments

	//show the coloured stars according to the number rating:
	showStars(myLibrary[bookToEdit].rating)
	//opening the modal when everything is set:
	openModalF(modalContainer)
}

function editBook() {
	myLibrary[bookToEdit].author = authorInput.value
	myLibrary[bookToEdit].title = titleInput.value
	myLibrary[bookToEdit].pages = pagesInput.value
	myLibrary[bookToEdit].status = statusInput.value
	myLibrary[bookToEdit].rating = ratingInput.value
	myLibrary[bookToEdit].comments = commentsInput.value
	showTable()
	resetInputValues()
	bookToEdit = undefined
}

editBookBtn.addEventListener(
	'click',
	() => {
		validateForm()
		if (formIsValidated) {
			editBook()
			closeModalF(modalContainer)
			resetValidation()
		}
	},
	false
)
