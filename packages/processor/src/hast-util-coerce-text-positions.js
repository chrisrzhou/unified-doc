import visit from 'unist-util-visit-parents';

/**
 * TODO: this is a temporary hack to add positional information to all text nodes that are not tracked during the remark-rehype conversions.
 *
 * https://spectrum.chat/unified/remark/remark-rehype-n-text-nodes-do-not-have-positions~06b59340-3be7-4d55-82bc-4a3d8db6562e
 **/
export default function coerceTextPositions(tree) {
	visit(tree, 'text', (node, parents) => {
		const parent = parents[parents.length - 1];
		if (!node.position) {
			node.position = parent.position;
		}
	});

	return tree;
}
