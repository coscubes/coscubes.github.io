// Colour-scheme toggle. The saved value is applied inline in <head> so there
// is no flash; this only handles the click and persistence.
(function () {
  var root = document.documentElement;
  var button = document.querySelector('.theme-toggle');
  if (!button) return;

  function activeScheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'dark' || explicit === 'light') return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  button.addEventListener('click', function () {
    var next = activeScheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // Private browsing or blocked storage: the choice just won't persist.
    }
  });
})();
