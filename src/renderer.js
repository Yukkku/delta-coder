// @ts-check

/**
 * @typedef {{
 *   setup: () => Promise<any>,
 *   stylePath?: string,
 * }}
 * Mod
 */

import * as mods from './mods/main.js';

const tabTitle = location.hash.slice(1);
/** @type {HTMLDivElement} */ // @ts-ignore: index.html上にあるので非null
const headerElem = document.querySelector('#header');

headerElem.textContent = tabTitle;

if (mods[tabTitle]) {
  /** @type {Mod} */
  const mod = mods[tabTitle];
  await mod.setup();
  if (mod.stylePath) {
    document.head.appendChild(Object.assign(document.createElement('link'), {
      rel: 'stylesheet',
      type: 'text/css',
      href: mod.stylePath,
    }));
  }
} else {
  /** @type {HTMLDivElement} */ // @ts-ignore: index.html上にあるので非null
  const mainElem = document.getElementById('main');
  mainElem.innerHTML = `<h3>Not Found</h3>`;
}
