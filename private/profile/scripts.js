const editIcon = document.querySelector('.edit-icon');
const closeIcon = document.querySelector('.header-mobile .close-icon');
const burgerMenu = document.querySelector('.burger-menu-icon');
const sideMenuCloseIcon = document.querySelector('.mobile-side-menu .close-icon');
const searchInputs = document.querySelectorAll('[name="search"]');
const mobileLogout = document.querySelector('.mobile-side-menu .logout');
const logoutBtn = document.querySelector('.account-nav .logout');
const accountBox = document.querySelector('.account-nav .interface');
const onlineStatusBox = document.querySelector('.menu section.online-status');
const textPost = document.querySelector('.post-options .text');
const linkPost = document.querySelector('.post-options .link');
const postGeneratorCloseIcon = document.querySelector('.mobile-post-container .close-icon');
const addNewIcon = document.querySelector('.add-icon');
const emptySearchIcons = document.querySelectorAll('.search-box .close-icon');
const ownPostsButton = document.querySelector('.own');
const upvotedPostsButton = document.querySelector('.upvoted');
const downvotedPostsButton = document.querySelector('.downvoted');

const showSection = (whichOne) => {
  const ownPostsSection = document.querySelector('.own-posts');
  const upvotedPostsSection = document.querySelector('.upvoted-posts');
  const downvotedPostsSection = document.querySelector('.downvoted-posts');
  if (whichOne === 'own') {
    ownPostsSection.style.display = 'block';
    upvotedPostsSection.style.display = 'none';
    downvotedPostsSection.style.display = 'none';

    ownPostsButton.style.borderBottom = '2px solid #24a0ed';
    ownPostsButton.style.color = '#24a0ed';
    upvotedPostsButton.style.borderBottom = 'none';
    upvotedPostsButton.style.color = '#6A6D6F';
    downvotedPostsButton.style.borderBottom = 'none';
    downvotedPostsButton.style.color = '#6A6D6F';
  } else if (whichOne === 'up') {
    upvotedPostsSection.style.display = 'block';
    ownPostsSection.style.display = 'none';
    downvotedPostsSection.style.display = 'none';

    upvotedPostsButton.style.borderBottom = '2px solid #24a0ed';
    upvotedPostsButton.style.color = '#24a0ed';
    ownPostsButton.style.borderBottom = 'none';
    ownPostsButton.style.color = '#6A6D6F';
    downvotedPostsButton.style.borderBottom = 'none';
    downvotedPostsButton.style.color = '#6A6D6F';
  } else if (whichOne === 'down') {
    downvotedPostsSection.style.display = 'block';
    ownPostsSection.style.display = 'none';
    upvotedPostsSection.style.display = 'none';

    downvotedPostsButton.style.borderBottom = '2px solid #24a0ed';
    downvotedPostsButton.style.color = '#24a0ed';
    ownPostsButton.style.borderBottom = 'none';
    ownPostsButton.style.color = '#6A6D6F';
    upvotedPostsButton.style.color = '#6A6D6F';
    upvotedPostsButton.style.borderBottom = 'none';
  }
};

ownPostsButton.addEventListener('click', () => {
  showSection('own');
});

upvotedPostsButton.addEventListener('click', () => {
  showSection('up');
});

downvotedPostsButton.addEventListener('click', () => {
  showSection('down');
});

const showPostOptions = (show) => {
  const postOptions = document.querySelector('.post-options');
  editIcon.style.display = show ? 'none' : 'block';
  closeIcon.style.display = show ? 'block' : 'none';
  postOptions.style.display = show ? 'flex' : 'none';
};

const showSideMenu = (show) => {
  const mobileSideMenu = document.querySelector('.mobile-side-menu');
  mobileSideMenu.style.display = show ? 'flex' : 'none';
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

// ? Creating the event listeners to activate the clickable fields in the page.
accountBox.addEventListener('click', () => {
  const menu = document.querySelector('.account-nav .menu');
  menu.classList.toggle('hidden');
});

// ? Fetch request for post creator page.
addNewIcon.addEventListener('click', () => {
  fetch('/api/v1/posts/generator')
    .then(() => {
      window.location.href = '/api/v1/posts/generator';
    });
});

textPost.addEventListener('click', () => {
  const postGeneratorBox = document.querySelector('.mobile-post-container');
  postGeneratorBox.style.display = 'block';
});

linkPost.addEventListener('click', () => {
  const postGeneratorBox = document.querySelector('.mobile-post-container');
  postGeneratorBox.style.display = 'block';
});

postGeneratorCloseIcon.addEventListener('click', () => {
  const postGeneratorBox = document.querySelector('.mobile-post-container');
  postGeneratorBox.style.display = 'none';
});

editIcon.addEventListener('click', () => {
  showPostOptions(true);
});

closeIcon.addEventListener('click', () => {
  showPostOptions(false);
});

burgerMenu.addEventListener('click', () => {
  showSideMenu(true);
});

sideMenuCloseIcon.addEventListener('click', () => {
  showSideMenu(false);
});

// ? Sending a fetch request to logout endpoint.
[logoutBtn, mobileLogout].forEach((btn) => {
  btn.addEventListener('click', () => {
    fetch('/api/v1/auth/logout')
      .then(() => {
        window.location.href = '/';
      }).catch((err) => console.log(err));
  });
});

window.addEventListener('load', () => {
  const usernameP = document.querySelector('.account-nav .username');
  const username = window.localStorage.getItem('username');
  usernameP.textContent = username;
});

// ? Creating the online ball functionality.
let isOnline = false;

// ? This setTimeOut's aim is to wait until the elements are rendered in the page.
setTimeout(() => {
  if (window.localStorage.getItem('online') === 'true') {
    const onlineBall = document.querySelector('.online-ball');
    const postsGeneratorOnlineBall = document.querySelector('.posts-online-ball');
    const postsOnlineBall = document.querySelectorAll('.post   .posts-online-ball');
    onlineStatusBox.classList.add('online');
    onlineBall.classList.add('online');
    postsGeneratorOnlineBall.classList.add('online');
    postsOnlineBall.forEach((ball) => {
      ball.classList.add('online');
    });
    isOnline = true;
  }
}, 200);

onlineStatusBox.addEventListener('click', (e) => {
  const onlineBall = document.querySelector('.online-ball');
  const postsGeneratorOnlineBall = document.querySelector('.posts-online-ball');
  const postsOnlineBall = document.querySelectorAll('.post .posts-online-ball');
  isOnline = !isOnline;
  e.target.classList.toggle('online');
  onlineBall.classList.toggle('online');
  postsGeneratorOnlineBall.classList.toggle('online');
  postsOnlineBall.forEach((ball) => {
    ball.classList.toggle('online');
  });
  if (isOnline) {
    window.localStorage.setItem('online', 'true');
  } else {
    window.localStorage.setItem('online', 'false');
  }
});
