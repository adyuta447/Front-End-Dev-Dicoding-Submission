// DOM
const InputBookIsComplete = document.getElementById('inputBookIsComplete');
const ItemId = "itemID";

function MakeBook(title, author, year, isCompleted) {
      const BookTitle = document.createElement('h3');
      BookTitle.innerText = title;
      const BookCreator = document.createElement('p');
      BookCreator.innerHTML = "<b>penulis:</b> " + author;
      const BookYear = document.createElement('p');
      BookYear.innerHTML = "<b>Tahun:</b> " + year;

      const div = document.createElement('div');
      div.classList.add("action");

      const article = document.createElement('article');
      article.classList.add("book_item");
      article.append(BookTitle, BookCreator, BookYear, div);

     if(isCompleted || InputBookIsComplete.checked){
        div.append(createIncompleteButton(), createEditButton(), createRemoveButton());
      } else{
        div.append(createCompleteButton(), createEditButton(), createRemoveButton());
      }
  return article;
}

const InCompleteBooks = "incompleteBookshelfList";
const completeBooks = "completeBookshelfList";

function addBook() {
   const incompleteBooksList = document.getElementById(InCompleteBooks);
   const completeBooksList = document.getElementById(completeBooks);

   const BookTitle = document.getElementById("inputBookTitle").value;
   const BookAuthor = document.getElementById("inputBookAuthor").value;
   const BookYear = document.getElementById("inputBookYear").value;

   const book = MakeBook(BookTitle, BookAuthor, BookYear);
   const bookObject = GenerateBookObject(BookTitle, BookAuthor, BookYear);

    if(InputBookIsComplete.checked){
        bookObject.isComplete = true;
        completeBooksList.append(book);

      }else{
        bookObject.isComplete = false;
        incompleteBooksList.append(book);
      }

   book[ItemId] = bookObject.id;
   books.push(bookObject);
  
      SaveBooks();
}

function addTaskToCompleted(taskElement) {
  const completeBooksList = document.getElementById(completeBooks);
  const Book = findBook(taskElement[ItemId]);
  const newBook = MakeBook(Book.title, Book.author, Book.year, true);

    Book.isComplete = true;
    newBook[ItemId] = book.id;

   completeBooksList.append(newBook);
   taskElement.remove();

   SaveBooks();
} 

function addTaskToIncompleted(taskElement) {
  const incompleteBooksList = document.getElementById(InCompleteBooks);
  const Book = findBook(taskElement[ItemId]);
  const newBook = MakeBook(Book.title, Book.author, Book.year, false);

    Book.isComplete = false;
    newBook[ItemId] = book.id;

   incompleteBooksList.append(newBook);
   taskElement.remove();

   SaveBooks();
}

function removeTask(taskElement){
  const bookPosition = FindBookIndex(taskElement[ItemId]);
  books.splice(bookPosition, 1);

  taskElement.remove();
  SaveBooks();
}

function createButton(buttonTypeClass, value, eventListener) {
    const button = document.createElement("button");
    button.innerText = value;
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);        
    });
    return button;
}

//
function createRemoveButton() {
   return createButton("red", "Hapus Buku", function(event){
    const wrapper = event.target.parentElement.parentElement;
    const textTitle = wrapper.querySelector("h3").innerText;
    let BooksDeletePopup = confirm(`Apakah anda yakin ingin menghapus buku ${textTitle} ?`);
    
    while(BooksDeletePopup == true){
      BooksDeletePopup = false;
      removeTask(wrapper);
    }
   });
}

function createIncompleteButton() {
   return createButton("green", "Belum Selesai Dibaca", function(event){
      event.preventDefault();
      addTaskToIncompleted(event.target.parentElement.parentElement);
    });
}

function createCompleteButton() {
    return createButton("green", "Selesai Dibaca", function(event){
      event.preventDefault();
      addTaskToCompleted(event.target.parentElement.parentElement);
    });
}

function createEditButton() {
    return createButton("green", "Edit Buku", function(event){
      event.preventDefault();
      editBook(event.target.parentElement.parentElement);
    });
}
//


const InputBookTitle = document.getElementById("inputBookTitle");
const InputBookAuthor = document.getElementById("inputBookAuthor");
const InputBookYear = document.getElementById("inputBookYear");

function inputValue(BookTitle = null, BookYear = null, BookAuthor = null){
  InputBookTitle.value = BookTitle;
  InputBookYear.value = BookYear;
  InputBookAuthor.value = BookAuthor;
}

function editBook(taskElement) {
  const Book = findBook(taskElement[ItemId]);
  const bookPosition = FindBookIndex(taskElement[ItemId]);
  books.splice(bookPosition, 1);

  inputValue(Book.title, Book.year, Book.author)
  taskElement.remove();
  SaveBooks();
}

const SearchSubmit = document.getElementById("searchSubmit");
SearchSubmit.addEventListener("click", function() {
  const search = document.getElementById("searchBookTitle").value;
  searchBook(search);
})

function searchBook(BookTitle) {
  const incompleteBooksList = document.getElementById(InCompleteBooks);
  const completeBooksList = document.getElementById(completeBooks);

        completeBooksList.innerHTML = "";
        incompleteBooksList.innerHTML = "";

  const result = books.filter(function(book) {

    if(book.title == BookTitle){
   const newBook = MakeBook(book.title, book.author, book.year);
   newBook[ItemId] = book.id;

    if(book.isComplete == true){
      completeBooksList.append(newBook);
      }else{
      incompleteBooksList.append(newBook);
    }
  }
 });

  SaveBooks();

return result;
}

document.addEventListener("ondataloaded", function() {
     refreshDataFromBooks();
});

document.addEventListener("DOMContentLoaded", function() { 
    const submitForm = document.getElementById("bookSubmit");
    const textBookSubmit = document.querySelector("span");

 submitForm.onclick = function (event) {
        addBook();
        inputValue();
    }

InputBookIsComplete.onclick = function(){
     textBookSubmit.innerText = "Selesai Dibaca";
    }
      
      if(checkLocalStorage()){
     LoadDataFromStorage();
    }
});
//



// Local Storage
const STORAGE_KEY = "BOOKS_APPS";
 let books = [];

 function checkLocalStorage(){
 	return typeof(Storage) !== "undefined";
 }

function LoadDataFromStorage() {
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if(data !== null){
    books = data;
  }
   document.dispatchEvent(new Event("ondataloaded"));
}

function GenerateBookObject(title, author, year, isComplete) {
  return{
      id: +new Date,
      title,
      author,
      year,
      isComplete
  }
}

function SaveBooks(){
  if(checkLocalStorage()){
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
  }
   document.dispatchEvent(new Event("ondatasaved"));
}

function findBook(bookId) {
   for(book of books){
       if(book.id === bookId)
           return book;
   }
   return null;
}
 
 
function FindBookIndex(bookId) {
   let index = 0
   for (book of books) {
       if(book.id === bookId)
           return index;
 
       index++;
   }
 
   return -1;
}

const incompleteBooksList = document.getElementById("incompleteBookshelfList");
const completeBooksList = document.getElementById("completeBookshelfList");

function refreshDataFromBooks() {
   for(book of books) {
    const newBook = MakeBook(book.title, book.author, book.year, book.isComplete);
    newBook[ItemId] = book.id;

    if(book.isComplete){
      completeBooksList.append(newBook);
    }else {
      incompleteBooksList.append(newBook);
    }
   }
}
//
