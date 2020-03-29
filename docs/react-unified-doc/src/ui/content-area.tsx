import React from 'react';

import { FlexLayout, Text } from '.';

interface Props {
	children: React.ReactNode;
	help: string;
}

export function ContentArea({ children, help }: Props): JSX.Element {
	return (
		<FlexLayout flexDirection="column" space="s">
			<Text variant="help">{help}</Text>
			<Text bg="wash" p="m" variant="code">
				{children}
			</Text>
		</FlexLayout>
	);
}
