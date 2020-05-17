# unified-doc-react

[react][react] renderer for [**unified-doc**][unified-doc].

## Install

```bash
npm install unified-doc-react
```

## Description

`unified-doc-react` uses `react` as the rendering implementation for [`unified-doc`][unified-doc-package], and supports the following features through a set of simple component props:

- Rendering `content` of various `contentType` using a unified processor.
- Integrate `annotations` with the rendered document using `annotationCallbacks` and `onSelectText` callbacks.
- Supports HTML sanitization using a custom `sanitizeSchema`.
- Further customize the rendered document using `className` and `rehypePlugins`.

For more details on unified document APIs, please refer to the [**unified-doc**][unified-doc] documentation.

## Use

```js
import toc from "rehype-toc";
import Document from "unified-doc-react";

// include optional CSS for customized mark styles
import "unified-doc/src/index.css";

const content = "<blockquote>Blockquote with <b>bold</b> content.</blockquote>";
const annotations = [
  {
    id: "a1",
    startOffset: 0,
    endOffset: 30,
    label: "annotation",
    tooltip: "cool!",
  },
];

import "./my-document.css";

function MyDocument() {
  const annotationCallbacks = {
    onClick: (annotation) => console.log(annotation.id, " clicked"),
    onMouseEnter: (annotation) => console.log(annotation.id, " hovered"),
    setTooltipContent: (annotation) => annotation.tooltip,
  };

  return (
    <Document
      annotations={annotations}
      annotationCallbacks={annotationCallbacks}
      className="my-document"
      content={content}
      contentType="html"
      rehypePlugins={[toc]}
      onSelectText={(annotation) => console.log(annotation.value, " selected")}
    />
  );
}
```

## Props

For more details, please refer to the [props][props] documentation.

```ts
interface Props {
  /** Source string content */
  content: string;
  /** Supported content types (e.g. 'html', 'markdown', 'text') */
  contentType?: ContentType;
  /** Annotations applied relative to the source content */
  annotations?: Annotation[];
  /** Callbacks to capture annotation and related mouse events */
  annotationCallbacks?: Optional<AnnotationCallbacks>;
  /** Optional CSS to style the document */
  className?: string;
  /** Optional rehype plugins can be applied.  Note that the `onSelectText` prop may misbehave if plugins modify the text content of the document. */
  rehypePlugins?: Plugin[];
  /** HTML Sanitize schema (https://github.com/syntax-tree/hast-util-sanitize#schema) */
  sanitizeSchema?: { [key: string]: any };
  /** Callback to capture selected text and mouse up event.  The `SelectedText` extends the `Annotation` object, and can be used with the `annotations` prop in a controlled manner.  Note that this callback may not behave correctly if rehype plugins modify the text content of the document since the callback is applied in relation to the source content. */
  onSelectText?: (selectedText: SelectedText, e?: MouseEvent) => void;
}
```

## Examples

View the official docs and examples at https://unified-doc.netlify.com/packages/unified-doc-react.

You can also run the docs locally with:

```bash
git clone git@github.com:chrisrzhou/unified-doc

cd unified-doc
yarn && yarn docs
```

<!-- Links -->

[props]: https://unified-doc.netlify.com/packages/unified-doc-react/props
[react]: https://github.com/facebook/react
[unified-doc]: https://github.com/chrisrzhou/unified-doc
[unified-doc-package]: https://github.com/chrisrzhou/unified-doc/tree/master/packages/unified-doc
