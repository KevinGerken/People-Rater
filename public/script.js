const deleteButton = document.querySelector(`.delete-button`);

if(deleteButton) {
  deleteButton.addEventListener(`click`, () => {
    document.querySelector(`.delete-form`).submit();
  })
}

