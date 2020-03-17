import { Node } from 'unist';
import { Annotation } from '.';

export default function splitTextNode(
	node: Node,
	annotation: Annotation,
): null | [string, string, string];
