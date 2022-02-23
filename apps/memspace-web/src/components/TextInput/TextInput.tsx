import React from 'react';
import styles from './TextInput.module.css';

export type TextInputProps = {
  name: string;
  label: string;
  errorMessage?: string;
};

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
        <label htmlFor={name}>{label}</label>

        <input
          id={name}
          ref={ref}
          name={name}
          className={calculateInputClassName()}
          type="text"
          {...others}
        />

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
      </div>
    );
  }
);

export default TextInput;
