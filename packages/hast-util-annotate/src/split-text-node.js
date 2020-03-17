/**
 * Take the minimum overlap of a node and annotation offset
 * The following scenarios:
 *   ----   | -------- | -------- | ----     |     ---- |
 * -------- |   ----   | -------- |   ------ | ------   |
 * will yield the corresponding valid matches:
 * LLMMMMRR | LLMMMMRR | MMMMMMMM | LLMMRRRR | LLLLMMRR |
 * Return null if no matches are found.
 **/
export default function splitTextNode(node, annotation) {
	const { position, value } = node;
	if (!position || !value) {
		return null;
	}

	const matchStartOffset = Math.max(
		position.start.offset,
		annotation.startOffset,
	);
	const matchEndOffset = Math.min(position.end.offset, annotation.endOffset);
	if (matchEndOffset <= matchStartOffset) {
		return null;
	}

	const startIndex = matchStartOffset - position.start.offset;
	const endIndex = matchEndOffset - position.start.offset;
	const leftText = value.slice(0, startIndex);
	const matchedText = value.slice(startIndex, endIndex);
	const rightText = value.slice(endIndex);

	return [leftText, matchedText, rightText];
}
