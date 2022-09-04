// ? Targeting DOM elements.
const editIcon = document.querySelector('.edit-icon');
const closeIcon = document.querySelector('.header-mobile .close-icon');
const burgerMenu = document.querySelector('.burger-menu-icon');
const sideMenuCloseIcon = document.querySelector('.mobile-side-menu .close-icon');
const searchInput = document.querySelectorAll('[name="search"]');
const accountBox = document.querySelector('.account-nav .interface');
const loginButtons = document.querySelectorAll('.auth .login');

// ? Creating loggedInToggle function.
const loggedInToggle = (isLogged) => {
  const header = document.querySelector('.header');
  if (isLogged) {
    header.classList.toggle('logged-in');
  }
};

// ? Create the fetch function to get the posts data.
fetch('/api/v1/posts')
  .then((jsonData) => jsonData.json())
  .then((data) => {
    loggedInToggle(data.isLoggedIn);
  });

// ? Creating the event listeners to activate the clickable fields in the page.
accountBox.addEventListener('click', () => {
  const menu = document.querySelector('.account-nav .menu');
  menu.classList.toggle('hidden');
});

searchInput.forEach((input) => {
  input.addEventListener('input', (e) => {
    e.target.nextElementSibling.style.display = 'block';
  });
});

editIcon.addEventListener('click', () => {
  const postOptions = document.querySelector('.post-options');
  editIcon.style.display = 'none';
  closeIcon.style.display = 'block';
  postOptions.style.display = 'flex';
});

closeIcon.addEventListener('click', () => {
  const postOptions = document.querySelector('.post-options');
  editIcon.style.display = 'block';
  closeIcon.style.display = 'none';
  postOptions.style.display = 'none';
});

burgerMenu.addEventListener('click', () => {
  const mobileSideMenu = document.querySelector('.mobile-side-menu');
  mobileSideMenu.style.display = 'flex';
});

sideMenuCloseIcon.addEventListener('click', () => {
  const mobileSideMenu = document.querySelector('.mobile-side-menu');
  mobileSideMenu.style.display = 'none';
});

loginButtons.forEach((button) => {
  button.addEventListener(('click'), () => {
    const LoginFormElement = document.querySelector('.container .auth .inner-cont');
    LoginFormElement.style.display = 'flex';
  });
});

document.querySelector('.container .auth .close-icon').addEventListener('click', () => {
  const LoginFormElement = document.querySelector('.container .auth .inner-cont');
  LoginFormElement.style.display = 'none';
});
