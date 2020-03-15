import annotate from '.';

describe('hast-util-annotate.js', () => {
	const tree = {
		type: 'root',
		children: [
			{
				type: 'text',
				value: 'a to the b to the c to the d',
				position: {
					start: {
						offset: 0,
					},
					end: {
						offset: 28,
					},
				},
			},
		],
	};

	const shiftedTree = {
		type: 'root',
		children: [
			{
				type: 'text',
				value: 'a to the b to the c to the d',
				position: {
					start: {
						offset: 10,
					},
					end: {
						offset: 38,
					},
				},
			},
		],
	};

	const treeWithNoTextNodes = {
		type: 'root',
		children: [
			{
				type: 'element',
				tagName: 'paragraph',
				position: {
					start: {
						offset: 0,
					},
					end: {
						offset: 28,
					},
				},
			},
		],
	};

	const complexTree = {
		type: 'root',
		children: [
			{
				type: 'text',
				value: 'a to the b to the c to the d',
				position: {
					start: {
						offset: 10,
					},
					end: {
						offset: 38,
					},
				},
			},
			{
				type: 'element',
				tagName: 'div',
				position: {
					start: {
						offset: 40,
					},
					end: {
						offset: 60,
					},
				},
			},
			{
				type: 'element',
				tagName: 'b',
				position: {
					start: {
						offset: 65,
					},
					end: {
						offset: 80,
					},
				},
				children: [
					{
						type: 'text',
						value: 'to the e to the f',
						position: {
							start: {
								offset: 100,
							},
							end: {
								offset: 117,
							},
						},
					},
				],
			},
		],
	};

	it('should not highlight anything if offset is not covering any text nodes', () => {
		expect(annotate(tree, [])).toEqual(tree);
		expect(
			annotate(treeWithNoTextNodes, [{ startOffset: 0, endOffset: 100 }]),
		).toEqual(treeWithNoTextNodes);
		expect(
			annotate(tree, [
				{ startOffset: 50, endOffset: 100 },
				{ startOffset: 100, endOffset: 200 },
			]),
		).toEqual(tree);
	});

	it('should highlight text node if offset is within text node', () => {
		const annotatedTree = annotate(tree, [{ startOffset: 10, endOffset: 20 }]);
		const annotatedSpanNode = annotatedTree.children[0];
		const [leftNode, matchedNode, rightNode] = annotatedSpanNode.children;
		const matchedTextNode = matchedNode.children[0];

		expect(annotatedSpanNode.tagName).toEqual('span');
		expect(leftNode.type).toEqual('text');
		expect(leftNode.value).toEqual('a to the b');
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedTextNode.type).toEqual('text');
		expect(matchedTextNode.value).toEqual(' to the c ');
		expect(rightNode.type).toEqual('text');
		expect(rightNode.value).toEqual('to the d');
	});

	it('should highlight text node if offset is exactly within text node', () => {
		const annotatedTree = annotate(tree, [{ startOffset: 0, endOffset: 28 }]);
		const annotatedSpanNode = annotatedTree.children[0];
		const [leftNode, matchedNode, rightNode] = annotatedSpanNode.children;
		const matchedTextNode = matchedNode.children[0];

		expect(annotatedSpanNode.tagName).toEqual('span');
		expect(leftNode.type).toEqual('text');
		expect(leftNode.value).toEqual('');
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedTextNode.type).toEqual('text');
		expect(matchedTextNode.value).toEqual('a to the b to the c to the d');
		expect(rightNode.type).toEqual('text');
		expect(rightNode.value).toEqual('');
	});

	it('should highlight text node if text node is within offset', () => {
		const annotatedTree = annotate(shiftedTree, [
			{ startOffset: 0, endOffset: 50 },
		]);
		const annotatedSpanNode = annotatedTree.children[0];
		const [leftNode, matchedNode, rightNode] = annotatedSpanNode.children;
		const matchedTextNode = matchedNode.children[0];

		expect(annotatedSpanNode.tagName).toEqual('span');
		expect(leftNode.type).toEqual('text');
		expect(leftNode.value).toEqual('');
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedTextNode.type).toEqual('text');
		expect(matchedTextNode.value).toEqual('a to the b to the c to the d');
		expect(rightNode.type).toEqual('text');
		expect(rightNode.value).toEqual('');
	});

	it('should highlight text node if text node is left of offset', () => {
		const annotatedTree = annotate(tree, [{ startOffset: 10, endOffset: 50 }]);
		const annotatedSpanNode = annotatedTree.children[0];
		const [leftNode, matchedNode, rightNode] = annotatedSpanNode.children;
		const matchedTextNode = matchedNode.children[0];

		expect(annotatedSpanNode.tagName).toEqual('span');
		expect(leftNode.type).toEqual('text');
		expect(leftNode.value).toEqual('a to the b');
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedTextNode.type).toEqual('text');
		expect(matchedTextNode.value).toEqual(' to the c to the d');
		expect(rightNode.type).toEqual('text');
		expect(rightNode.value).toEqual('');
	});

	it('should highlight text node if text node is right of offset', () => {
		const annotatedTree = annotate(shiftedTree, [
			{ startOffset: 0, endOffset: 15 },
		]);
		const annotatedSpanNode = annotatedTree.children[0];
		const [leftNode, matchedNode, rightNode] = annotatedSpanNode.children;
		const matchedTextNode = matchedNode.children[0];

		expect(annotatedSpanNode.tagName).toEqual('span');
		expect(leftNode.type).toEqual('text');
		expect(leftNode.value).toEqual('');
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedTextNode.type).toEqual('text');
		expect(matchedTextNode.value).toEqual('a to ');
		expect(rightNode.type).toEqual('text');
		expect(rightNode.value).toEqual('the b to the c to the d');
	});

	it('should apply latest annotation if multiple annotations cover the same nodes', () => {
		const annotatedTree = annotate(tree, [
			{ startOffset: 0, endOffset: 15 },
			{ startOffset: 15, endOffset: 40 },
		]);
		const annotatedSpanNode = annotatedTree.children[0];
		const [leftNode, matchedNode, rightNode] = annotatedSpanNode.children;
		const matchedTextNode = matchedNode.children[0];

		expect(annotatedSpanNode.tagName).toEqual('span');
		expect(leftNode.type).toEqual('text');
		expect(leftNode.value).toEqual('a to the b to t');
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedTextNode.type).toEqual('text');
		expect(matchedTextNode.value).toEqual('he c to the d');
		expect(rightNode.type).toEqual('text');
		expect(rightNode.value).toEqual('');
	});

	it('should highlight multiple text nodes and skipping non-text nodes if offset covers them', () => {
		const annotatedTree = annotate(complexTree, [
			{ startOffset: 15, endOffset: 110 },
		]);
		const firstTextNode = annotatedTree.children[0];
		const divNode = annotatedTree.children[1];
		const bNode = annotatedTree.children[2];
		const nestedTextNode = bNode.children[0];
		const [
			firstTextNodeLeftNode,
			firstTextNodeMatchedNode,
			firstTextNodeRightNode,
		] = firstTextNode.children;
		const firstTextNodeMatchedTextNode = firstTextNodeMatchedNode.children[0];
		const [
			nestedTextNodeLeftNode,
			nestedTextNodeMatchedNode,
			nestedTextNodeRightNode,
		] = nestedTextNode.children;
		const nestedTextNodeMatchedTextNode = nestedTextNodeMatchedNode.children[0];

		// Partial annotation on first text node
		expect(firstTextNode.tagName).toEqual('span');
		expect(firstTextNodeLeftNode.type).toEqual('text');
		expect(firstTextNodeLeftNode.value).toEqual('a to ');
		expect(firstTextNodeMatchedNode.tagName).toEqual('span');
		expect(firstTextNodeMatchedTextNode.type).toEqual('text');
		expect(firstTextNodeMatchedTextNode.value).toEqual(
			'the b to the c to the d',
		);
		expect(firstTextNodeRightNode.type).toEqual('text');
		expect(firstTextNodeRightNode.value).toEqual('');

		// No matches on non-text nodes
		expect(divNode.tagName).toEqual('div');
		expect(bNode.tagName).toEqual('b');

		// Partial annotation on nested text node (inside bold node)
		expect(nestedTextNode.tagName).toEqual('span');
		expect(nestedTextNodeLeftNode.type).toEqual('text');
		expect(nestedTextNodeLeftNode.value).toEqual('');
		expect(nestedTextNodeMatchedNode.tagName).toEqual('span');
		expect(nestedTextNodeMatchedTextNode.type).toEqual('text');
		expect(nestedTextNodeMatchedTextNode.value).toEqual('to the e t');
		expect(nestedTextNodeRightNode.type).toEqual('text');
		expect(nestedTextNodeRightNode.value).toEqual('o the f');
	});

	it('should apply classnames', () => {
		const annotatedTree = annotate(tree, [
			{ classNames: ['class1', 'class2'], startOffset: 0, endOffset: 15 },
		]);
		const matchedNode = annotatedTree.children[0].children[1];

		expect(matchedNode.tagName).toEqual('span');
		expect(matchedNode.properties.className).toEqual(['class1', 'class2']);
	});

	it('should create anchor links', () => {
		const annotatedTree = annotate(tree, [
			{ anchorId: 'test-anchor', startOffset: 0, endOffset: 15 },
		]);
		const matchedNode = annotatedTree.children[0].children[1];

		expect(matchedNode.tagName).toEqual('a');
		expect(matchedNode.properties.href).toEqual('#test-anchor');
		expect(matchedNode.properties.id).toEqual('test-anchor');
	});

	it('should apply callbacks', () => {
		let testAnnotation;
		let testEvent;

		function onClickAnnotation(annotation) {
			testAnnotation = annotation;
			testEvent = 'click';
		}

		function onHoverAnnotation(annotation) {
			testAnnotation = annotation;
			testEvent = 'hover';
		}

		const annotatedTree = annotate(tree, [{ startOffset: 0, endOffset: 15 }], {
			onClickAnnotation,
			onHoverAnnotation,
		});
		const matchedNode = annotatedTree.children[0].children[1];

		expect(matchedNode.tagName).toEqual('span');
		matchedNode.properties.onClick();
		expect(testEvent).toEqual('click');
		expect(testAnnotation).toEqual({ startOffset: 0, endOffset: 15 });
		testAnnotation = null;
		expect(testAnnotation).toEqual(null);
		matchedNode.properties.onMouseOver();
		expect(testEvent).toEqual('hover');
		expect(testAnnotation).toEqual({ startOffset: 0, endOffset: 15 });
	});
});
