// @ts-check

/**
 * @typedef {{
 *   stylePath?: string,
 *   modAPIs: { [K: string]: Function },
 * }}
 * Mod
 */

const tabTitle = location.hash.slice(1);
/** @type {HTMLDivElement} */ // @ts-ignore: index.html上にあるので非null
const headerElem = document.querySelector('#header');

headerElem.textContent = tabTitle;

/** @type {Mod} */
const mod = await import(`./mods/${tabTitle}/main.js`);

if (mod.stylePath) {
  document.head.appendChild(Object.assign(document.createElement('link'), {
    rel: 'stylesheet',
    type: 'text/css',
    href: mod.stylePath,
  }));
}
// @ts-ignore: JSDocでこれをやるのは厳しいか...?
window.modAPIs = mod.modAPIs;

export {};
