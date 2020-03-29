import React from 'react';
import { Label as ThemeUILabel } from 'theme-ui';

interface Props {
	children: React.ReactNode;
	direction?: 'column' | 'row';
	htmlFor?: string;
}

export function Label({
	children,
	direction = 'column',
	htmlFor,
}: Props): JSX.Element {
	return (
		<ThemeUILabel
			htmlFor={htmlFor}
			sx={{
				alignItems: direction === 'row' ? 'center' : 'flex-start',
				display: 'flex',
				flex: '0 0 content',
				flexDirection: direction,
				fontSize: 'xs',
				fontWeight: 'bold',
				textTransform: 'uppercase',
			}}>
			{children}
		</ThemeUILabel>
	);
}
