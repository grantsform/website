// Spoiler reveal logic
// Adds click event to all elements with class 'spoiler' to toggle 'revealed' class

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.spoiler').forEach(function(el) {
    el.addEventListener('click', function() {
      el.classList.toggle('revealed');
    });
  });
});

// Highlight the current page in the navbar by adding `active` to the parent li.
// Normalizes `/` to `/index.html` and treats trailing-slash URLs as index pages.
document.addEventListener('DOMContentLoaded', function() {
  try {
    var curPath = window.location.pathname || '/';
    if (curPath.endsWith('/')) {
      curPath = curPath + 'index.html';
    }
    if (curPath === '/') curPath = '/index.html';

    // Clear any existing active markers (server may not have set them)
    document.querySelectorAll('.navbar .nav-item.active').forEach(function(li){
      li.classList.remove('active');
    });

    // Find matching nav links
    document.querySelectorAll('.navbar .nav-link').forEach(function(a){
      try {
        var href = a.getAttribute('href') || '';
        // Resolve relative URLs to absolute to reliably compare pathnames
        var url = new URL(href, window.location.origin);
        var ap = url.pathname || '/';
        if (ap.endsWith('/')) ap = ap + 'index.html';
        if (ap === '/') ap = '/index.html';

        if (ap === curPath) {
          var li = a.closest('li');
          if (li) li.classList.add('active');
          // also add aria-current for accessibility
          a.setAttribute('aria-current', 'page');
        }
      } catch (e) { /* ignore malformed hrefs */ }
    });
  } catch (e) { /* no-op on unexpected errors */ }
});
