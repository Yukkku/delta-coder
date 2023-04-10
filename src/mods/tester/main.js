
export const setup = async () => {
  const mainElem = document.getElementById('main');
  mainElem.innerHTML = `
    <input id="button" type="button" value="Test">
    <div id="stdout"></div>
    <div id="stderr"></div>
  `;

  const subwin = window.open('./index.html#editor');
  document.getElementById('button').addEventListener('click', async () => {
    const code = subwin.modAPI.getCode();

    const result = await window.dcAPI.tester(code, '');
    document.getElementById('stdout').innerText = result.stdout;
    document.getElementById('stderr').innerText = result.stderr;
  });

  window.modAPI = {};
};

export const stylePath = new URL('./style.css', import.meta.url);
