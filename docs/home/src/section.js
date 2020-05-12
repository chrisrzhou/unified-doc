import React from 'react';

import { Box, FlexLayout, Text } from '@docs/ui';

export default function Section({
	children,
	description,
	grow = false,
	title,
	width = '25%',
}) {
	return (
		<Box as="section" sx={{ flex: grow ? '1 1 auto' : '0 0 auto', width }}>
			<FlexLayout flexDirection="column" space="m">
				<FlexLayout flexDirection="column" space="none">
					<Text as="h2" color="primary">
						{title}
					</Text>
					<Text variant="help">{description}</Text>
				</FlexLayout>
				{children}
			</FlexLayout>
		</Box>
	);
}
