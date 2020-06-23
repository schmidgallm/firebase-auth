// get data
db.collection('prompts')
  .get()
  .then((snapshot) => {
    // call initPrompts from index
    initPrompts(snapshot.docs);
  });

// Auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('User logged in', user);
  } else {
    console.log('User not logged in');
  }
});

// Sign up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // init user values
  const user = {
    email: signupForm['signup-email'].value,
    password: signupForm['signup-password'].value,
  };

  //   Sing up user to firebase
  auth
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      // TODO
      // send verification email

      // close modal after successful response and clear form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});

// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
});

// Signin
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // init user values
  const user = {
    email: loginForm['login-email'].value,
    password: loginForm['login-password'].value,
  };
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      // close modal after successful response and clear form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
});
