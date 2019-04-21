export default
  `<style>
    .tag-name {
      color: #569cd6;
    }

    .children {
      border-left: 1px solid rgb(64, 64, 64);
      overflow-y: hidden;
      padding-left: calc(2ch - 1px);
    }
  </style>` +

  `<div class="line">` +
    `<span class="tag-name"></span>` +
    `<hpu-puzzle-id class="id"></hpu-puzzle-id>` +
    `<hpu-puzzle-class-list class="class-list"></hpu-puzzle-class-list>` +
    `<hpu-puzzle-attribute-list class="attribute-list"></hpu-puzzle-attribute-list>` +
  `</div>` +
  `<div class="children">` +
    `<hpu-puzzle-block-list class="block-list"></hpu-puzzle-block-list>` +
  `</div>`;
