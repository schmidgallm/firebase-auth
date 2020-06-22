// Sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  // prevent form from submitting
  e.preventDefault();

  // init user values
  const user = {
    email: signupForm['signup-email'].value,
    password: signupForm['signup-password'].value,
  };

  //   Sing up user to firebase
  auth.createUserWithEmailAndPassword(user.email, user.password).then((res) => {
    // close modal after successful response and clear form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});
