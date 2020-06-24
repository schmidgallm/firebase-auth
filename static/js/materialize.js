// Materliaze Events
document.addEventListener('DOMContentLoaded', () => {
  // Side nav trigger
  var sideNav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sideNav);

  // Init modals
  const modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  // Init dropdown lists
  const items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
