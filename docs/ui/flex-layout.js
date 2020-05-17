import React from 'react';

import Box from './box';
import { theme } from '@src/gatsby-theme-docz/theme';

export default function FlexLayout({
  alignItems,
  children,
  flexDirection,
  flexWrap,
  flexWrapSpace = 'xs',
  justifyContent,
  space = 'm',
  sx,
  ...rest
}) {
  const marginDirection =
    flexDirection === 'column' ? 'marginBottom' : 'marginRight';
  const marginValue = theme.space[space];
  const flexWrapMarginValue = theme.space[flexWrapSpace];

  return (
    <Box
      sx={{
        ...sx,
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
