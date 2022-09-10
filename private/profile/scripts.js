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
const redditLogos = document.querySelectorAll('.header .logo');
const profileButton = document.querySelector('.profile');

profileButton.addEventListener('click', () => {
  const username = localStorage.getItem('username');
  window.location.href = `/api/v1/users/${username}`;
});

redditLogos.forEach((logo) => {
  logo.addEventListener('click', () => {
    window.location.href = '/';
  });
});

const getUsername = () => {
  const arr = window.location.href.split('/');
  return arr[arr.length - 1];
};

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

// ? Create the function which is responsible for generating the posts.
const createPosts = (array, isLogged, selector) => {
  const postsContainer = document.querySelector(selector);

  if (!array[0]) {
    const noData = document.createElement('h1');
    noData.textContent = 'No data to show!!';
    postsContainer.appendChild(noData);
    return;
  }

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

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    headSection.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => {
      fetch('/api/v1/posts/delete', {
        method: 'DELETE',
        body: JSON.stringify({
          id: post.id,
        }),
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
        },
      }).then((jsonData) => jsonData.json())
        .then((data) => {
          window.alert(`Row num: ${data.data.id} is deleted sucessfully!!!`);
          window.location.href = `/api/v1/users/${getUsername()}`;
        })
        .catch((err) => console.log(err));
    });

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
        updateVote(post.vote_id, 'upper', post.user_id, post.id, e);
        // ? Updating the votes count.
        getVotesCount(post.id, `[data-id="${post.id}"]`);
      });
    }

    const lowerVote = document.createElement('i');
    lowerVote.className = 'ri-arrow-down-s-line lower-vote';
    votesSection.appendChild(lowerVote);

    if (isLogged) {
      lowerVote.addEventListener('click', (e) => {
        updateVote(post.vote_id, 'lower', post.user_id, post.id, e);
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

// ? Fetching the ownProfileData endpoint.
fetch(`/api/v1/ownProfileData?username=${getUsername()}`)
  .then((jsonData) => jsonData.json())
  .then((data) => {
    createPosts(data.posts, data.isLoggedIn, '.own-posts');
    createPosts(data.upVoted, data.isLoggedIn, '.upvoted-posts');
    createPosts(data.downVoted, data.isLoggedIn, '.downvoted-posts');
  })
  .catch((err) => console.log(err));

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
        console.log(data);
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
  const usernameMob = document.querySelector('.user .username');
  usernameMob.textContent = username;
  usernameP.textContent = username;
});

// ? Creating the online ball functionality.
let isOnline = false;

// ? This setTimeOut's aim is to wait until the elements are rendered in the page.
setTimeout(() => {
  if (window.localStorage.getItem('online') === 'true') {
    const onlineBall = document.querySelector('.online-ball');
    const postsOnlineBall = document.querySelectorAll('.post .posts-online-ball');
    onlineStatusBox.classList.add('online');
    onlineBall.classList.add('online');
    postsOnlineBall.forEach((ball) => {
      ball.classList.add('online');
    });
    isOnline = true;
  }
}, 200);

onlineStatusBox.addEventListener('click', (e) => {
  const onlineBall = document.querySelector('.online-ball');
  const postsOnlineBall = document.querySelectorAll('.post .posts-online-ball');
  isOnline = !isOnline;
  e.target.classList.toggle('online');
  onlineBall.classList.toggle('online');
  postsOnlineBall.forEach((ball) => {
    ball.classList.toggle('online');
  });
  if (isOnline) {
    window.localStorage.setItem('online', 'true');
  } else {
    window.localStorage.setItem('online', 'false');
  }
});
