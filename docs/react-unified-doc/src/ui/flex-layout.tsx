import React from 'react';
import { SxStyleProp } from 'theme-ui';

import { Box, theme } from '.';

type Space = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';

interface Props {
	[key: string]: any;
	alignItems?: any;
	children: React.ReactNode;
	flex?: any;
	flexDirection?: any;
	flexWrap?: any;
	flexWrapSpace?: any;
	justifyContent?: any;
	space?: Space;
	sx?: SxStyleProp;
}

export function FlexLayout({
	alignItems,
	children,
	flex,
	flexDirection,
	flexWrap,
	flexWrapSpace = 'xs',
	justifyContent,
	space = 'm',
	sx: _sx, // Disable sx
	...rest
}: Props): JSX.Element {
	const marginDirection =
		flexDirection === 'column' ? 'marginBottom' : 'marginRight';
	const marginValue: string = theme.space[space];
	const flexWrapMarginValue: string = theme.space[flexWrapSpace];

	return (
		<Box
			sx={{
				alignItems,
				display: 'flex',
				flex,
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
