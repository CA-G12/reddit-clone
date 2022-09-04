const editIcon = document.querySelector('.edit-icon');
const closeIcon = document.querySelector('.header-mobile .close-icon');
const postOptions = document.querySelector('.post-options');
const mobileSideMenu = document.querySelector('.mobile-side-menu');
const burgerMenu = document.querySelector('.burger-menu-icon');
const sideMenuCloseIcon = document.querySelector('.mobile-side-menu .close-icon');

editIcon.addEventListener('click', () => {
  editIcon.style.display = 'none';
  closeIcon.style.display = 'block';
  postOptions.style.display = 'flex';
});

closeIcon.addEventListener('click', () => {
  editIcon.style.display = 'block';
  closeIcon.style.display = 'none';
  postOptions.style.display = 'none';
});

burgerMenu.addEventListener('click', () => {
  mobileSideMenu.style.display = 'flex';
});

sideMenuCloseIcon.addEventListener('click', () => {
  mobileSideMenu.style.display = 'none';
});
