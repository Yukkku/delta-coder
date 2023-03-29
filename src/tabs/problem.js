// @ts-check

import { Atcoder } from '../atcoder.js';
import katex from '../../node_modules/katex/dist/katex.mjs';

/** @type {HTMLDivElement} */
const elem = Object.assign(document.createElement('div'), {
  classList: ['tab-problem'],
  style: 'grid-area: problem;',
});

/** @type {HTMLHeadingElement} */
const titleElem = Object.assign(document.createElement('h2'), {
  classList: ['title'],
});
/** @type {HTMLDivElement} */
const statementElem = Object.assign(document.createElement('div'), {
  classList: ['statement'],
});

elem.append(titleElem, statementElem);

/** @type {HTMLDivElement} */ // @ts-ignore: index.html上ではあります。
const mainGridElem = document.getElementById('mainGrid');
mainGridElem.appendChild(elem);

/**
 * @param {string} problemId
 */
const loadProblem = async problemId => {
  const problemInfo = await new Atcoder().getProblem(problemId);

  titleElem.textContent = problemInfo.title || 'Not Found';
  statementElem.innerHTML = problemInfo.statement;

  elem.querySelectorAll('var').forEach(elem => {
    katex.render(elem.textContent, elem, {});
  });
};

loadProblem('practice_1');

export default elem;
