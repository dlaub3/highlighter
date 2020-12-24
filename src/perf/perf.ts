import { Highlighter } from "../highlighter";

const dracula = new Highlighter({
  theme: "dracula",
  styles: {
    line: () => "line-height: 1.5em;",
  },
});

const molokai = new Highlighter({
  theme: "molokai",
  styles: {
    line: () => "line-height: 1.5em;",
  },
});

const unicorn = new Highlighter({
  theme: "unicorn",
  styles: {
    prepend: (colors) => `border-left: 4px solid white;`,
    line: () => `line-height: 1.5em;`,
  },
});

export function time(args: { fn: () => void; executions: number }): void {
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

export function count(args: { fn: () => void; milliseconds: number }): void {
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
    .purple`:heart: ${fn.name} executed emoji - [:heart: :unicorn:]- emoji ${count}times in ${milliseconds}ms${milliseconds}`;
  // eslint-disable-next-line
  unicorn.highlight
    .gradient`:party: ${fn.name} executed emoji - [:FIRE: :poOp:]- emoji ${count}times in ${milliseconds}ms${milliseconds}`;
}
