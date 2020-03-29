import React from 'react';

import { Box, theme } from '.';

export function FlexLayout({
	alignItems,
	children,
	flexDirection,
	flexWrap,
	flexWrapSpace = 'xs',
	justifyContent,
	space = 'm',
	...rest
}) {
	const marginDirection =
		flexDirection === 'column' ? 'marginBottom' : 'marginRight';
	const marginValue = theme.space[space];
	const flexWrapMarginValue = theme.space[flexWrapSpace];

	return (
		<Box
			sx={{
				alignItems,
				display: 'flex',
				flexDirection,
				flexWrap,
				justifyContent,
				'> :not(:last-child)': {
					marginBottom: flexWrap
						? `${flexWrapMarginValue} !important;`
						: undefined,
					[marginDirection]: `${marginValue} !important;`,
				},
				'> :last-child': {
					marginBottom: flexWrap
						? `${flexWrapMarginValue} !important;`
						: undefined,
				},
			}}
			{...rest}>
			{children}
		</Box>
	);
}