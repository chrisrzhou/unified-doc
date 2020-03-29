import React from 'react';
import { ThemeProvider } from 'theme-ui';

import { theme } from '.';

interface Props {
	children: React.ReactNode;
}

export function Provider({ children }: Props): JSX.Element {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
