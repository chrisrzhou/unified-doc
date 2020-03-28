import React from 'react';
import { Box, Flex } from 'theme-ui';

interface Props {
	children: React.ReactNode;
	content: string;
	rightContent?: string;
	rightContentTitle?: string;
}

export default function ExampleLayout({
	children,
	content,
	rightContent,
	rightContentTitle,
}: Props): JSX.Element {
	return (
		<Flex sx={{ fontSize: 14 }}>
			<Box>
				<h3>Document</h3>
				<Box
					p={3}
					sx={{
						border: '1px solid lightgray',
						borderRadius: 8,
						flex: '1 1 auto',
					}}>
					{children}
				</Box>
			</Box>
			<Box ml={3} sx={{ flex: '0 0 300px' }}>
				<h3>Source content</h3>
				<Box
					as="pre"
					bg="rgba(200, 200, 200, 0.3)"
					p={3}
					sx={{ borderRadius: 8, fontSize: 12, whiteSpace: 'pre-wrap' }}>
					{content}
				</Box>
			</Box>
			{rightContent && rightContentTitle && (
				<Box ml={3} sx={{ flex: '0 0 300px' }}>
					<h3>{rightContentTitle}</h3>
					<Box
						as="pre"
						bg="rgba(0, 0, 0, 0.1)"
						p={3}
						sx={{ borderRadius: 8, fontSize: 12, whiteSpace: 'pre-wrap' }}>
						{rightContent}
					</Box>
				</Box>
			)}
		</Flex>
	);
}
