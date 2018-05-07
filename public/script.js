const deleteButton = document.querySelector(`.delete-button`);

if(deleteButton) {
  deleteButton.addEventListener(`click`, () => {
    document.querySelector(`.delete-form`).submit();
  })
}

const loginBtn = document.querySelector(`.login-btn`);
const headerNav = document.querySelector(`.header-nav`); 
const cancel = document.querySelector(`.cancel`);
const headerLogin = document.querySelector(`.header-login`);                               

if(loginBtn) {
  loginBtn.addEventListener(`click`, (event) => {
    event.preventDefault();
    headerNav.classList.add(`hidden`);
    headerLogin.classList.remove(`hidden`);
  });
}

cancel.addEventListener(`click`, (evt) => {
  headerNav.classList.remove(`hidden`);
  headerLogin.classList.add(`hidden`);
});