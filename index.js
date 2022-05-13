const form = document.querySelector('form');

const validateNotEmpty = (input) => {
  const { value, name } = input;
  if (!value || value === "") {
    const errorDisplay = document.querySelector(`#${name}-error`);
    errorDisplay.innerHTML = `${input.dataset.name} is required`;
  }
}

const validateEmail = (input) => {

}

const validatePasswords = ({ value, dataset, name }) => {
  const confirmPassword = form.querySelector('#password').value;

  if (value !== confirmPassword) {
    const errorDisplay = document.querySelector(`#${name}-error`);
    errorDisplay.innerHTML = `${dataset.name} Does not match`;
  }
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