export default `
<link rel="stylesheet" type="text/css" href="style/common.css">
<link rel="stylesheet" type="text/css" href="script/components/exercise-list-element/style.css">
<link rel="stylesheet" type="text/css" href="script/components/exercise-list-group/style.css">

<div class="page-content page-content--full-height" style="display: flex; flex-direction: column;">
  <div class="hpu-title" style="margin-bottom: 32px;">Exercises</div>

  <div style="text-align: center">
    <table class="hpu-exercise-list__table">
      <thead>
        <tr class="hpu-exercise-group-title-row">
          <th></th>
          <th style="padding: 0 24px;" colspan="2">Personal best</th>
          <th style="text-align: right;" colspan="2">Rank</th>
          <th></th>
        </tr>
      </thead>
      <tbody class="hpu-exercise-list__content"></tbody>
    </table>
  </div>
</div>


<style>
  .hpu-exercise-list__table {
    border-collapse: collapse;
    white-space: nowrap;
    display: inline-block;
  }
</style>
`;
