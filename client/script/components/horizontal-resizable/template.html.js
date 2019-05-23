export default `
  <style>
    :host > * {
      box-sizing: border-box;
    }

    *, *:before, *:after {
      box-sizing: inherit;
    }


    .horizontal-resizable__container {
      display: flex;
      height: 100%;
      overflow: hidden;

    }

    .horizontal-resizable__separator {
      cursor: col-resize;
      flex: 0 0 8px;
      margin: 0 12px;
      user-select: none;
      -moz-user-select: none;
    }

    .horizontal-resizable__separator-line {
      background-color: var(--gray);
      margin: 0 3px;
      height: 100%;
    }

    .horizontal-resizable__left-pane {
      position: relative;
      overflow: auto;
    }

    .horizontal-resizable__right-pane {
      position: relative;
    }

    .horizontal-resizable__overlayed:after {
      content: '';
      position: absolute;
      display: block;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
    }

  </style>


  <div class="horizontal-resizable__container">

    <div class="horizontal-resizable__left-pane">
      <slot name="left"></slot>
    </div>

    <div class="horizontal-resizable__separator">
      <div class="horizontal-resizable__separator-line"></div>
    </div>

    <div class="horizontal-resizable__right-pane">
      <slot name="right"></slot>
    </div>

  </div>
`;
