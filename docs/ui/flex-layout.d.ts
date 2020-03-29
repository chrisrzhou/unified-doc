// Custom typings to work around optional props.

type Space = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';

interface Props {
	alignItems?: string;
	children: React.ReactNode;
	flexDirection?: string;
	flexWrap?: string;
	flexWrapSpace?: Space;
	justifyContent?: string;
	space?: Space;
}

export function FlexLayout(props: Props): JSX.Element;