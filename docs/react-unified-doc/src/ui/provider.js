import React from 'react';
import { ThemeProvider } from 'theme-ui';

import { theme } from '.';

export function Provider({ children }) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
