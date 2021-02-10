import { GetStyles, SchemeName } from "./types";

export const template: GetStyles<SchemeName> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]};`,
  string: (scheme) =>
    `background: ${scheme["background"]}; color: ${scheme[color]};`,
  line: (scheme) => "font-size: 1.5em;",
  append: (scheme) => "",
  prepend: (scheme) => "",
});

export const hamburger: GetStyles<"hamburger"> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]}; font-weight: bold;`,
  string: (scheme) =>
    `background: ${scheme["background"]}; color: ${scheme[color]};`,
  line: (scheme) =>
    "font-family: Arial, sans-serif; font-size: 1.5em; line-height:1.8em;",
  append: (scheme) => "font-size: 1.5em;",
  prepend: (scheme) => "",
});

export const molokai: GetStyles<"molokai"> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]};`,
  string: (scheme) =>
    `background: ${scheme["background"]}; color: ${scheme[color]};`,
  line: (scheme) => "font-size: 1.5em; line-height:1.8em;",
  append: (scheme) => "",
  prepend: (scheme) => "",
});

export const dracula: GetStyles<"dracula"> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]};`,
  string: (scheme) =>
    `background: ${scheme["background"]}; color: ${scheme[color]};`,
  line: (scheme) => "font-size: 1.5em; line-height:1.8em;",
  append: (scheme) => "",
  prepend: (scheme) => "",
});

export const unicorn: GetStyles<"unicorn"> = (color) => ({
  value: (scheme) =>
    `background: ${scheme[color]}; color: ${scheme["background"]};`,
  string: (scheme) => {
    if (color === "gradient") {
      return `background: ${scheme["background"]}; color: hotpink;`;
    } else {
      return `background: ${scheme["background"]}; color: ${scheme[color]};`;
    }
  },
  line: (scheme) => "font-size: 1.5em; line-height:1.8em;",
  append: (scheme) => "border-left: 4px solid white;",
  prepend: (scheme) => "",
});
