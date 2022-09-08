const searchInputs = document.querySelectorAll('[name="search"]');
const burgerMenu = document.querySelector('.burger-menu-icon');
const sideMenuCloseIcon = document.querySelector('.mobile-side-menu .close-icon');
const loginButtons = document.querySelectorAll('.auth .login');
const signupFormButtons = document.querySelectorAll('.auth .signup');
const nextPhase = document.querySelector('.next-section');
const previousPhase = document.querySelector('.previous-section');

const showSideMenu = (show) => {
  const mobileSideMenu = document.querySelector('.mobile-side-menu');
  mobileSideMenu.style.display = show ? 'flex' : 'none';
  const authContainer = document.querySelector('.container .outer-auth');
  authContainer.style.display = 'none';
};

const nextOrPrevious = (isNext) => {
  const firstPhase = document.querySelector('.first-phase');
  const secondPhase = document.querySelector('.second-phase');
  firstPhase.style.display = isNext ? 'none' : 'flex';
  secondPhase.style.display = isNext ? 'flex' : 'none';
};

// ? Creating the function which is responsible for creating the autocomplete options.
const crateAutocomplete = (array) => {
  const autocompleteElements = document.querySelectorAll('.autocomplete');
  autocompleteElements.forEach((ele) => {
    const element = ele;
    element.innerHTML = '';
    array.forEach((row) => {
      const optionDiv = document.createElement('div');
      optionDiv.classList.add('option');
      optionDiv.setAttribute('data-id', row.id);
      ele.appendChild(optionDiv);

      const fullName = document.createElement('p');
      fullName.classList.add('full-name');
      fullName.textContent = row.full_name;
      optionDiv.appendChild(fullName);

      const innerDiv = document.createElement('div');
      innerDiv.classList.add('inner');
      optionDiv.appendChild(innerDiv);

      const username = document.createElement('p');
      username.classList.add('username');
      username.textContent = `Username: ${row.username}`;
      innerDiv.appendChild(username);

      const email = document.createElement('p');
      email.classList.add('email');
      email.textContent = `Email: ${row.email}`;
      innerDiv.appendChild(email);
    });
  });
};

burgerMenu.addEventListener('click', () => {
  showSideMenu(true);
});

sideMenuCloseIcon.addEventListener('click', () => {
  showSideMenu(false);
});

// ? Creating the eventLister to add show the autocomplete on input event
// ? and Fetching the data on the /api/v1/users/autocomplete endpoint.
searchInputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    fetch(`/api/v1/users/autocomplete?value=${e.target.value}`)
      .then((jsonData) => jsonData.json())
      .then((data) => {
        e.target.nextElementSibling.style.display = 'block';
        e.target.nextElementSibling.nextElementSibling.style.display = 'block';
        crateAutocomplete(data);
      });
  });
});

loginButtons.forEach((button) => {
  button.addEventListener(('click'), () => {
    const LoginFormElement = document.querySelector('.container .auth .inner-cont');
    const authContainer = document.querySelector('.container .outer-auth');
    authContainer.style.display = 'block';
    LoginFormElement.style.display = 'flex';
  });
});

signupFormButtons.forEach((button) => {
  button.addEventListener(('click'), () => {
    const LoginFormElement = document.querySelector('.container .auth .inner-signup-cont');
    const authContainer = document.querySelector('.container .outer-auth');
    authContainer.style.display = 'block';
    LoginFormElement.style.display = 'flex';
  });
});

nextPhase.addEventListener('click', () => {
  nextOrPrevious(true);
});

previousPhase.addEventListener('click', () => {
  nextOrPrevious(false);
});

document.querySelector('.container .auth .login-section .close-icon').addEventListener('click', () => {
  const LoginFormElement = document.querySelector('.container .auth .inner-cont');
  LoginFormElement.style.display = 'none';
});

document.querySelector('.signup-section .close-icon').addEventListener('click', () => {
  const LoginFormElement = document.querySelector('.container .auth .inner-signup-cont');
  LoginFormElement.style.display = 'none';
});
