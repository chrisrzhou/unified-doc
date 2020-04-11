# text-parse
[unified][unified] [parser][parser] to parse text content into a [hast][hast] tree with a single text node.


## Install
```sh
yarn add @unified-doc/text-parse
```


## Use
```js
import text from '@unified-doc/text-parse';
import unified from 'unified';
import html from 'rehype-stringify';

const processor = unified()
	.use(text)
	.use(html)

processor.parse('\na to the \nb to the \n\nc to the d');
```

Yields a [hast][hast] tree where the input content string is represented as a single text node.

```js
{
	type: 'root',
	children: [
		{
			type: 'text',
			value: '\na to the \nb to the \n\nc to the d',
			position: {
				start: {
					column: 1,
					line: 1,
					offset: 0,
				},
				end: {
					column: 11,
					line: 5,
					offset: 32,
				},
			},
		},
	],
}
```


## API
```ts
export default function parse(): void;
```

Simply use the plugin with any unified processor.


<!-- Links -->
[hast]: https://github.com/syntax-tree/hast
[parser]: https://github.com/unifiedjs/unified#parser
[unified]: https://unifiedjs.com/

<!-- Hack to make importing mdx work in docz/gatsby... -->
export default ({ children }) => children
