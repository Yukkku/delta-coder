// @ts-nocheck: requireとかの調整が大変

require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });
await new Promise(resolve => require(['vs/editor/editor.main'], resolve));

import { Tab } from './tab.js';

export class Editor extends Tab {
  /**
   * @param {string} tabid
   */
  constructor (tabid) {
    super(tabid);
    /** @type {{}} */
    this.related = {};

    const editor = monaco.editor.create(
      this.innerElem,
      {
        value: 'console.log("Hello world!");',
        language: "javascript",
        theme: 'vs-dark',
      },
    );

    new ResizeObserver(() => {
      editor.layout();
    }).observe(this.outerElem);
  }
}
