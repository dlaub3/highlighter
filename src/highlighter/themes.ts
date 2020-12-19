import * as schemes from "./colorSchemes";
import { Theme } from "./types";

const toDarkLight = (light: string = "black", dark: string = "light") => ({
  light,
  dark,
});

export const dracula: Theme = {
  error: toDarkLight(schemes.dracula.background, schemes.dracula.pink),
  info: toDarkLight(schemes.dracula.background, schemes.dracula.purple),
  warn: toDarkLight(schemes.dracula.background, schemes.dracula.yellow),
  log: toDarkLight(schemes.dracula.background, schemes.dracula.cyan),
};

export const molokai: Theme = {
  error: toDarkLight(schemes.molokai.background, schemes.molokai.red),
  info: toDarkLight(schemes.molokai.background, schemes.molokai.purple),
  warn: toDarkLight(schemes.molokai.background, schemes.molokai.yellow),
  log: toDarkLight(schemes.molokai.background, schemes.molokai.blue),
};

export const unicorn: Theme = {
  error: toDarkLight(schemes.unicorn.background, schemes.unicorn.pink),
  info: toDarkLight(schemes.unicorn.background, schemes.unicorn.purple),
  warn: toDarkLight(schemes.unicorn.background, schemes.unicorn.yellow),
  log: toDarkLight(schemes.unicorn.background, schemes.unicorn.blue),
};
