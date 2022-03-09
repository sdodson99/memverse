import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import styles from './TextInput.module.css';

export type TextInputProps = {
  name: string;
  label?: string;
  errorMessage?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function InnerTextInput(
    { name, label, errorMessage, ...others }: TextInputProps,
    ref
  ) {
    const calculateInputClassName = () => {
      let className = styles.input;

      if (errorMessage) {
        className += ` ${styles.errorInput}`;
      }

      return className;
    };

    return (
      <div className={styles.textInput} data-testid="TextInput">
        {label && <label htmlFor={name}>{label}</label>}

        <input
          id={name}
          data-testid={`${name}TextInput`}
          ref={ref}
          name={name}
          className={calculateInputClassName()}
          type="text"
          {...others}
        />

        {errorMessage && (
          <div className={styles.errorMessage}>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </div>
        )}
      </div>
    );
  }
);

export default TextInput;
