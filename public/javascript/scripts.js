const editIcon = document.querySelector('.edit-icon');
const closeIcon = document.querySelector('.header-mobile .close-icon');
const burgerMenu = document.querySelector('.burger-menu-icon');
const sideMenuCloseIcon = document.querySelector('.mobile-side-menu .close-icon');
const searchInput = document.querySelectorAll('#search');
const accountBox = document.querySelector('.account-nav .interface');

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
