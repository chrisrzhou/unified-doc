import React, { useState, useEffect } from 'react';

import { content } from '@docs/data';
import { Checkbox, FlexLayout, Text } from '@docs/ui';

import Layout from './layout';
import { search } from './search';
import './labeling.css';

export default function LabelingDemo() {
  const [isLabeled, setIsLabeled] = useState(true);

  const baseClassNames = isLabeled ? ['annotation-labeled'] : [];
  const annotations1 = search(content, 'alice').map((result) => ({
    ...result,
    classNames: [...baseClassNames, 'annotation-1'],
    label: 'protagonist',
  }));
  const annotations2 = search(content, 'rabbit').map((result) => ({
    ...result,
    classNames: [...baseClassNames, 'annotation-2'],
    label: 'time',
  }));
  const annotations3 = search(content, 'wonder').map((result) => ({
    ...result,
    classNames: [...baseClassNames, 'annotation-3'],
    label: 'dream',
  }));
  const annotations = [...annotations1, ...annotations2, ...annotations3];

  useEffect(() => {
    annotations.forEach((annotation) => {
      const { id } = annotation;
      const annotatedNode = document.querySelector(`[data-id='${id}']`);
      annotatedNode.textContent = isLabeled
        ? annotation.label
        : annotation.value;
    });
  }, [annotations, isLabeled]);

  const header = (
    <FlexLayout alignItems="center">
      <Checkbox
        id="is-labeled"
        label="Labeled"
        value={isLabeled}
        onChange={setIsLabeled}
      />
      <Text className="annotation-1 annotation-labeled" variant="token">
        Protagonist: {annotations1.length}
      </Text>
      <Text className="annotation-2 annotation-labeled" variant="token">
        Time: {annotations2.length}
      </Text>
      <Text className="annotation-3 annotation-labeled" variant="token">
        Dream: {annotations3.length}
      </Text>
    </FlexLayout>
  );

  const docProps = {
    annotations,
    content,
  };

  return <Layout docProps={docProps} header={header} name="labeling" />;
}
