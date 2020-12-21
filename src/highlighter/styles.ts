import { Scheme } from "./types";

export const molokai = (color: keyof Scheme<"molokai">) => ({
  value: (scheme: Scheme<"molokai">) =>
    `background: ${scheme[color]}; color: ${scheme["background"]}; font-size: 1.5em;`,
  string: (scheme: Scheme<"molokai">) =>
    `background: ${scheme["background"]}; color: ${scheme[color]}; font-size: 1.5em;`,
  line: (scheme: Scheme<"molokai">) =>
    "line-height: 1.6em; border-bottom: 4px solid white;",
  append: (scheme: Scheme<"molokai">) => "",
  prepend: (scheme: Scheme<"molokai">) => "",
});

export const dracula = (color: keyof Scheme<"dracula">) => ({
  value: (scheme: Scheme<"dracula">) =>
    `background: ${scheme[color]}; color: ${scheme["background"]}; font-size: 1.5em;`,
  string: (scheme: Scheme<"dracula">) =>
    `background: ${scheme["background"]}; color: ${scheme[color]}; font-size: 1.5em;`,
  line: (scheme: Scheme<"dracula">) => "",
  append: (scheme: Scheme<"dracula">) => "",
  prepend: (scheme: Scheme<"dracula">) => "",
});

export const unicorn = (color: keyof Scheme<"unicorn">) => ({
  value: (scheme: Scheme<"unicorn">) =>
    `background: ${scheme[color]}; color: ${scheme["background"]}; font-size: 1.5em;`,
  string: (scheme: Scheme<"unicorn">) => {
    if (color === "gradient") {
      return `background: ${scheme["background"]}; color: hotpink; font-size: 1.5em;`;
    } else {
      return `background: ${scheme["background"]}; color: ${scheme[color]}; font-size: 1.5em;`;
    }
  },
  line: (scheme: Scheme<"unicorn">) => "",
  append: (scheme: Scheme<"unicorn">) => "border-left: 4px solid white;",
  prepend: (scheme: Scheme<"unicorn">) => "",
});
