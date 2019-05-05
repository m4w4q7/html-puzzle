export const renderDocument = ({ css, js }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    ${renderStyleSheets(css)}
    ${renderScripts(js)}
  </head>
  <body>
  </body>
</html>
`;


const renderStyleSheets = styleSheets => styleSheets.map(url => {
  return `<link rel="stylesheet" type="text/css" href="${url}">`;
});


const renderScripts = scripts => scripts.map(url => {
  return `<script src="${url}"></script>`;
});
