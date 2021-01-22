/**
 * author:      Jun Li
 * email:       Jun.Li01@student.csulb.edu
 * description: Input component
 */

import React, { memo } from 'react';
import { TextField } from '@material-ui/core';

const Input = memo(function Input(props) {
  const { label, value, onChange } = props;
  return (
    <TextField
      required
      variant="outlined"
      label={label}
      name={label}
      value={value}
      type="search"
      InputProps={{ spellCheck: false }}
      onChange={onChange}
    />
  );
});

export default Input;
