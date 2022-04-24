const form = document.getElementById('form');
const usernam = document.getElementById('usernam');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

//show input success
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

//Check email
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not Valid');
  }
}

//Check Required Fields
const checkRequired = (inputArr) => {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${capitalizeFirstLetter(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

//Check length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${capitalizeFirstLetter(input)} must be ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${capitalizeFirstLetter(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

//Capitalize first letter
function capitalizeFirstLetter(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check passwords match
const passwordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match!');
  } else {
    showSuccess(input2);
  }
};

//Refactored event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  passwordsMatch(password, password2);
});

// //add event listeners
// form.addEventListener('submit', function (e) {
//   e.preventDefault();

//   if (username.value === '') {
//     showError(username, 'Username is required');
//   } else {
//     showSuccess(username);
//   }
//   if (email.value === '') {
//     showError(email, 'Email is required');
//   } else if (!isValidEmail(email.value)) {
//     showError(email, 'Email is not valid');
//   } else {
//     showSuccess(email);
//   }
//   if (password.value === '') {
//     showError(password, 'Password is required');
//   } else {
//     showSuccess(password);
//   }
//   if (password2.value === '') {
//     showError(password2, 'Re=enter Password');
//   } else {
//     showSuccess(password2);
//   }
// });
