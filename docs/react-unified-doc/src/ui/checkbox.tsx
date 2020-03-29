import React from 'react';
import { Checkbox as ThemeUICheckbox } from 'theme-ui';

import { Label } from '.';

interface Props {
	label: string;
	value: boolean;
	onChange: (value: boolean) => void;
}

export function Checkbox({ label, value, onChange }: Props): JSX.Element {
	return (
		<Label direction="row">
			<ThemeUICheckbox checked={value} onChange={() => onChange(!value)} />
			{label}
		</Label>
	);
}
