import { GetStyles, SchemeName } from "./types";

export const template: GetStyles<SchemeName> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]}; font-size: 1.5em;`,
  string: (scheme) =>
    `background: ${scheme["background"]}; color: ${scheme[color]}; font-size: 1.5em;`,
  line: (scheme) => "",
  append: (scheme) => "",
  prepend: (scheme) => "",
});

export const hamburger: GetStyles<"hamburger"> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]}; font-size: 1.5em;`,
  string: (scheme) =>
    `background: ${scheme["background"]}; color: ${scheme[color]}; font-size: 1.5em;`,
  line: (scheme) => "",
  append: (scheme) => "",
  prepend: (scheme) => "",
});

export const molokai: GetStyles<"molokai"> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]}; font-size: 1.5em;`,
  string: (scheme) =>
    `background: ${scheme["background"]}; color: ${scheme[color]}; font-size: 1.5em;`,
  line: (scheme) => "line-height: 1.6em; border-bottom: 4px solid white;",
  append: (scheme) => "",
  prepend: (scheme) => "",
});

export const dracula: GetStyles<"dracula"> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]}; font-size: 1.5em;`,
  string: (scheme) =>
    `background: ${scheme["background"]}; color: ${scheme[color]}; font-size: 1.5em;`,
  line: (scheme) => "",
  append: (scheme) => "",
  prepend: (scheme) => "",
});

export const unicorn: GetStyles<"unicorn"> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]}; font-size: 1.5em;`,
  string: (scheme) => {
    if (color === "gradient") {
      return `background: ${scheme["background"]}; color: hotpink; font-size: 1.5em;`;
    } else {
      return `background: ${scheme["background"]}; color: ${scheme[color]}; font-size: 1.5em;`;
    }
  },
  line: (scheme) => "",
  append: (scheme) => "border-left: 4px solid white;",
  prepend: (scheme) => "",
});
