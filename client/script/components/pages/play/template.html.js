export default `
<link rel="stylesheet" type="text/css" href="style/common.css">
<link rel="stylesheet" type="text/css" href="script/components/puzzle/style.css">
<link rel="stylesheet" type="text/css" href="script/components/preview/style.css">

<style>
  .puzzle-container {
    background-color: rgb(30, 30, 30);
    min-height: 100%;
    padding: 16px;
    width: max-content;
    min-width: 100%;
  }
</style>

<div class="page-content page-content--full-height" style="display: flex; flex-direction: column;">

  <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px">
    <div id="exerciseName" class="hpu-title">&nbsp;</div>
    <div style="font-size: 20px">Hints: <span id="hintCounter">0</span>,&nbsp;&nbsp;&nbsp;Time: <hpu-clock></hpu-clock></div>
  </div>

  <div style="margin-bottom: 8px">
      <a id="documentationLinkButton" class="hpu-button" style="display: none;" target="_blank">Documentation</a>
      <button id="hintButton" class="hpu-button">Hint</button>
  </div>

  <hpu-horizontal-resizable ratio="0.66" style="flex: 1 0 0; overflow-y: scroll;">

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
