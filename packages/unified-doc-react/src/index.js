import React, { createElement, useCallback, useEffect, useRef } from 'react';
import rehype2react from 'rehype-react';
import { createProcessor, selectText } from 'unified-doc';

export default function Document({
  annotations,
  annotationCallbacks,
  className,
  content,
  contentType,
  rehypePlugins,
  sanitizeSchema,
  onSelectText,
}) {
  const docRef = useRef();

  // Set up unified processor to compile content
  const processor = createProcessor({
    annotations,
    annotationCallbacks,
    contentType,
    rehypePlugins,
    sanitizeSchema,
  });
  processor.use(rehype2react, { createElement });

  // @ts-ignore: TODO remove when VFile typings are fixed
  const compiled = processor.processSync(content).result;
  const tree = processor.parse(content);

  const handleSelectText = useCallback(
    (event) => {
      if (onSelectText) {
        const selectedText = selectText(docRef.current, tree);
        if (selectedText) {
          onSelectText(selectedText, event);
        }
      }
    },
    [onSelectText, tree],
  );

  // Setup text selection
  useEffect(() => {
    document.addEventListener('mouseup', handleSelectText);

    return () => {
      document.removeEventListener('mouseup', handleSelectText);
    };
  }, [handleSelectText]);

  return (
    <div ref={docRef} className={className}>
      {compiled}
    </div>
  );
}
