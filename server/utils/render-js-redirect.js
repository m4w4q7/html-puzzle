export const renderJsRedirect = (url) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
    <script>
      location.replace('${url}');
    </script>
  </head>
  <body></body>
</html>`;
