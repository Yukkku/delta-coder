
require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });

/** @type {HTMLDivElement} */
const editorElem = document.querySelector('#editor');
/** @type {HTMLDivElement} */
const problemElem = document.querySelector('#problem');

require(['vs/editor/editor.main'], () => {
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
  }).observe(editorElem);
});

(async () => {
  const contestId = 'utpc2022';

  const htmlText = await fetch(`https://atcoder.jp/contests/${contestId}/tasks_print`).then(res => res.text());
  /** @type {HTMLElement} */
  const probCt = new DOMParser().parseFromString(htmlText, 'text/html').querySelector('.row');

  for (const elem of probCt.getElementsByTagName('var')) {
    katex.render(elem.textContent, elem);
  }

  problemElem.appendChild(probCt);
})();
