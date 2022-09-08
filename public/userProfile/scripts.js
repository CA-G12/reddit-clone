/* eslint-disable no-alert */

const searchInputs = document.querySelectorAll('[name="search"]');
const burgerMenu = document.querySelector('.burger-menu-icon');
const sideMenuCloseIcon = document.querySelector('.mobile-side-menu .close-icon');
const loginButtons = document.querySelectorAll('.auth .login');
const signupFormButtons = document.querySelectorAll('.auth .signup');
const nextPhase = document.querySelector('.next-section');
const previousPhase = document.querySelector('.previous-section');
const emptySearchIcons = document.querySelectorAll('.search-box .close-icon');
const loginSubmit = document.querySelector('#login-submit');
const signupSubmit = document.querySelector('.signup-btn');
const accountBox = document.querySelector('.account-nav .interface');
const onlineStatusBox = document.querySelector('.menu section.online-status');
const onlineBall = document.querySelector('.online-ball');
const mobileLogout = document.querySelector('.mobile-side-menu .logout');
const logoutBtn = document.querySelector('.account-nav .logout');
const addNewIcon = document.querySelector('.add-icon');

const getUsername = () => window.location.href.split('=')[1];

const renderUserInfo = (info) => {
  const name = document.querySelector('.user-info .name');
  const username = document.querySelector('.user-info .username');
  const email = document.querySelector('.user-info .email');

  name.textContent = info.name;
  username.textContent = `u/${info.username}`;
  email.textContent = `e/${info.email}`;
};

// ? Create upper vote function.
const updateVote = (id, kind, uId, pId, e) => {
  fetch('/api/v1/posts/votes', {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      id,
      kind,
      userId: uId,
      postId: pId,
    }),
  })
    .then((jsonData) => jsonData.json())
    .then((data) => {
      if (data.kind === 'upper' && e.target.classList.contains('upper-vote')) {
        e.target.style.pointerEvents = 'none';
      }
      if (data.kind === 'lower' && e.target.classList.contains('lower-vote')) {
        e.target.style.pointerEvents = 'none';
      }
    })
    .catch((err) => console.log(err));
};

// ? Creating the function which is responsible for getting the votes count.
const getVotesCount = (id, selector) => {
  fetch('/api/v1/posts/get-votes', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  }).then((jsonData) => jsonData.json())
    .then((data) => {
      document.querySelector(selector).textContent = data.votes || 0;
    })
    .catch((err) => console.log(err));
};

const createPosts = (array, isLogged) => {
  const postsContainer = document.querySelector('.posts-container');

  array.forEach((post) => {
    const postSection = document.createElement('section');
    postSection.classList.add('post');
    postsContainer.appendChild(postSection);

    const headSection = document.createElement('section');
    headSection.classList.add('head');
    postSection.appendChild(headSection);

    const avatarOnlineSection = document.createElement('section');
    avatarOnlineSection.classList.add('avatar-online');
    headSection.appendChild(avatarOnlineSection);

    const userAvatar = document.createElement('img');
    userAvatar.src = '/assets/avatar-reddit.png';
    userAvatar.alt = 'user avatar';
    avatarOnlineSection.appendChild(userAvatar);

    const ballDiv = document.createElement('div');
    ballDiv.classList.add('posts-online-ball');
    avatarOnlineSection.appendChild(ballDiv);

    const usernameH3 = document.createElement('h3');
    usernameH3.classList.add('username');
    usernameH3.textContent = post.username;
    headSection.appendChild(usernameH3);

    const followBtn = document.createElement('button');
    followBtn.type = 'button';
    followBtn.classList.add('follow-btn');
    followBtn.textContent = 'Follow';
    headSection.appendChild(followBtn);

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = post.title;
    postSection.appendChild(title);

    const postText = document.createElement('p');
    postText.classList.add('post-text');
    postText.textContent = post.content;
    postSection.appendChild(postText);

    const votesSection = document.createElement('section');
    votesSection.classList.add('votes');
    postSection.appendChild(votesSection);

    const upperVote = document.createElement('i');
    upperVote.className = 'ri-arrow-up-s-line upper-vote';
    votesSection.appendChild(upperVote);

    const votesCount = document.createElement('h4');
    votesCount.className = 'vote-number';
    votesCount.setAttribute('data-id', post.id);
    votesSection.appendChild(votesCount);

    // ? Calling getVotesCount to get tht votes for the post from the database query.
    getVotesCount(post.id, `[data-id="${post.id}"]`);

    if (isLogged) {
      upperVote.addEventListener('click', (e) => {
        updateVote(post.vote_id, 'upper', post.user_id, post.post_id, e);
        // ? Updating the votes count.
        getVotesCount(post.id, `[data-id="${post.id}"]`);
      });
    }

    const lowerVote = document.createElement('i');
    lowerVote.className = 'ri-arrow-down-s-line lower-vote';
    votesSection.appendChild(lowerVote);

    if (isLogged) {
      lowerVote.addEventListener('click', (e) => {
        updateVote(post.vote_id, 'lower', post.user_id, post.post_id, e);
        // ? Updating the votes count.
        getVotesCount(post.id, `[data-id="${post.id}"]`);
      });
    }

    if (post.kind === 'upper') {
      upperVote.style.pointerEvents = 'none';
    }
    if (post.kind === 'lower') {
      lowerVote.style.pointerEvents = 'none';
    }

    const commentsSection = document.createElement('section');
    commentsSection.classList.add('comments');
    postSection.appendChild(commentsSection);

    const commentsIcon = document.createElement('i');
    commentsIcon.className = 'ri-question-answer-fill comments-icon';
    commentsSection.appendChild(commentsIcon);

    const commentsWord = document.createElement('p');
    commentsWord.classList.add('comments-text');
    commentsWord.textContent = 'Comments';
    commentsSection.appendChild(commentsWord);
  });
};

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
      optionDiv.addEventListener('click', () => {
        fetch(`/api/v1/users/profile?username=${row.username}`)
          .then(() => {
            window.location.href = `/api/v1/users/profile?username=${row.username}`;
          }).catch((err) => console.log(err));
      });

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

// ? Fetching user profile data.
fetch(`/api/v1/profileInfo?username=${getUsername()}`)
  .then((jsonData) => jsonData.json())
  .then((response) => {
    const { isLoggedIn, data } = response;
    createPosts(data);
    renderUserInfo(data[0]);
    if (isLoggedIn) {
      document.querySelector('.header').classList.add('logged-in');
    }
  }).catch((err) => console.log(err));

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
      .then((jsonData) => jsonData.json())
      .then((data) => {
        window.localStorage.setItem('username', data.username);
        window.localStorage.setItem('id', data.id);
        return data;
      })
      .then(() => {
        window.location.href = `/api/v1/users/profile?username=${getUsername()}`;
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
        window.location.href = `/api/v1/users/profile?username=${getUsername()}`;
        loginForm.style.display = 'flex';
      })
      .catch((err) => console.log(err));
  }
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

// ? Creating the event listeners to activate the clickable fields in the page.
accountBox.addEventListener('click', () => {
  const menu = document.querySelector('.account-nav .menu');
  menu.classList.toggle('hidden');
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

emptySearchIcons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    document.querySelectorAll('.autocomplete').forEach((box) => {
      const autoBox = box;
      autoBox.textContent = '';
      autoBox.style.display = 'none';
    });
    searchInputs.forEach((input) => {
      const search = input;
      search.value = '';
    });
    e.target.style.display = 'none';
  });
});

// ? Fetch request for post creator page.
addNewIcon.addEventListener('click', () => {
  fetch('/api/v1/posts/generator')
    .then(() => {
      window.location.href = '/api/v1/posts/generator';
    });
});

// ? Sending a fetch request to logout endpoint.
[logoutBtn, mobileLogout].forEach((btn) => {
  btn.addEventListener('click', () => {
    fetch('/api/v1/auth/logout')
      .then(() => {
        window.location.href = `/api/v1/users/profile?username=${getUsername()}`;
      }).catch((err) => console.log(err));
  });
});

window.addEventListener('load', () => {
  const usernameP = document.querySelector('.account-nav .username');
  const username = window.localStorage.getItem('username');
  usernameP.textContent = username;
});

let isOnline = false;

if (window.localStorage.getItem('online') === 'true') {
  onlineStatusBox.classList.add('online');
  onlineBall.classList.add('online');
  isOnline = true;
} else {
  onlineStatusBox.classList.remove('online');
  onlineBall.classList.remove('online');
}

onlineStatusBox.addEventListener('click', (e) => {
  isOnline = !isOnline;
  e.target.classList.toggle('online');
  onlineBall.classList.toggle('online');
  if (isOnline) {
    window.localStorage.setItem('online', 'true');
  } else {
    window.localStorage.setItem('online', 'false');
  }
});
