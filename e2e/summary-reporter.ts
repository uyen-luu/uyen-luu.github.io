import { appendFileSync } from 'node:fs';
import { basename } from 'node:path';
import type { FullResult, Reporter, Suite, TestCase } from '@playwright/test/reporter';

// Writes a results table to the GitHub Actions job summary (shown on the run page).
// Does nothing outside GitHub Actions.
const icons: Record<ReturnType<TestCase['outcome']>, string> = {
  expected: '✅',
  unexpected: '❌',
  flaky: '⚠️',
  skipped: '⏭️',
};

const stripAnsi = (text: string) => text.replace(/\u001b\[[0-9;]*m/g, '');
const cell = (text: string) => text.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');

function testName(test: TestCase): string {
  // titlePath is ['', project, file, ...describes, title]
  return [basename(test.location.file), ...test.titlePath().slice(3)].join(' › ');
}

function duration(test: TestCase): number {
  return test.results.reduce((total, r) => total + r.duration, 0);
}

export default class SummaryReporter implements Reporter {
  private suite?: Suite;

  onBegin(_config: unknown, suite: Suite): void {
    this.suite = suite;
  }

  onEnd(result: FullResult): void {
    const summaryFile = process.env['GITHUB_STEP_SUMMARY'];
    if (!summaryFile || !this.suite) return;

    const tests = this.suite.allTests();
    const count = (outcome: ReturnType<TestCase['outcome']>) => tests.filter((t) => t.outcome() === outcome).length;
    const target = process.env['E2E_BASE_URL'] ?? 'local build';
    const failed = tests.filter((t) => t.outcome() === 'unexpected');

    const lines = [
      `### ${result.status === 'passed' ? '✅' : '❌'} E2E tests: ${target}`,
      '',
      '| Passed | Failed | Flaky | Skipped | Duration |',
      '| --- | --- | --- | --- | --- |',
      `| ${count('expected')} | ${count('unexpected')} | ${count('flaky')} | ${count('skipped')} | ${(result.duration / 1000).toFixed(1)}s |`,
      '',
    ];

    if (failed.length) {
      lines.push('**Failed**', '');
      for (const test of failed) {
        const error = test.results.at(-1)?.error?.message ?? '';
        lines.push(`- \`${testName(test)}\`: ${cell(stripAnsi(error).split('\n')[0])}`);
      }
      lines.push('', 'The full report is attached to this run as an artifact.', '');
    }

    lines.push(
      `<details><summary>All tests (${tests.length})</summary>`,
      '',
      '| | Test | Time |',
      '| --- | --- | --- |',
      ...tests.map((t) => `| ${icons[t.outcome()]} | ${cell(testName(t))} | ${(duration(t) / 1000).toFixed(1)}s |`),
      '',
      '</details>',
      '',
    );

    appendFileSync(summaryFile, lines.join('\n'));
  }

  printsToStdio(): boolean {
    return false;
  }
}
