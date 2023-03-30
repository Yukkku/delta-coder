// @ts-check

import { Problem } from './tabs/problem.js';
import { Editor } from './tabs/editor.js';

/** @type {HTMLDivElement} */ // @ts-ignore: index.html上にあるので大丈夫。
const mainGrid = document.getElementById('mainGrid');

mainGrid.append(
  new Problem('problem').outerElem,
  new Editor('editor').outerElem,
);
