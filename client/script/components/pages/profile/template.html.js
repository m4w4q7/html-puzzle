export default `
<link rel="stylesheet" type="text/css" href="style/common.css">

<div class="page-content page-content--centered">
  <form class="centered-box">
    <div class="hpu-title" style="margin-bottom: 24px">My Profile</div>

    <div class="hpu-input-field">
      <label class="hpu-label" for="name-input">Name:</label>
      <input class="name-input hpu-input" value="m4w4q7">
    </div>

    <div class="hpu-button-container">
      <div class="apply-button hpu-button">Apply</div>
    </div>

  </form>
</div>



<style>
  .centered-box {
    padding: 24px;
    background-color: var(--dark-gray-1);
    border-radius: 8px;
  }

  .hpu-input-field {
    margin-bottom: 24px;
    overflow: hidden;
    height: 64px;
    transition: height .2s;
  }

  .hpu-label {
    display: block;
    margin-bottom: 8px;
  }

  .hpu-input {
    display: block;
    margin-bottom: 8px;
    background-color: var(--light-gray-1);
    height: 32px;
    padding: 4px 8px;
    border-radius: 8px;
    border: 0;
    width: 240px;

    color: var(--black);
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  .hpu-input:focus {
    background-color: var(--white);
    outline: 0;
  }

  .hpu-button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
`;
