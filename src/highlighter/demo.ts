import { SchemeName } from "./types";
import { Highlighter } from "./highlighter";
import * as schemes from "./colorSchemes";

export const demo = (): void => {
  let scheme: SchemeName;
  for (scheme in schemes) {
    const highligher = new Highlighter({ theme: scheme }) as any;
    for (const color in highligher.highlight) {
      if (color === "background" || color === "foreground") {
        continue;
      } else {
        highligher.highlight[
          color
        ]`theme :${scheme.toUpperCase()} with  color ${color.toUpperCase()}.`;
      }
    }
  }
};

demo();
