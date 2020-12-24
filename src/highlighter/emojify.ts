export const emojis_regex: Record<string, string> = {
  ":poop:": "💩",
  ":fire:": "🔥",
  ":unicorn:": "🦄",
  ":heart:": "❤️",
  ":bomb:": "💣",
  ":bang:": "💥",
  ":party:": "🎉",
};

export const emojify = (s: string): string => {
  for (const regex in emojis_regex) {
    s = s.replace(new RegExp(regex, "gi"), emojis_regex[regex]);
  }
  return s;
};
