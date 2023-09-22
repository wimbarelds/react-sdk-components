import React from 'react';
import { TextField } from '@material-ui/core';
import TextInput from '../TextInput';
import FieldValueList from '../../designSystemExtension/FieldValueList';
import type { PConnFieldProps } from '../../../types/PConnProps';

interface IntegerProps extends PConnFieldProps {
  // If any, enter additional props that only exist on Integer here
}


export default function Integer(props: IntegerProps) {
  const {
    label,
    required,
    disabled,
    value = '',
    validatemessage,
    status,
    onChange,
    onBlur,
    readOnly,
    testId,
    helperText,
    displayMode,
    hideLabel
  } = props;
  const helperTextToDisplay = validatemessage || helperText;

  // console.log(`Integer: label: ${label} value: ${value}`);

  if (displayMode === 'LABELS_LEFT') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} />;
  }

  if (displayMode === 'STACKED_LARGE_VAL') {
    return <FieldValueList name={hideLabel ? '' : label} value={value} variant='stacked' />;
  }

  if (readOnly) {
    return <TextInput {...props} />;
  }

  let testProp = {};

  testProp = {
    'data-test-id': testId
  };

  function intOnChange(event) {
    // console.log(`Integer intOnChange inValue: ${event.target.value}`);

    // Disallow "." and "," (separators) since this is an integer field
    //  Mimics Pega Integer behavior (where separator characters are "eaten" if they're typed)
    const disallowedChars = ['.', ','];
    const theAttemptedValue = event.target.value;
    const lastChar = theAttemptedValue.slice(-1);

    if (disallowedChars.includes(lastChar)) {
      event.target.value = theAttemptedValue.slice(0, -1);
    }

    // Pass through to the Constellation change handler
    onChange(event);
  }

  return (
    <TextField
      fullWidth
      variant={readOnly ? 'standard' : 'outlined'}
      helperText={helperTextToDisplay}
      placeholder=''
      size='small'
      required={required}
      disabled={disabled}
      onChange={intOnChange}
      onBlur={!readOnly ? onBlur : undefined}
      error={status === 'error'}
      label={label}
      value={value}
      type='text'
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', ...testProp }}
    />
  );
}
