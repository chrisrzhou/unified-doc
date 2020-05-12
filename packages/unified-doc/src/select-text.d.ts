import { Node } from 'unist';

import { SelectedText } from './types';

export default function selectText(
	element: HTMLDivElement,
	tree: Node,
): SelectedText | void;
