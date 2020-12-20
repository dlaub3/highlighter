import { Highlighter } from "../highlighter";

const dracula = new Highlighter({
  name: "dracula",
  styles: "border-bottom: 4px solid white; line-height: 1.6em;",
});

const molokai = new Highlighter({
  name: "molokai",
});

const unicorn = new Highlighter({
  name: "unicorn",
  styles: "border-left: 4px solid white; line-height: 1.6em;",
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
  dracula.highlight.purple`${fn.name} took ${
    end - start
  }ms to execute ${executions} times.`;

  // eslint-disable-next-line
  molokai.highlight.green`${fn.name} took ${
    end - start
  }ms to execute ${executions} times.`;

  molokai.highlight.lightOrange`${fn.name} took ${
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
  dracula.highlight
    .cyan`${fn.name} executed ${count}times in ${milliseconds}ms`;

  // eslint-disable-next-line
  unicorn.highlight
    .purple`${fn.name} executed ${count}times in ${milliseconds}ms`;
  // eslint-disable-next-line
  unicorn.highlight
    .gradient`${fn.name} executed ${count}times in ${milliseconds}ms`;
}
