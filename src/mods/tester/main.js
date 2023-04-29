/** @type {HTMLDivElement} */
const mainElem = document.getElementById('main');
mainElem.innerHTML = `
  <input id="button" type="button" value="Test"><br>
  stdin
  <textarea id="stdin"></textarea><br>
  stdout
  <div id="stdout"></div>
  stderr
  <div id="stderr"></div>
`;

/** @type {HTMLDivElement} */
const buttonElem = document.getElementById('button');
/** @type {HTMLTextAreaElement} */
const stdinElem = document.getElementById('stdin');
/** @type {HTMLDivElement} */
const stdoutElem = document.getElementById('stdout');
/** @type {HTMLDivElement} */
const stderrElem = document.getElementById('stderr');

const subwin = window.open('./index.html#editor');
buttonElem.addEventListener('click', async () => {
  const code = subwin.modAPIs.getCode();

  const result = await window.dcAPIs.tester(code, stdinElem.value);
  stdoutElem.innerText = result.stdout;
  stderrElem.innerText = result.stderr;
});

export const stylePath = new URL('./style.css', import.meta.url);

export const modAPIs = {};
