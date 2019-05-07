export default ({ currentPath }) => `
  <link rel="stylesheet" href="/style/common.css">
  <link rel="stylesheet" href="${currentPath}style.css">

  <div class="hpu-top-menu">
    <div class="hpu-logo">
      <div>&lt;<span class="hpu-logo__name">html-puzzle</span>&gt;</div>
    </div>
    <div class="hpu-top-menu__login-button hpu-button">
      <div>Login</div>
    </div>
  </div>
`;
