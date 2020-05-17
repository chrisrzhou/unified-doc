import { Node, Position } from 'unist';

export interface TextOffset {
  startOffset: number;
  endOffset: number;
  position: Position;
  isNewline?: boolean;
}

export default function extractTextOffsets(tree: Node): TextOffset[];
