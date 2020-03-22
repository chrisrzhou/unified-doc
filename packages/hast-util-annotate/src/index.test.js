import annotate from '.';

function createTree(type) {
	switch (type) {
		case 'shifted': {
			return {
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
		}

		case 'no-text': {
			return {
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
		}

		case 'complex': {
			return {
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
		}

		default:
			return {
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
	}
}

describe('index.js', () => {
	it('should not annotate anything if offset is not covering any text nodes', () => {
		const tree = createTree();
		const treeWithNoTextNodes = createTree();
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

	it('should annotate text node if offset is within text node', () => {
		const tree = createTree();
		const annotatedTree = annotate(tree, [{ startOffset: 10, endOffset: 20 }]);

		if (!Array.isArray(annotatedTree.children)) {
			return;
		}

		const [leftNode, matchedNode, rightNode] = annotatedTree.children;
		expect(leftNode.type).toEqual('text');
		expect(leftNode.value).toEqual('a to the b');
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedNode.children[0].type).toEqual('text');
		expect(matchedNode.children[0].value).toEqual(' to the c ');
		expect(rightNode.type).toEqual('text');
		expect(rightNode.value).toEqual('to the d');
	});

	it('should annotate text node if offset is exactly within text node', () => {
		const tree = createTree();
		const annotatedTree = annotate(tree, [{ startOffset: 0, endOffset: 28 }]);

		if (!Array.isArray(annotatedTree.children)) {
			return;
		}

		const [matchedNode] = annotatedTree.children;

		expect(matchedNode.tagName).toEqual('span');
		expect(matchedNode.children[0].type).toEqual('text');
		expect(matchedNode.children[0].value).toEqual(
			'a to the b to the c to the d',
		);
	});

	it('should annotate text node if text node is within offset', () => {
		const shiftedTree = createTree('shifted');
		const annotatedTree = annotate(shiftedTree, [
			{ startOffset: 0, endOffset: 50 },
		]);

		if (!Array.isArray(annotatedTree.children)) {
			return;
		}

		const [matchedNode, rightNode] = annotatedTree.children;
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedNode.children[0].type).toEqual('text');
		expect(matchedNode.children[0].value).toEqual(
			'a to the b to the c to the d',
		);
		expect(rightNode).toEqual(undefined);
	});

	it('should annotate text node if text node is left of offset', () => {
		const tree = createTree();
		const annotatedTree = annotate(tree, [{ startOffset: 10, endOffset: 50 }]);

		if (!Array.isArray(annotatedTree.children)) {
			return;
		}

		const [leftNode, matchedNode, rightNode] = annotatedTree.children;
		expect(leftNode.type).toEqual('text');
		expect(leftNode.value).toEqual('a to the b');
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedNode.children[0].type).toEqual('text');
		expect(matchedNode.children[0].value).toEqual(' to the c to the d');
		expect(rightNode).toEqual(undefined);
	});

	it('should annotate text node if text node is right of offset', () => {
		const shiftedTree = createTree('shifted');
		const annotatedTree = annotate(shiftedTree, [
			{ startOffset: 0, endOffset: 15 },
		]);

		if (!Array.isArray(annotatedTree.children)) {
			return;
		}

		const [matchedNode, rightNode] = annotatedTree.children;
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedNode.children[0].type).toEqual('text');
		expect(matchedNode.children[0].value).toEqual('a to ');
		expect(rightNode.type).toEqual('text');
		expect(rightNode.value).toEqual('the b to the c to the d');
	});

	it('should apply mutilple annotations across the same text node', () => {
		const tree = createTree();
		const annotations = [
			{ startOffset: 10, endOffset: 20 },
			{ startOffset: 15, endOffset: 25 },
		];
		const annotatedTree = annotate(tree, annotations);
	});

	it('should annotate multiple text nodes and skipping non-text nodes if offset covers them', () => {
		const complexTree = createTree('complex');
		const annotatedTree = annotate(complexTree, [
			{ startOffset: 15, endOffset: 110 },
		]);

		if (!Array.isArray(annotatedTree.children)) {
			return;
		}

		const [leftNode, matchedNode, divNode, bNode] = annotatedTree.children;
		const [bMatchedNode, bRightNode] = bNode.children;
		expect(leftNode.type).toEqual('text');
		expect(leftNode.value).toEqual('a to ');
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedNode.children[0].type).toEqual('text');
		expect(matchedNode.children[0].value).toEqual('the b to the c to the d');
		expect(divNode.children).toEqual(undefined);
		expect(bNode.children.length).toEqual(2);
		expect(bMatchedNode.tagName).toEqual('span');
		expect(bMatchedNode.children[0].type).toEqual('text');
		expect(bMatchedNode.children[0].value).toEqual('to the e t');
		expect(bRightNode.type).toEqual('text');
		expect(bRightNode.value).toEqual('o the f');
	});

	it('should apply classnames', () => {
		const tree = createTree();
		const annotatedTree = annotate(tree, [
			{ className: 'class1', startOffset: 0, endOffset: 15 },
		]);

		if (!Array.isArray(annotatedTree.children)) {
			return;
		}

		const [matchedNode] = annotatedTree.children;
		expect(matchedNode.tagName).toEqual('span');
		expect(matchedNode.properties.class).toEqual(['class1']);
	});

	it('should create anchor links', () => {
		const tree = createTree();
		const annotatedTree = annotate(tree, [
			{ anchorId: 'test-anchor', startOffset: 0, endOffset: 15 },
		]);

		if (!Array.isArray(annotatedTree.children)) {
			return;
		}

		const [matchedNode] = annotatedTree.children;
		expect(matchedNode.tagName).toEqual('a');
		expect(matchedNode.properties.href).toEqual('#test-anchor');
		expect(matchedNode.properties.id).toEqual('test-anchor');
	});

	it('should apply callbacks', () => {
		const tree = createTree();
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

		if (!Array.isArray(annotatedTree.children)) {
			return;
		}

		const [matchedNode] = annotatedTree.children;
		expect(matchedNode.tagName).toEqual('span');
		matchedNode.properties.onclick();
		expect(testEvent).toEqual('click');
		expect(testAnnotation).toEqual({ startOffset: 0, endOffset: 15 });
		testAnnotation = null;
		expect(testAnnotation).toEqual(null);
		matchedNode.properties.onmouseover();
		expect(testEvent).toEqual('hover');
		expect(testAnnotation).toEqual({ startOffset: 0, endOffset: 15 });
	});
});
