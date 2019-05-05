export default `
<link rel="stylesheet" type="text/css" href="style/common.css">
<link rel="stylesheet" type="text/css" href="script/components/puzzle/style.css">
<link rel="stylesheet" type="text/css" href="script/components/preview/style.css">

<style>
  .puzzle-container {
    background-color: rgb(30, 30, 30);
    height: 100%;
    padding: 16px;
    width: max-content;
    min-width: 100%;
  }
</style>

<div class="page-content page-content--full-height" style="display: flex; flex-direction: column;">

  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px">
    <div id="exerciseName" class="hpu-title">&nbsp;</div>
    <button id="hintButton" style="cursor: pointer;">Show hint (under construction)</button>
    <div style="font-size: 20px">Hints: <span id="hintCounter">0</span>,&nbsp;&nbsp;&nbsp;Time: <hpu-clock></hpu-clock></div>
  </div>

  <hpu-horizontal-resizable ratio="0.66" style="flex: 1 0 0">

    <div class="puzzle-container" slot="left">
      <hpu-puzzle></hpu-puzzle>
    </div>

    <div slot="right" style="display: flex; flex-direction: column; height: 100%">
      <div>Current:</div>
      <hpu-preview style="flex: 1 0 0"id='currentPreview'></hpu-preview>
      <div style="margin-top: 16px">Goal:</div>
      <hpu-preview style="flex: 1 0 0" id='goalPreview'></hpu-preview>

    </div>
    </div>

  </hpu-horizontal-resizable>
</div>
`;
