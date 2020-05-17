import React from 'react';
import { Input as ThemeUIInput } from 'theme-ui';

import Label from './label';

export default function Input({ id, label, placeholder, value, onChange }) {
  return (
    <Label htmlFor={id}>
      {label}
      <ThemeUIInput
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Label>
  );
}
