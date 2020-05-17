import { Node } from 'unist';

import { Annotation, AnnotationCallbacks, Optional } from './types';

export * from './types';

export default function annotate(
  tree: Node,
  annotations: Annotation[],
  annotationCallbacks?: Optional<AnnotationCallbacks>,
): Node;
