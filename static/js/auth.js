// Auth status changes
auth.onAuthStateChanged((user) => {
  // If user logged in show data in snapshot
  if (user) {
    db.collection('prompts').onSnapshot(
      (snapshot) => {
        // call initPrompts from index
        initPrompts(snapshot.docs);

        // show links based on auth
        navLinksInit(user);
      },
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    );

    // if not logged in still call grab data function but pass empty array
  } else {
    // init empty array of prompts if no use so nothings shows
    initPrompts([]);

    // show links based on auth
    navLinksInit();
  }
});

// Create new prompt
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  // prevent form from submitting
  e.preventDefault();

  // init new prmopt object
  const prompt = {
    title: createForm['title'].value,
    content: createForm['content'].value,
  };

  // add to db
  db.collection('prompts')
    .add(prompt)
    .then(() => {
      // close modal and rest form
      const modal = document.querySelector('#modal-create');
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
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
      // auto create user
      return db.collection('users').doc(res.user.uid).set({
        bio: signupForm['signup-bio'].value,
      });
    })
    .then(() => {
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
