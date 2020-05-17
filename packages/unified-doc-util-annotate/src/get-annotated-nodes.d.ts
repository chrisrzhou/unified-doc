import { Node } from 'unist';

import { Annotation, AnnotationCallbacks, Optional } from '.';

interface AnnotationData {
	allAnnotations: { [key: string]: Annotation };
	a2n: { [key: string]: any };
	n2a: { [key: string]: any };
}

export default function getAnnotatedNodes(
	node: Node,
	nodeId: string,
	annotationData: AnnotationData,
	annotationCallbacks: Optional<AnnotationCallbacks>,
): Node[];
