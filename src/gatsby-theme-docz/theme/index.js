import baseTheme from 'gatsby-theme-docz/src/theme/index';
import { merge } from 'lodash/fp';

const primary = '#0b5fff';

const button = {
  background: 'primary',
  borderColor: 'primary',
  borderStyle: 'solid',
  borderWidth: 1,
  cursor: 'pointer',
  fontSize: 's',
  paddingBottom: 'xs',
  paddingLeft: 's',
  paddingRight: 's',
  paddingTop: 'xs',
  ':hover': {
    opacity: 0.8,
  },
};

export const theme = {
  colors: {
    primary,
    border: '#ddd',
    link: primary,
    black1: '#333',
    black2: '#999',
    black3: '#ccc',
    wash: 'rgba(200, 200, 200, 0.2)',
  },
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: {
    xs: '10px',
    s: '14px',
    m: '18px',
    l: '20px',
    xl: '32px',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  radii: {
    s: '2px',
    m: '4px',
    l: '8px',
  },
  shadows: {
    card: '0 0 8px rgba(0, 0, 0, 0.125)',
  },
  space: {
    none: '0px',
    xs: '4px',
    s: '8px',
    m: '16px',
    l: '32px',
    xl: '64px',
  },

  // Variants
  buttons: {
    primary: {
      ...button,
    },
    secondary: {
      ...button,
      background: 'transparent',
      color: primary,
    },
  },
  cards: {
    primary: {
      padding: 'm',
      borderRadius: 'm',
      boxShadow: 'card',
    },
  },
  text: {
    code: {
      fontFamily: 'monospace',
      fontSize: 'xs',
      whiteSpace: 'pre-wrap',
    },
    icon: {
      color: 'black2',
      cursor: 'pointer',
      fontWeight: 'bold',
      ':hover': {
        opacity: 0.8,
      },
    },
    help: {
      color: 'black2',
      fontSize: 's',
      fontStyle: 'italic',
    },
    token: {
      fontSize: 'xs',
      fontWeight: 'bold',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontSize: 'm',
    },
  },
};

export default merge(baseTheme, theme);
