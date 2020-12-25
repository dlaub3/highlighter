# highlighter

A utility for better console logs. 

### features
- themeable
- customizable
- variables used in template strings will be highlighted

```ts
const highlighter = new Highlighter({theme: 'dracula'})

dracula.highlight.yellow`failure to download: ${link}`
```


![Demo](./demo.png)

