export default `

  <div class="hpu-top-menu">
    <div class="hpu-logo">
      <div>&lt;<span class="hpu-logo__name">html-puzzle</span>&gt;</div>
    </div>

    <hpu-profile-menu></hpu-profile-menu>
  </div>



  <link rel="stylesheet" href="/style/common.css">

  <style>
    .hpu-top-menu {
      background-color: var(--dark-gray-3);
      display: flex;
      height: 48px;
      justify-content: space-between;
      padding: 0 32px;
      position: fixed;
      top: 0;
      width: 100vw;
      align-items: center;
      z-index: 1000;
    }

    .hpu-logo {
      align-items: center;
      color: var(--gray);
      cursor: pointer;
      display: flex;
      font-family: "SF Mono", Menlo, Monaco, "Courier New", monospace;
      font-size: 18px;
      height: 48px;
      user-select: none;
      -moz-user-select: none;
    }

    .hpu-logo__name {
      color: var(--dark-blue);
    }
  </style>
  `;
