// @ts-check

import katex from '../../../node_modules/katex/dist/katex.mjs';

const htmlText = await fetch('https://atcoder.jp/contests/abs/tasks/arc065_a').then(res => res.text());
const dom = new DOMParser().parseFromString(htmlText, 'text/html');
/** @type {HTMLDivElement} */ //@ts-ignore: index.html上にあるので非null
const mainElem = document.getElementById('main');

dom.querySelectorAll('var').forEach(elem => {
  katex.render(elem.textContent ?? '', elem);
});

mainElem.innerHTML = dom.querySelector('.lang-ja')?.innerHTML ?? '';

export const stylePath = new URL('./style.css', import.meta.url);

export const modAPIs = {};
