import React from 'react';

import { FlexLayout, Text } from '.';

export function ContentArea({ children, help }) {
	return (
		<FlexLayout flexDirection="column" space="s">
			<Text variant="help">{help}</Text>
			<Text bg="wash" p="m" variant="code">
				{children}
			</Text>
		</FlexLayout>
	);
}
