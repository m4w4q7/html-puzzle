export const renderDocument = ({ cssUrls, jsUrls, css, js }) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
    ${renderExternalStyleSheets(cssUrls)}
    ${renderExternalScripts(jsUrls)}
    ${renderEmbeddedStyle(css)}
    ${renderEmbeddedScript(js)}
  </head>
  <body>
  </body>
</html>
`;


const renderExternalStyleSheets = styleSheets => styleSheets.map(url => {
  return `<link rel="stylesheet" type="text/css" href="${url}">`;
});


const renderExternalScripts = scripts => scripts.map(url => {
  return `<script src="${url}"></script>`;
});


const renderEmbeddedStyle = css => css ? `<style>${css}</style>` : '';

const renderEmbeddedScript = js => js ? `<script>${js}</script>` : '';
