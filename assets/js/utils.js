const generateModal = (id) => {
  const modalForm = document.getElementById("updateBook");
  let book = getData.filter((item) => item.id == id)[0];

  const updateForm = document.getElementById("updateForm");
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    updateBook(book.id);
  });

  modalForm.innerHTML = `
  <div class="mb-3">
  <label for="updateBookTitle" class="form-label">Judul</label>
  <input type="text" class="form-control" id="updateBookTitle" value="${book.title}">
</div>
<div class="mb-3">
  <label for="updateBookAuthor" class="form-label">Penulis</label>
  <input type="text" class="form-control" id="updateBookAuthor" value="${book.author}">
</div>
<div class="mb-3">
  <label for="updateBookYear" class="form-label">Tahun</label>
  <input type="number" class="form-control" id="updateBookYear" value="${book.year}">
</div>
  `;
};

const toastNotif = (toastText) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  Toast.fire({
    icon: "success",
    title: toastText,
  });
};

// Confirm Modal
const confirmModal = async (modalText, modalIcon, confirmText, toastText) => {
  return await Swal.fire({
    title: "Yakinkah?",
    text: modalText,
    icon: modalIcon,
    showCancelButton: true,
    confirmButtonColor: "#0DCAFE",
    cancelButtonColor: "#6c757d",
    confirmButtonText: confirmText,
    cancelButtonText: "Batal",
  }).then((result) => {
    if (result.isConfirmed) {
      toastNotif(toastText);
    }
    return result.isConfirmed;
  });
};
