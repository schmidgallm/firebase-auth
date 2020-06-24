// Add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');

  addAdminRole({ email: adminEmail }).then((res) => {
    console.log(res);
  });
});

// Auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult().then((idTokenResult) => {
      user.admin = idTokenResult.claims.admin;
      authUI(user);
    });
    db.collection('prompts').onSnapshot(
      (snapshot) => {
        initPrompts(snapshot.docs);
      },
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
    );
  } else {
    initPrompts([]);
    authUI();
  }
});

// Create new prompt
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const prompt = {
    title: createForm['title'].value,
    content: createForm['content'].value,
  };

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

  const user = {
    email: signupForm['signup-email'].value,
    password: signupForm['signup-password'].value,
  };

  auth
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      return db.collection('users').doc(res.user.uid).set({
        bio: signupForm['signup-bio'].value,
      });
    })
    .then(() => {
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector('.error').innerHTML = '';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      signupForm.querySelector('.error').innerHTML = errorMessage;
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

// Login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = {
    email: loginForm['login-email'].value,
    password: loginForm['login-password'].value,
  };

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector('.error').innerHTML = '';
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      loginForm.querySelector('.error').innerHTML = errorMessage;
    });
});
