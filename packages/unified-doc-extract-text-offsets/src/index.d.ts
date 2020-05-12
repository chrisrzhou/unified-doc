import { Node, Position } from 'unist';

export interface TextOffset {
	startOffset: number;
	endOffset: number;
	position: Position;
	isNewline?: boolean;
}

export type Extractor = (textOffsets: TextOffset[]) => void;

export default function textOffsets(tree: Node, extractor: Extractor): Node;
