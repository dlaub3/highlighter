# @catpic/console-highlighter

Highlight console log messages with style.

### Features
- themeable
- customizable
- automatic highlighting (variables used in template strings will be highlighted)

### How to
```ts
yarn add @catpic/console-highlighter
```

```ts
const highlighter = new Highlighter({theme: 'dracula'})

highlighter.highlight.yellow`:fire: ${count} messages sent.`

```

Supported Regexp Emojis: 

```ts
export const emojis = {
  poop: "💩",
  happy: "😀",
  unicorn: "🦄",
  rainbow: "🌈",
  party: "🎉",
  heart: "❤️",
  bomb: "💣",
  bang: "💥",
  dynamite: "🧨",
  fire: "🔥",
};


```

![Demo](./img/demo.png)

```ts
const highlighter = new Highlighter({ 
  theme: 'unicorn'
  styles: { line: () => "display: block;" },
})
```

![display: block](./img/demo.png)


### TODO
- [ ] Expose combinators for building custom highlighters.
