import { Highlighter, themes, schemes } from "../highlighter";

const highlighter = new Highlighter({
  theme: themes.dracula,
  scheme: schemes.dracula
});

export function time(args: { fn: () => void; executions: number }) {
  const { fn, executions } = args;
  let i = executions;
  const start = performance.now();
  while (i-- > 0) {
    fn();
  }
  const end = performance.now();

  // eslint-disable-next-line
  highlighter.highlight.purple`${fn.name} took ${
    end - start
  }ms to execute ${executions} times.`;
}

export function count(args: { fn: () => void; milliseconds: number }) {
  const { fn, milliseconds } = args;
  let count = 0;

  const start = performance.now();
  while (performance.now() - start < milliseconds) {
    fn();
    count++;
  }

  // eslint-disable-next-line
  highlighter.highlight
    .pink`${fn.name} executed ${count}times in ${milliseconds}ms`;
}
