// @ts-check

const { ipcMain } = require('electron');
const { exec } = require('child_process');
const fs = require('fs');

/**
 * @param {number} timeLimit
 * @param {string} stdin
 * @returns {Promise<{
 *   stdout: string,
 *   stderr: string,
 *   isTLE: boolean,
 *   time: number,
 * }>}
 */
const test = (timeLimit, stdin) => new Promise(resolve => {
  const proc = exec('node ./judge/main.js');
  const startTime = performance.now();

  let stdout = '';
  let stderr = '';
  proc.stdin?.write(stdin);
  proc.stdin?.end();
  proc.stdout?.on('data', data => stdout += data);
  proc.stderr?.on('data', data => stderr += data);

  const killer = setTimeout(() => {
    proc.kill();
    const endTime = performance.now();
    resolve({ stdout, stderr, isTLE: true, time: endTime - startTime });
  }, timeLimit);
  
  proc.on('close', () => {
    clearTimeout(killer);
    const endTime = performance.now();
    resolve({ stdout, stderr, isTLE: false, time: endTime - startTime });
  });
});

//test().then(console.log);
ipcMain.handle('dc-tester',
/**
 * @param {string} code
 * @param {string} stdin
 */
async (event, code, stdin) => {
  if (stdin.at(-1) !== '\n') stdin += '\n';
  fs.writeFileSync('./judge/main.js', new TextEncoder().encode(code));
  const result = await test(1000, stdin);
  return result;
});

module.exports = {};
