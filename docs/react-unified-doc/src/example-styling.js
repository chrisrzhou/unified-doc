import React, { useState } from 'react';

import { annotations, cssProperties, htmlContent } from './data';
import ExampleLayout from './example-layout';
import { ContentArea, Select } from './ui';

const classNames = [
	{ label: 'doc', value: 'doc' },
	{ label: 'doc-dark', value: 'doc-dark' },
	{ label: 'doc-yucks', value: 'doc-yucks' },
];

export default function ExampleStyling() {
	const [className, setClassName] = useState('doc');

	const header = (
		<Select
			id="styling"
			label="Styling"
			value={className}
			options={classNames}
			onChange={setClassName}
		/>
	);

	const sections = [
		{
			label: 'Styling',
			content: (
				<ContentArea help="Custom CSS styles for document and <mark /> elements.">
					{cssProperties}
				</ContentArea>
			),
			value: 'styling',
		},
	];

	const docProps = {
		annotations,
		className,
		content: htmlContent,
	};

	return (
		<ExampleLayout
			docProps={docProps}
			header={header}
			name="styling"
			sections={sections}
		/>
	);
}
