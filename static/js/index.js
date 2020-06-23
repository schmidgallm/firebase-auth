// import prompts from firebase
const promptList = document.querySelector('.prompts');
const initPrompts = (data) => {
  // init empty html string we can append to
  let html = '';

  // if data does not exist
  if (data === undefined || data.length === 0) {
    promptList.innerHTML = '<h5 class="alert">Login to view prompts</h5>';

    // if data does exist
  } else {
    // loop through each doc of firebase collection and create li tag
    data.forEach((doc) => {
      const prompt = doc.data();
      const li = `
        <li>
            <div class="collapsible-header">${prompt.title}</div>
            <div class="collapsible-body">${prompt.content}</div>
        </li>
      `;

      // append each li
      html += li;
    });

    // init li tags into prompt ul div
    promptList.innerHTML = html;
  }
};

// show navbar links based by auth state
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const navLinksInit = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = 'block'));
    loggedOutLinks.forEach((link) => (link.style.display = 'none'));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = 'none'));
    loggedOutLinks.forEach((link) => (link.style.display = 'block'));
  }
};
