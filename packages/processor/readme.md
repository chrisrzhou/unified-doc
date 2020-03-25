# processor

[**unified**][unified] [processor][processor] for processing content and annotations in `unified-doc`.

## Install

```sh
yarn add @unified-doc/processor
```

## Description
`unified-doc` uses a unified/[unified][unified] processor to map content into [hast][hast] trees.  It provides a single entry point to define content (e.g. text, HTML, markdown) and converts it into a common syntax tree where an ecosytem of hast plugins can operate on it.

## Use

```js
import { createProcessor } from '@unified-doc/processor';

const defaultProcessor = createProcessor();
const textProcessor = createProcessor('text'); // same as defaultProcessor
const markdownProcessor = createProcessor('markdown');
const htmlProcessor = createProcessor('html');

textProcessor.parse('a to the b to the c');
markdownProcessor.parse('# heading');
htmlProcessor.parse('\na to the \nb to the \n\nc to the d');
```

Yields [hast][hast] trees.  To compile the hast tree, please use a relevant `unified` compiler that works with `hast`, e.g.

```js
import { createProcessor } from '@unified-doc/processor';
import { createElement } from 'react';
import rehype2react from 'rehype-react';
import rehype2string from 'rehype-stringify';

const toStringProcessor = createProcessor();
const toReactProcessor = createProcessor().use(rehype2react, { createElement });
```

## API

```ts
function createProcessor(
	contentType?: ContentType,
	sanitizeSchema?: {
		[key: string]: any;
	},
): Processor;;
```

Returns a [unified][unified] `Processor` which operates on hast trees.

Provide a valid [sanitize-schema][sanitize-schema] to apply custom HTML sanitization . Improper use of this schema can open you up to a cross-site scripting (XSS) attack. The defaults are safe, but deviating from them is likely unsafe.

### Types

```ts
export type ContentType = 'html' | 'markdown' | 'text';
```

<!-- Definition -->
[unified]: https://unifiedjs.com/
[processor]: https://github.com/unifiedjs/unified#processor
[hast]: https://github.com/syntax-tree/hast
[sanitize-schema]: https://github.com/syntax-tree/hast-util-sanitize#schema

<!-- Hack to make importing mdx work in docz/gatsby... -->
export default ({ children }) => children
