// @ts-check

import * as wins from './wins/main.js';

const tabTitle = location.hash.slice(1);
/** @type {HTMLDivElement} */ // @ts-ignore: index.html上にあるので非null
const headerElem = document.querySelector('#header');

headerElem.textContent = tabTitle;

if (wins[tabTitle]) {
  const win = wins[tabTitle];
  await win.setup();
} else {
}