import React from 'react';

import { FlexLayout, Text } from '.';

export function ContentArea({ bg = 'wash', children, help = '' }) {
	return (
		<FlexLayout flexDirection="column" space="s">
			{help && <Text variant="help">{help}</Text>}
			<Text bg={bg} p="m" variant="code">
				{children}
			</Text>
		</FlexLayout>
	);
}
