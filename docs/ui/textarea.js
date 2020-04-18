import React from 'react';
import { Textarea as ThemeUITextarea } from 'theme-ui';

import { Label } from '.';

export function Textarea({ id, height, label, value, onChange }) {
	return (
		<Label htmlFor={id} direction="column">
			{label}
			<ThemeUITextarea
				id={id}
				sx={{ height }}
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</Label>
	);
}
