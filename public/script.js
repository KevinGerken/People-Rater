const stars = document.querySelectorAll(`.rating-stars`),
      numInput = document.querySelector(`.num-input`),
      deleteButton = document.querySelector(`.delete-button`);

for(let star of stars) {
  star.addEventListener(`click`, () => {
    let rating = star.classList[1].slice(-1);
    numInput.value = rating;
    for(let star of stars) {
      star.classList.remove(`clicked`);
    }
    for(let i = rating; i > 0; i--) {
      document.querySelector(`.star${i}`).classList.add(`clicked`);  
    }
  });
}

function formSubmit() {
  document.querySelector(`.delete-form`).submit();
}

if(deleteButton) {
  deleteButton.addEventListener(`click`, formSubmit)
}