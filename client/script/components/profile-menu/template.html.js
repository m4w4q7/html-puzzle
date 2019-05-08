export default `

  <div class="login-button-container" style="display: none">
    <div class="login-button hpu-button">Sign in with Google </div>
  </div>

  <div class="profile-menu" style="display: none;">
    <div class="name-container">
      <div class="name"></div>
    </div>
    <div class="dropdown-menu">
      <div class="profile-menu__sign-out dropdown-menu__item"><span>Sign out</span></div>
    </div>
  </div>



  <link rel="stylesheet" href="/style/common.css">

  <style>
    :host {
      height: 100%;
    }

    .login-button-container {
      display: flex;
      height: 100%;
      align-items: center;
    }

    .profile-menu {
      margin: 0 -16px;
      background-color: var(--dark-gray-3);
    }

    .name-container {
      padding: 0 16px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .dropdown-menu {
      display: none;
      cursor: pointer;
      box-shadow: 0 0px 8px rgba(0, 0, 0, .5);
      clip-path: inset(0 -10px -10px -10px);
    }

    .profile-menu:hover .dropdown-menu {
      display: block;
    }

    .dropdown-menu__item {
      padding: 0 16px;
      height: 48px;
      display: flex;
      align-items: center;
      transition: background-color .2s;
    }

    .dropdown-menu__item:hover {
      background-color: var(--dark-gray-1);
    }
  </style>
`;
