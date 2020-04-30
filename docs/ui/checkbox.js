import React from 'react';
import { Checkbox as ThemeUICheckbox } from 'theme-ui';

import Label from './label';

export default function Checkbox({ id, label, value, onChange }) {
	return (
		<Label htmlFor={id} direction="row">
			<ThemeUICheckbox
				id={id}
				checked={value}
				onChange={() => onChange(!value)}
			/>
			{label}
		</Label>
	);
}
