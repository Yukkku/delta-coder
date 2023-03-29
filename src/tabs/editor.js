require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });
await new Promise(resolve => require(['vs/editor/editor.main'], resolve));

/** @type {HTMLDivElement} */
const elem = Object.assign(document.createElement('div'), {
  classList: ['tab-editor'],
  style: 'grid-area: editor;',
});

/** @type {HTMLDivElement} */
const editorElem = document.createElement('div');

elem.appendChild(editorElem);

/** @type {HTMLDivElement} */ // @ts-ignore: index.html上ではあります。
const mainGridElem = document.getElementById('mainGrid');
mainGridElem.appendChild(elem);

const editor = monaco.editor.create(
  editorElem,
  {
    value: 'console.log("Hello world!");',
    language: "javascript",
    theme: 'vs-dark',
  },
);

new ResizeObserver(() => {
  editor.layout();
}).observe(elem);

export default elem;
