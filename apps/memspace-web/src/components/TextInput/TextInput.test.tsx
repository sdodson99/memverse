import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInput, { TextInputProps } from './TextInput';

describe('<TextInput />', () => {
  let props: Pick<
    TextInputProps,
    | 'label'
    | 'errorMessage'
    | 'key'
    | keyof React.InputHTMLAttributes<HTMLInputElement>
  > &
    React.RefAttributes<HTMLInputElement>;

  beforeEach(() => {
    props = {
      name: 'name',
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

  it('should render label when label provided', () => {
    props.label = 'Label';
    render(<TextInput {...props} />);

    const label = screen.getByText('Label');

    expect(label).toBeInTheDocument();
  });
});
