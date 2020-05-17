/**
 * Validate annotations and return sorted annotations with sort order:
 * { startOffset: 'asc', endOffset: 'desc' }]
 **/
export default function validateAnnotations(annotations) {
  const uniqueIds = new Set();
  let invalidOffsets = false;

  annotations.forEach((annotation) => {
    uniqueIds.add(annotation.id);
    if (annotation.startOffset > annotation.endOffset) {
      invalidOffsets = true;
    }
  });

  if (uniqueIds.size !== annotations.length) {
    console.warn('All annotations must contain unique "id" fields');
  }

  if (invalidOffsets) {
    console.warn('All annotations should have "startOffset" < "endOffset"');
  }

  const sortedAnnotations = annotations.slice().sort((a, b) => {
    if (a.startOffset < b.startOffset) {
      return -1;
    }

    if (a.startOffset > b.startOffset) {
      return 1;
    }

    if (a.endOffset < b.endOffset) {
      return 1;
    }

    if (a.endOffset > b.endOffset) {
      return -1;
    }

    return 0;
  });

  return sortedAnnotations;
}
