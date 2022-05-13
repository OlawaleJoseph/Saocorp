const form = document.querySelector('form');

const displayError = (condition, name, dataset, errorMessage) => {
  const errorDisplay = document.querySelector(`#${name}-error`);

  if (condition) {
    errorDisplay.innerHTML = `${dataset.name} ${errorMessage}`;
  } else {
    errorDisplay.innerHTML = '';
  }
}

const validateNotEmpty = (input) => {
  const { value, name, dataset } = input;
  displayError(!value || value === "", name, dataset, 'is required')
}

const validateEmail = (input) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { name, dataset } = input;
  displayError(!emailRegex.test(input.value), name, dataset, 'is invalid')
}

const validatePasswords = ({ value, dataset, name }) => {
  const confirmPassword = form.querySelector('#password').value;
  displayError(value !== confirmPassword, name, dataset, 'dos not match')
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    const { name, type, value } = input;
    validateNotEmpty(input)

    if (name === 'confirm-password') {
      validatePasswords(input)
    }
    
    if (type === 'email') {
      validateEmail(input)
    }
  })
});