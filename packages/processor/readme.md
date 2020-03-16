# processor

[**unified**][unified] processor for processing content in `unified-doc`.

## Install

```sh
yarn add @unified-doc/processor
```

## Use

```js
const textToHast = createProcessor()
	.parse('a to the b to the c');
const markdownToHast = createProcessor('markdown')
	.parse('# heading');
const htmlToHast = createProcessor('html')
	.parse('\na to the \nb to the \n\nc to the d');

const annotations = [{ startOffset: 3, endOffset: 6 }];
const withAnnotations = createProcessor('text', annotations)
	.parse('a to the b to the c');
```

Yields [hast][hast] trees with annotated text nodes.  See [hast-util-annotate](../hast-util-annotate/) for more details on how annotating text nodes behave.

You can also add relevant `rehype/hast` plugins after creating the processor:

```js
import format from 'rehype-format';
import toc from 'rehype-toc';

const processor = createProcessor()
	.use(format)
	.use(toc);
```

To compile content, please use a relevant `unified` compiler that works with `hast`, e.g.

```js
import { createElement } from 'react';
import rehype2react from 'rehype-react';
import rehype2string from 'rehype-stringify';

// string compiler
const processor1 = createProcessor().use(rehype2string);

// react compiler
const processor2 = createProcessor().use(rehype2react, { createElement });
```

## API

```ts
export function createProcessor(
	contentType?: ContentType,
	annotations?: Annotation[],
	annotationCallbacks?: OptionalAnnotationCallbacks,
	options?: ProcessorOptions,
): Processor;
```

Returns a [unified][unified] `Processor` that supports annotating text nodes.  This processor supports content processing for the provided `contentType` (`html`, `markdown`, `text`).  Note that any supported content is parsed and mapped into [hast][hast].

If an `extractor` callback is provided in `options`, the processor will extract/capture all `textOffsets` of text nodes as well.

Provide a valid [sanitize-schema][sanitize-schema] to apply custom HTML sanitization . Improper use of this schema can open you up to a cross-site scripting (XSS) attack. The defaults are safe, but deviating from them is likely unsafe.

### Types

```ts
import {
	Annotation,
	OptionalAnnotationCallbacks,
} from '@unified-doc/hast-util-annotate';
import { Extractor } from '@unified-doc/hast-util-extract-text-offsets';

type ContentType = 'html' | 'markdown' | 'text';

interface ProcessorOptions {
	extractor?: Extractor;
	sanitizeSchema: {
		[key: string]: any;
	};
}
```

Refer to [hast-util-annotate](../hast-util-annotate/) and [hast-util-extract-text-offsets](../hast-util-extract-text-offsets) for imported types.

<!-- Definition -->
[unified]: https://unifiedjs.com/
[hast]: https://github.com/syntax-tree/hast
[sanitize-schema]: https://github.com/syntax-tree/hast-util-sanitize#schema

<!-- Unfortunate hack to make importing gatsby in mdx work... -->
export default ({ children }) => children
