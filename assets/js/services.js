// Get data from local storage
let getData = JSON.parse(localStorage.getItem("booksData") || "[]");

// Save Book
let bookData = {
  id: 0,
  title: "",
  author: "",
  year: 0,
  isComplete: false,
};

let title = document.getElementById("inputBookTitle");
let author = document.getElementById("inputBookAuthor");
let year = document.getElementById("inputBookYear");
let isComplete = document.getElementById("inputBookIsComplete");
let bookSubmit = document.querySelector("#bookSubmit span");
let searchBookTitle = document.getElementById("searchBookTitle");
let searchSubmit = document.getElementById("searchSubmit");

// Submit button title
isComplete.addEventListener("change", () => {
  let title = isComplete.checked ? "Selesai dibaca" : "Belum selesai dibaca";
  bookSubmit.innerHTML = title;
});

// Save Book
const saveBook = async () => {
  bookData.id = new Date().getTime();
  bookData.title = title.value;
  bookData.author = author.value;
  bookData.year = parseInt(year.value);
  bookData.isComplete = isComplete.checked;
  getData.push(bookData);
  localStorage.setItem("booksData", JSON.stringify(getData));
  toastNotif("Data buku berhasil disimpan");
  return setTimeout(() => location.reload(), 1500);
};

// Update Book
const updateBook = (id) => {
  let tempBooksData = getData.filter((item) => item.id != id);
  let bookData = getData.filter((item) => item.id == id)[0];

  let title = document.getElementById("updateBookTitle");
  let author = document.getElementById("updateBookAuthor");
  let year = document.getElementById("updateBookYear");

  bookData.title = title.value;
  bookData.author = author.value;
  bookData.year = parseInt(year.value);

  tempBooksData.push(bookData);

  localStorage.setItem("booksData", JSON.stringify(tempBooksData));
  toastNotif("Data buku berhasil diupdate");
  return setTimeout(() => location.reload(), 1500);
};

// Search Book
let filteredData = getData;
searchSubmit.addEventListener("click", () => {
  let keyword = new RegExp(searchBookTitle.value, "i");
  filteredData = getData.filter((item) =>
    item.title.search(keyword) >= 0 ? item : null
  );

  incompleteBookshelfList.innerHTML =
    filteredData.length > 0 ? bookList(filteredData, false) : null;

  completeBookshelfList.innerHTML =
    filteredData.length > 0 ? bookList(filteredData, true) : null;
});

// Move Book
const moveBook = (id) => {
  let tempBooksData = getData.filter((item) => item.id != id);
  let book = getData.filter((item) => item.id === id);
  book[0].isComplete = !book[0].isComplete;

  tempBooksData.push(book[0]);

  localStorage.setItem("booksData", JSON.stringify(tempBooksData));
  return setTimeout(() => location.reload(), 1500);
};

// Delete Book
const deleteBook = (id) => {
  let tempBooksData = getData.filter((item) => item.id != id);
  localStorage.setItem("booksData", JSON.stringify(tempBooksData));
  return setTimeout(() => location.reload(), 1500);
};
