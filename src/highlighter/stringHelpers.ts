import { identity } from "../utils/common";
import { emojis } from "./emojis";

export function mergeXY(xs: Array<unknown>, ys: Array<unknown>): string {
  return xs.reduce((acc: string, str: unknown, i: number) => {
    return `${acc}${ys[i - 1] ? ys[i - 1] : ""}${str}`;
  }, "");
}

export const transform = (
  transformers: {
    val: (v: unknown) => unknown;
    str: (s: string) => unknown;
    merge: (xs: unknown[], xy: unknown[]) => unknown;
  } = { val: identity, str: identity, merge: mergeXY },
) => (strings: any, ...values: Array<unknown>) => {
  return transformers.merge(
    strings.map(transformers.str),
    values.map(transformers.val),
  );
};

export const emojify = (s: string): string => {
  let emoji: Exclude<keyof typeof emojis, "string">;
  for (emoji in emojis) {
    s = s.replace(new RegExp(`:${emoji}:`, "gi"), emojis[emoji]);
  }
  return s;
};
