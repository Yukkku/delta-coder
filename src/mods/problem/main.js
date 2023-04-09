// @ts-check

import katex from 'katex';

document.head.appendChild(Object.assign(document.createElement('link'), {
  rel: 'stylesheet',
  type: 'text/css',
  href: '../node_modules/katex/dist/katex.min.css',
}));

console.log(katex);

export const setup = async () => {
  const htmlText = await fetch('https://atcoder.jp/contests/abs/tasks/arc065_a').then(res => res.text());
  const dom = new DOMParser().parseFromString(htmlText, 'text/html');
  /** @type {HTMLDivElement} */ //@ts-ignore: index.html上にあるので非null
  const mainElem = document.getElementById('main');
  Object.assign(mainElem.style, {
    overflow: 'hidden scroll',
    padding: '15px',
  });

  dom.querySelectorAll('var').forEach(elem => {
    katex.render(elem.textContent ?? '', elem);
  });

  mainElem.innerHTML = dom.querySelector('.lang-ja')?.innerHTML ?? '';
};
