export const setup = async () => {
  // ES moduleで使いたい...!
  await new Promise(resolve => {
    const scriptElem = document.createElement('script');
    scriptElem.src = '../node_modules/monaco-editor/min/vs/loader.js';
    document.body.appendChild(scriptElem);
    scriptElem.addEventListener('load', resolve);
  });

  require.config({ paths: { vs: "../node_modules/monaco-editor/min/vs" } });

  await new Promise(resolve => require(["vs/editor/editor.main"], resolve));

  const editor = monaco.editor.create(
    document.getElementById("main"),
    {
      value: '',
      language: 'javascript',
      theme: 'vs-dark',
      tabSize: 2,
    }
  );
};
