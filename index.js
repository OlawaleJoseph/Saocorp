const form = document.querySelector('form');
const terms = document.querySelector('#terms');
const submitBtn = document.querySelector('.submit-form');
let errorFound = false;

const displayError = (condition, name, dataset, errorMessage) => {
  const errorDisplay = document.querySelector(`#${name}-error`);

  if (condition) {
    errorDisplay.innerHTML = `${dataset.name || ''} ${errorMessage}`;
    errorFound = true;
  } else {
    errorDisplay.innerHTML = '';
  }
}

const validateNotEmpty = (input) => {
  const { value, name, dataset, type, checked } = input;
  if (type === 'checkbox') {
    displayError(!checked, name, dataset, 'You must agree to the Terms and Conditions')
  } else {
    displayError(!value || value === "", name, dataset, 'is required')
  }
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
  });
  if(errorFound) return;

  form.reset();
  const toast = document.querySelector('.toast-message');
  toast.textContent = 'Registration successful';
  toast.classList.add('toast-success');
  const toastTimeOut = setTimeout(() => {
    toast.classList.remove('toast-success');
    clearTimeout(toastTimeOut);
  }, 3000)
});

terms.addEventListener('change', (e) => {
  const { checked } = e.target;
  submitBtn.disabled = !checked
})