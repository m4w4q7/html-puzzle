import { TopMenuComponent } from './components/top-menu/index.js';
import { HorizontalResizableComponent } from './components/horizontal-resizable/index.js';
import { PuzzleComponent } from './components/puzzle/index.js';
import { PreviewComponent } from './components/preview/index.js';
import { ClockComponent } from './components/clock/index.js';

customElements.define('hpu-top-menu', TopMenuComponent);
customElements.define('hpu-horizontal-resizable', HorizontalResizableComponent);
customElements.define('hpu-puzzle', PuzzleComponent);
customElements.define('hpu-preview', PreviewComponent);
customElements.define('hpu-clock', ClockComponent);
