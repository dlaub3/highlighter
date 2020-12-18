import * as schemes from "./colorSchemes";
import { Theme } from "./types";

const toDarkLight = (light: string = "black", dark: string = "light") => ({
  light,
  dark
});

export const dracula: Theme = {
  error: toDarkLight(schemes.dracula.background, schemes.dracula.pink),
  info: toDarkLight(schemes.dracula.background, schemes.dracula.purple),
  warn: toDarkLight(schemes.dracula.background, schemes.dracula.yellow),
  log: toDarkLight(schemes.dracula.background, schemes.dracula.cyan)
};

export default dracula;
