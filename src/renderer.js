import { Atcoder } from './atcoder.js';

require.config({ paths: { vs: '../node_modules/monaco-editor/min/vs' } });

/** @type {HTMLDivElement} */
const editorElem = document.querySelector('#editor');
/** @type {HTMLDivElement} */
const problemElem = document.querySelector('#problem');
/** @type {HTMLInputElement} */
const contestidElem = document.querySelector('#contestid');

await new Promise(resolve => require(['vs/editor/editor.main'], resolve));

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
/*
problemElem.appendChild(await new Atcoder().getProblem(contestidElem.value, 0));

contestidElem.addEventListener('change', async() => {
  problemElem.innerHTML = '';
  problemElem.appendChild(await new Atcoder().getProblem(contestidElem.value, 0));
});
*/

const problemInfo = await new Atcoder().getProblem('practice_1');
problemElem.querySelector('.title').innerHTML = problemInfo.title;
problemElem.querySelector('.statement').innerHTML = problemInfo.statement;
problemElem.querySelectorAll('var').forEach(elem => {
  katex.render(elem.textContent, elem);
});