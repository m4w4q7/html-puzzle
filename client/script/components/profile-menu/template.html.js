export default ({ currentPath }) => `
  <link rel="stylesheet" href="/style/common.css">
  <link rel="stylesheet" href="${currentPath}style.css">

  <div class="login-button hpu-button" style="display: none;">
    <div>Login</div>
  </div>
  <div class="profile-menu" style="display: none;">
    <div class="name-container"></div>
  </div>
`;
