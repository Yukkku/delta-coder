// @ts-check

/**
 * @typedef {{
 *   contestId: [string, ...string[]], // コンテストID
 *   title?: string, // 問題名
 *   statement?: string, // 問題文
 * }} ProblemInfo
 */

// https://kenkoooo.com/atcoder/resources/merged-problems.json

export class Atcoder {
  /**
   * @param {string} problemId
   * @return {Promise<Required<ProblemInfo>>}
   */
  async getProblem (problemId) {
    if (!Atcoder.problemsInfo.has(problemId)) {
      /** @type {{ contest_id: string, problem_id: string, problem_index: string }[]} */
      const pairs = await fetch('https://kenkoooo.com/atcoder/resources/contest-problem.json').then(res => res.json());
      pairs.forEach(pair => {
        const maybeInfo = Atcoder.problemsInfo.get(pair.problem_id);

        if (maybeInfo) {
          maybeInfo.contestId.push(pair.problem_id);
        } else {
          Atcoder.problemsInfo.set(pair.problem_id, {
            contestId: [pair.contest_id],
          });
        }
      });
    }

    const problemInfo = Atcoder.problemsInfo.get(problemId);

    if (!problemInfo) return {
      contestId: [''],
      title: '',
      statement: '',
    };

    if (!problemInfo.statement) {
      const htmlText = await fetch(`https://atcoder.jp/contests/${problemInfo.contestId[0]}/tasks/${problemId}`).then(res => res.text());
      const dom = new DOMParser().parseFromString(htmlText, 'text/html');
      const statement = dom.querySelector('#task-statement .lang-ja')?.innerHTML ?? '';
      const title = dom.querySelector('.h2')?.textContent ?? '';

      problemInfo.statement = statement;
      problemInfo.title = title;
    }

    // @ts-ignore: 合ってるの!
    return problemInfo;
  }

  /** @type {Map<string, ProblemInfo>} 問題ID -> 問題情報 */
  static problemsInfo = new Map();
}
