export const renderJsRedirect = (url, { localStorage } = {}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
    <script>
      ${renderLocalStorage(localStorage)}
      location.replace('${url}');
    </script>
  </head>
  <body></body>
</html>`;


const renderLocalStorage = (localStorage = {}) => Object.entries(localStorage).map(([key, value]) => {
  return `localStorage.setItem('${escapeQuote(key)}', '${escapeQuote(value)}');`;
}).join('');


const escapeQuote = text => text && text.replace(`'`, `\\'`);
