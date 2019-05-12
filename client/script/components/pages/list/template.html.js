export default `
<link rel="stylesheet" type="text/css" href="style/common.css">

<div class="page-content page-content--full-height" style="display: flex; flex-direction: column;">
  <div class="hpu-title" style="margin-bottom: 32px;">Exercises</div>

  <div style="text-align: center">
    <table class="hpu-exercise-list">
      <tr class="hpu-exercise-group-title-row">
        <th class="hpu-exercise-group-title">Basic components:</th>
        <th style="padding: 0 24px;" colspan="2">Personal best</th>
        <th colspan="2">Rank</th>
        <th></th>
      </tr>
      <tr class="hpu-exercise-list__exercise-row">
        <td class="hpu-exercise-list__exercise-name" data-exercise="dropdown">Dropdown</td>
        <!-- <td class="hpu-exercise-list__best-hints-used">2 hints,</td>
        <td class="hpu-exercise-list__best-time">03:12</td>
        <td class="hpu-exercise-list__rank">#1</td>
        <td class="hpu-exercise-list__total-user-completed">/ 2</td> -->
        <td class="hpu-exercise-list__missing-best" colspan="2">-</td>
        <td class="hpu-exercise-list__rank">-</td>
        <td class="hpu-exercise-list__total-user-completed">/ 2</td>
        <td class="hpu-exercise-list__action" data-exercise="dropdown">Play</td>
      </tr>
      <tr class="hpu-exercise-list__exercise-row">
        <td class="hpu-exercise-list__exercise-name" data-exercise="emptystate">Emptystate</td>
        <td class="hpu-exercise-list__missing-best" colspan="2">-</td>
        <td class="hpu-exercise-list__rank">-</td>
        <td class="hpu-exercise-list__total-user-completed">/ 2</td>
        <td class="hpu-exercise-list__action" data-exercise="emptystate">Play</td>
      </tr>
      <tr class="hpu-exercise-list__exercise-row">
        <td class="hpu-exercise-list__exercise-name" data-exercise="basic-card">Basic Card</td>
        <td class="hpu-exercise-list__missing-best" colspan="2">-</td>
        <td class="hpu-exercise-list__rank">-</td>
        <td class="hpu-exercise-list__total-user-completed">/ 1</td>
        <td class="hpu-exercise-list__action" data-exercise="basic-card">Play</td>
      </tr>

      <tr class="hpu-exercise-group-title-row">
        <th class="hpu-exercise-group-title" colspan="6">Advanced:</td>
      </tr>
      <tr class="hpu-exercise-list__exercise-row">
        <td class="hpu-exercise-list__exercise-name" data-exercise="complex-card">Complex Card</td>
        <td class="hpu-exercise-list__missing-best" colspan="2">-</td>
        <td class="hpu-exercise-list__rank">-</td>
        <td class="hpu-exercise-list__total-user-completed">/ 0</td>
        <td class="hpu-exercise-list__action" data-exercise="complex-card">Play</td>
      </tr>
      <tr class="hpu-exercise-list__exercise-row">
        <td class="hpu-exercise-list__exercise-name" data-exercise="navigation-bar">Navigation bar</td>
        <td class="hpu-exercise-list__missing-best" colspan="2">-</td>
        <td class="hpu-exercise-list__rank">-</td>
        <td class="hpu-exercise-list__total-user-completed">/ 0</td>
        <td class="hpu-exercise-list__action" data-exercise="navigation-bar">Play</td>
      </tr>

      <tr class="hpu-exercise-group-title-row">
        <th class="hpu-exercise-group-title" colspan="6">Pages:</td>
      </tr>
      <tr class="hpu-exercise-list__exercise-row">
        <td class="hpu-exercise-list__exercise-name" data-exercise="card-grid-page">Card Grid page</td>
        <td class="hpu-exercise-list__missing-best" colspan="2">-</td>
        <td class="hpu-exercise-list__rank">-</td>
        <td class="hpu-exercise-list__total-user-completed">/ 0</td>
        <td class="hpu-exercise-list__action" data-exercise="card-grid-page">Play</td>
      </tr>
    </table>
  </div>
</div>


<style>
  .hpu-exercise-list {
    border-collapse: collapse;
    white-space: nowrap;
    display: inline-block;
  }

  .hpu-exercise-group-title-row {
    vertical-align: baseline;
  }

  .hpu-exercise-group-title {
    font-size: 20px;
    padding: 24px 24px 8px 0;
    text-align: left;
  }

  .hpu-exercise-list__exercise-row {
    border-top: 1px solid var(--gray);
    border-bottom: 1px solid var(--gray);
    height: 40px;
  }

  .hpu-exercise-list__rank {
    text-align: right;
    padding-left: 40px;
  }

  .hpu-exercise-list__exercise-name {
    cursor: pointer;
    padding-left: 16px;
    text-align: left;
    transition: background-color .2s, color .2s;
  }

  .hpu-exercise-list__exercise-name:hover {
    background-color: var(--dark-gray-1);
    color: var(--white);
    text-decoration: underline;
  }

  .hpu-exercise-list__rank::after {
    content: '\\00a0';
  }

  .hpu-exercise-list__total-user-completed {
    padding-right: 40px;
  }

  .hpu-exercise-list__action {
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
    transition: background-color .2s, color .2s;
  }

  .hpu-exercise-list__action:hover {
    background-color: var(--dark-gray-1);
    color: var(--white);
    text-decoration: underline;
  }
</style>
`;
