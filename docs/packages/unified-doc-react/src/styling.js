import React, { useState } from 'react';

import { annotations, content, cssProperties } from '@docs/data';
import { ContentArea, Select } from '@docs/ui';

import Layout from './layout';

const classNames = [
  { label: 'doc', value: 'doc' },
  { label: 'doc-dark', value: 'doc-dark' },
  { label: 'doc-yucks', value: 'doc-yucks' },
  { label: 'doc-mini', value: 'doc-mini' },
];

export default function StylingExample() {
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
    content,
  };

  return (
    <Layout
      docProps={docProps}
      header={header}
      name="styling"
      sections={sections}
    />
  );
}
