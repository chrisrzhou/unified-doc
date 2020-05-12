import React, { useEffect, useState } from 'react';

import { annotations, content } from '@docs/data';
import { Button, FlexLayout, Select, Text } from '@docs/ui';

import Layout from './layout';
import './demo-comments.css';

const positionOptions = [
	{ label: 'start', value: 'start' },
	{ label: 'end', value: 'end' },
];

function getRandomInt(max = 20) {
	return Math.ceil(Math.random() * Math.floor(max));
}

function DemoComments() {
	const [commentPosition, setCommentPosition] = useState('start');
	const [activeAnnotation, setActiveAnnotation] = useState(null);
	const [comments, setComments] = useState([]);

	// For each annotation, render the commentNode relative to the start/end
	// position of the annotation using an effects hook.
	useEffect(() => {
		const commentNodes = [];
		annotations.forEach((annotation) => {
			const { id } = annotation;
			const selector =
				commentPosition === 'start'
					? `[id='${id}']`
					: `[data-id='${id}'][data-end='true']`;
			const annotatedNode = document.querySelector(selector);

			const commentNode = document.createElement('div');
			commentNode.className = `demo-comment ${
				commentPosition === 'start' ? 'demo-comment-start' : 'demo-comment-end'
			}`;
			const commentCount = getRandomInt();
			commentNode.textContent = commentCount.toString();
			commentNode.addEventListener('click', () => {
				// Create mock comments. You should replace this with code that actually loads comments.
				setComments(new Array(commentCount).fill(0));
				setActiveAnnotation(annotation);
			});

			annotatedNode.append(commentNode);
			commentNodes.push(commentNode);
		});

		return () => {
			commentNodes.forEach((commentNode) => commentNode.remove());
		};
	}, [commentPosition]);

	function clearComments() {
		setActiveAnnotation(null);
		setComments([]);
	}

	const sidebar = (
		<FlexLayout flexDirection="column" space="m">
			<FlexLayout alignItems="center" justifyContent="space-between">
				<Text as="h3">Comments</Text>
				<Select
					id="comment-position"
					label="Comment Position"
					options={positionOptions}
					value={commentPosition}
					onChange={setCommentPosition}
				/>
			</FlexLayout>
			<Text variant="help">
				{activeAnnotation
					? `Showing comments for annotation "${activeAnnotation.id}"`
					: 'Click on a comment bubble to load comments'}
			</Text>
			<FlexLayout flexDirection="column" space="xs">
				{comments.map((_, i) => (
					<Text key={i.toString()}>Comment {i + 1}</Text>
				))}
			</FlexLayout>
			{activeAnnotation && (
				<Button sx={{ alignSelf: 'flex-start' }} onClick={clearComments}>
					Clear comments
				</Button>
			)}
		</FlexLayout>
	);

	const docProps = {
		annotations,
		content,
	};

	return <Layout docProps={docProps} name="comments" sidebar={sidebar} />;
}

export default DemoComments;
