// @ts-check

/**
 * タブのフレーム。何もない
 */
export class Tab {
  /**
   * @param {string} tabid
   */
  constructor (tabid) {
    /** @type {HTMLDivElement} */
    this.innerElem = Object.assign(document.createElement('div'), {
      classList: ['dc-inner'],
    });
    /** @type {HTMLDivElement} */
    this.outerElem = Object.assign(document.createElement('div'), {
      classList: ['dc-tab'],
    });

    this.outerElem.dataset.title = this.constructor.name;
    this.outerElem.dataset.id = tabid;
    this.outerElem.style.gridArea = tabid;

    /** @type {{[K in string]?: Tab}} */
    this.related = {};

    this.outerElem.appendChild(this.innerElem);
  }
}
