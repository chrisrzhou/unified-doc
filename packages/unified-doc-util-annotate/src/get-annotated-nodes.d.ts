import { Node } from 'unist';

import { Annotation, OptionalAnnotationCallbacks } from '.';

interface AnnotationData {
	allAnnotations: { [key: string]: Annotation };
	a2n: { [key: string]: any };
	n2a: { [key: string]: any };
	callbacks: OptionalAnnotationCallbacks;
}

export default function getAnnotatedNodes(
	node: Node,
	nodeId: string,
	annotationData: AnnotationData,
): Node[];
