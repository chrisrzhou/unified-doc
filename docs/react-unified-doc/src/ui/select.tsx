import React from 'react';
import { Select as ThemeUISelect } from 'theme-ui';

import { Label } from '.';

type Value = string | number;

interface Option {
	label: string;
	value: Value;
}

interface Props {
	id: string;
	label: string;
	options: Option[];
	value: Value;
	width?: string;
	onChange: (value: any) => void;
}

export function Select({
	id,
	label,
	options,
	value,
	width = '160px',
	onChange,
}: Props): JSX.Element {
	return (
		<Label htmlFor={id}>
			{label}
			<ThemeUISelect
				id={id}
				sx={{
					borderColor: 'border',
					borderStyle: 'solid',
					borderWidth: 1,
					fontSize: 's',
					width,
				}}
				value={value}
				onChange={event => onChange(event.target.value)}>
				{options.map(({ label, value }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</ThemeUISelect>
		</Label>
	);
}
