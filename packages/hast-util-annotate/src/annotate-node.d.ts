import { Node } from 'unist';

import { Annotation, OptionalAnnotationCallbacks } from '.';

interface NodeData {
	endOffset: number;
	startOffset: number;
	annotations: Annotation[];
	value: string;
}

export default function annotateNode(
	nodeData: NodeData,
	annotationCallbacks: OptionalAnnotationCallbacks,
): Node;
