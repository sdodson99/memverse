import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInput, { TextInputProps } from './TextInput';

describe('<TextInput />', () => {
  let props: TextInputProps;

  beforeEach(() => {
    props = {
      name: 'name',
      label: 'label',
    };
  });

  it('should mount', () => {
    render(<TextInput {...props} />);

    const textInput = screen.getByTestId('TextInput');

    expect(textInput).toBeInTheDocument();
  });

  it('should render error message when error message present', () => {
    props.errorMessage = 'Error message';
    render(<TextInput {...props} />);

    const error = screen.getByText('Error message');

    expect(error).toBeInTheDocument();
  });
});
