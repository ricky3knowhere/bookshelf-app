// Generate Book List
const bookList = (data, isComplete) =>
  data
    .filter((item) => item.isComplete == isComplete)
    .map(
      (book, i) =>
        `<tr>
      <th scope="row">${i + 1}</th>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td>
      <button class="btn btn-sm btn-success px-3" onclick="handleMove(${
        book.id
      },${isComplete})">${
          isComplete ? "❌Belum selesai dibaca" : "✅Selesai dibaca"
        }</button>
      <button class="btn btn-sm btn-primary px-3" onclick="generateModal(${
        book.id
      })" data-bs-toggle="modal" data-bs-target="#exampleModal">📝Edit</button>
      <button class="btn btn-sm btn-danger btnDelete px-3" onclick="handleDelete(${
        book.id
      })">🗑️Hapus</button>
      </td>
    </tr>`
    )
    .join("");

// Save book handle
const saveForm = document.getElementById("saveForm");
saveForm.addEventListener("submit", (e) => {
  e.preventDefault();
  saveBook();
});

// OnMove handle
const handleMove = async (id, isComplete) => {
  let isDone = isComplete ? "belum " : "";
  let modalText = `Pindahkan buku ke rak ${isDone}selesai dibaca?`;
  (await confirmModal(
    modalText,
    "question",
    "Pindahkan",
    "Buku berhasil dipindahkan"
  ))
    ? moveBook(id)
    : null;
};

// OnDelete handle
const handleDelete = async (id) => {
  (await confirmModal(
    "Hapus buku ini?",
    "warning",
    "Hapus",
    "Buku berhasil dihapus"
  ))
    ? deleteBook(id)
    : null;
};

// Show Books
// IncompleteBookshelfList
let incompleteBookshelfList = document.getElementById(
  "incompleteBookshelfList"
);
incompleteBookshelfList.innerHTML = bookList(getData, false) ?? null;

// CompleteBookshelfList
let completeBookshelfList = document.getElementById("completeBookshelfList");
completeBookshelfList.innerHTML = bookList(getData, true) ?? null;
