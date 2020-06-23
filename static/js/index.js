// import prompts from firebase
const promptList = document.querySelector('.prompts');
const initPrompts = (data) => {
  // init empty html string we can append to
  let html = '';

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
};
