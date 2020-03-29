export const theme = {
	colors: {
		border: 'rgba(200, 200, 200, 0.4)',
		link: '#0b5fff',
		black1: '#333',
		black2: '#999',
		black3: '#ddd',
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
		s: '12px',
		m: '14px',
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
};
