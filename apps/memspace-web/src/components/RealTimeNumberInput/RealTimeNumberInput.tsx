import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react';
import React, { useState } from 'react';

type RealTimeNumberInputProps = {
  value?: number;
  onComplete?: (value: number) => void;
} & NumberInputProps;

const RealTimeNumberInput = ({
  value = 0,
  onComplete,
  onFocus,
  onChange,
  onBlur,
  ...others
}: RealTimeNumberInputProps) => {
  const [editing, setEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(0);

  return (
    <NumberInput
      value={editing ? editingValue : value}
      onFocus={(e) => {
        setEditing(true);
        setEditingValue(value);

        onFocus?.(e);
      }}
      onChange={(valueAsString, valueAsNumber) => {
        const nextValue = isNaN(valueAsNumber) ? 0 : valueAsNumber;
        setEditingValue(nextValue);

        onChange?.(valueAsString, valueAsNumber);
      }}
      onBlur={(e) => {
        setEditing(false);
        onComplete?.(editingValue);

        onBlur?.(e);
      }}
      data-testid="RealTimeNumberInput"
      {...others}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default RealTimeNumberInput;
