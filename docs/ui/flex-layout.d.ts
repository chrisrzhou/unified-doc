// Custom typings to work around optional props.
type Space = 'none' | 'xs' | 's' | 'm' | 'l' | 'xl';

interface Props {
  [key: string]: any;
  alignItems?: string;
  children: React.ReactNode;
  flexDirection?: string;
  flexWrap?: string;
  flexWrapSpace?: Space;
  justifyContent?: string;
  space?: Space;
}

export default function FlexLayout(props: Props): JSX.Element;
