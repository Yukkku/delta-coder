// @ts-check

import { Tab } from './tab.js';

import { Atcoder } from '../atcoder.js';
import katex from '../../node_modules/katex/dist/katex.mjs';

export class Problem extends Tab {
  /** @type {HTMLHeadingElement} */
  #titleElem;
  /** @type {HTMLDivElement} */
  #statementElem;

  /**
   * @param {string} tabid
   */
  constructor (tabid) {
    super(tabid);
    /** @type {{}} */
    this.related = {};

    this.#titleElem = Object.assign(document.createElement('h2'), {
      classList: ['title'],
    });

    this.#statementElem = Object.assign(document.createElement('div'), {
      classList: ['statement'],
    });

    this.innerElem.append(this.#titleElem, this.#statementElem);
    this.loadProblem('practice_1')
  }

  /**
   * @param {string} problemId
   */
  async loadProblem (problemId) {
    const problemInfo = await new Atcoder().getProblem(problemId);
  
    this.#titleElem.textContent = problemInfo.title || 'Not Found';
    this.#statementElem.innerHTML = problemInfo.statement;
  
    this.#statementElem.querySelectorAll('var').forEach(elem => {
      katex.render(elem.textContent, elem, {});
    });
  }
}
