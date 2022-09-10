const errorStatus = document.querySelector('.error-status');
const errorMessage = document.querySelector('.error-msg');

fetch('/api/v1/error/redirect')
  .then((jsonData) => jsonData.json())
  .then((error) => {
    errorStatus.textContent = error.status;
    errorMessage.textContent = error.message;
  })
  .catch((err) => console.log(err));
