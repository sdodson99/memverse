import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RealTimeNumberInput from './RealTimeNumberInput';
import { FormLabel } from '@chakra-ui/react';

describe('<RealTimeNumberInput />', () => {
  it('should mount', () => {
    render(<RealTimeNumberInput />);

    const realTimeNumberInput = screen.getByTestId('RealTimeNumberInput');

    expect(realTimeNumberInput).toBeInTheDocument();
  });

  it('should raise on complete with edited value', () => {
    const nextValue = 120;
    const mockOnComplete = jest.fn();
    render(
      <>
        <FormLabel htmlFor="testInput">Label</FormLabel>
        <RealTimeNumberInput id="testInput" onComplete={mockOnComplete} />
      </>
    );

    const realTimeNumberInput = screen.getByLabelText('Label');
    fireEvent.focus(realTimeNumberInput);
    fireEvent.change(realTimeNumberInput, {
      target: {
        value: nextValue,
      },
    });
    fireEvent.blur(realTimeNumberInput);

    expect(mockOnComplete).toBeCalledWith(nextValue);
  });
});
