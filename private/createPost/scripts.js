const searchInput = document.querySelector('#search');
const accountBox = document.querySelector('.account-nav .interface');
const onlineStatusBox = document.querySelector('.menu section.online-status');
const onlineBall = document.querySelector('.online-ball');

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
    });
  });
};

// ? Creating the eventLister to add show the autocomplete on input event
// ? and Fetching the data on the /api/v1/users/autocomplete endpoint.
searchInput.addEventListener('input', (e) => {
  e.target.nextElementSibling.style.display = 'block';
  e.target.nextElementSibling.nextElementSibling.style.display = 'block';
  fetch(`/api/v1/users/autocomplete?value=${e.target.value}`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      crateAutocomplete(data);
    });
});

// ? Creating the event listeners to activate the clickable fields in the page.
accountBox.addEventListener('click', () => {
  const menu = document.querySelector('.account-nav .menu');
  menu.classList.toggle('hidden');
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
