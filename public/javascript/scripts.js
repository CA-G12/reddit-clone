/* eslint-disable no-alert */
// ? Targeting DOM elements.
const editIcon = document.querySelector('.edit-icon');
const closeIcon = document.querySelector('.header-mobile .close-icon');
const burgerMenu = document.querySelector('.burger-menu-icon');
const sideMenuCloseIcon = document.querySelector('.mobile-side-menu .close-icon');
const mobileLogout = document.querySelector('.mobile-side-menu .logout');
const searchInput = document.querySelectorAll('[name="search"]');
const accountBox = document.querySelector('.account-nav .interface');
const loginButtons = document.querySelectorAll('.auth .login');
const loginSubmit = document.querySelector('#login-submit');
const signupSubmit = document.querySelector('.signup-btn');
const signupFormButton = document.querySelectorAll('.auth .signup');
const nextPhase = document.querySelector('.next-section');
const previousPhase = document.querySelector('.previous-section');
const logoutBtn = document.querySelector('.account-nav .logout');

// ? Creating loggedInToggle function.
const loggedInToggle = (isLogged) => {
  const header = document.querySelector('.header');
  if (isLogged) {
    header.classList.toggle('logged-in');
  }
};

// ? Creating the function which is responsible for creating the autocomplete options.
const crateAutocomplete = (array) => {
  const autocompleteElements = document.querySelectorAll('.autocomplete');
  autocompleteElements.forEach((ele) => {
    // eslint-disable-next-line no-param-reassign
    ele.innerHTML = '';
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

      const usernameProfile = document.querySelector('.user .username');
      usernameProfile.textContent = row.username;
    });
  });
};

// ? Creating the function which is responsible for validating the form elements.
const validateLogin = (username, password) => {
  const isUsernameValid = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
  const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/.test(password);

  if (!isUsernameValid) {
    window.alert('Username must be begin and end with letter or numbers, and be between 5 and 20 characters');
  }
  if (!isPasswordValid) {
    window.alert('Password must contains one lower case letter, one upper case letter, one number and one sign, and be at least 7 characters');
  }

  return isPasswordValid && isUsernameValid;
};

// ? Creating the function which validates the signup form.
const validateSignup = ({
  username, password, confirmPassword, email, fname, lname, phone,
}) => {
  const isUsernameValid = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);
  const isPasswordValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/.test(password);
  const isPasswordConfirmed = password === confirmPassword;
  const isEmailValid = /^[a-zA-z0-9]?.*@[a-zA-z0-9]{1,}\.[a-zA-Z]{1,}$/.test(email);
  const isFnameValid = /^[a-zA-Z]{3,}$/.test(fname);
  const isLnameValid = /^[a-zA-Z]{3,}$/.test(lname);
  const isPhoneValid = /[0-9]{10}/.test(phone);

  if (!isUsernameValid) {
    window.alert('Username must be begin and end with letter or numbers, and be between 5 and 20 characters');
  }
  if (!isPasswordValid) {
    window.alert('Password must contains one lower case letter, one upper case letter, one number and one sign, and be at least 7 characters');
  }
  if (!isPasswordConfirmed) {
    window.alert('Confirm password must the first entered password');
  }
  if (!isEmailValid) {
    window.alert('Email must be a valid email address');
  }
  if (!isFnameValid) {
    window.alert('Name must contains letters only and a minimal length of 3 characters');
  }
  if (!isLnameValid) {
    window.alert('Name must contains letters only and a minimal length of 3 characters');
  }
  if (!isPhoneValid) {
    window.alert('Phone must contains only numbers and must be of a length of 10 characters');
  }

  return (isUsernameValid && isPasswordValid && isPasswordConfirmed && isEmailValid)
  && (isPhoneValid && isFnameValid && isLnameValid);
};

// ? Fetching the login form to login endpoint;
loginSubmit.addEventListener('click', () => {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  if (validateLogin(username, password)) {
    fetch('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        window.location.href = '/';
      })
      .catch((err) => console.log(err));
  }
});

// ? Fetching the signup form to signup endpoint;
signupSubmit.addEventListener('click', () => {
  const loginForm = document.querySelector('.login-form');
  const username = document.querySelector('#signup-username').value;
  const password = document.querySelector('#signup-password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;
  const email = document.querySelector('#email').value;
  const fname = document.querySelector('#fname').value;
  const lname = document.querySelector('#lname').value;
  const phone = document.querySelector('#phone').value;
  if (validateSignup({
    username, password, confirmPassword, email, fname, lname, phone,
  })) {
    fetch('/api/v1/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
        fname,
        lname,
        phone,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        window.location.href = '/';
        loginForm.style.display = 'flex';
      })
      .catch((err) => console.log(err));
  }
});

// ? Creating the eventLister to add show the autocomplete on input event
// ? and Fetching the data on the /api/v1/users/autocomplete endpoint.
searchInput.forEach((input) => {
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

// ? Sending a fetch request to logout api.
logoutBtn.addEventListener('click', () => {
  fetch('/api/v1/auth/logout')
    .then(() => {
      console.log('here');
      window.location.href = '/';
    }).catch((err) => console.log(err));
});

mobileLogout.addEventListener('click', () => {
  fetch('/api/v1/auth/logout')
    .then(() => {
      console.log('here');
      window.location.href = '/';
    }).catch((err) => console.log(err));
});

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

signupFormButton.forEach((button) => {
  button.addEventListener(('click'), () => {
    const LoginFormElement = document.querySelector('.container .auth .inner-signup-cont');
    LoginFormElement.style.display = 'flex';
  });
});

nextPhase.addEventListener('click', () => {
  const firstPhase = document.querySelector('.first-phase');
  const secondPhase = document.querySelector('.second-phase');
  firstPhase.style.display = 'none';
  secondPhase.style.display = 'flex';
});

previousPhase.addEventListener('click', () => {
  const firstPhase = document.querySelector('.first-phase');
  const secondPhase = document.querySelector('.second-phase');
  firstPhase.style.display = 'flex';
  secondPhase.style.display = 'none';
});

document.querySelector('.container .auth .login-section .close-icon').addEventListener('click', () => {
  const LoginFormElement = document.querySelector('.container .auth .inner-cont');
  LoginFormElement.style.display = 'none';
});

document.querySelector('.signup-section .close-icon').addEventListener('click', () => {
  const LoginFormElement = document.querySelector('.container .auth .inner-signup-cont');
  LoginFormElement.style.display = 'none';
});
