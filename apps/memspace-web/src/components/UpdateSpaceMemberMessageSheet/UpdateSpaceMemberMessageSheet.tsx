import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import styles from './UpdateSpaceMemberMessageSheet.module.css';
import { useForm } from 'react-hook-form';
import TextInput from '../TextInput/TextInput';

export type UpdateSpaceMemberMessageSheetProps = {
  open: boolean;
  onDismiss?: () => void;
};

const UpdateSpaceMemberMessageSheet = ({
  open,
  onDismiss,
}: UpdateSpaceMemberMessageSheetProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit = () => {};

  return (
    <BottomSheet
      open={open}
      header="Message"
      maxHeight={500}
      onDismiss={onDismiss}
      className={styles.updateSpaceMemberMessageSheet}
      data-testid="UpdateSpaceMemberMessageSheet"
    >
      <div className={styles.content}>
        <div className={styles.description}>
          {
            "As a member, you get to set the message that you'd like to share with the world."
          }
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Message"
            errorMessage={errors.message?.message}
            maxLength={100}
            {...register('message', {
              required: 'Required',
            })}
          />
          <button className={styles.submitButton}>Update</button>
        </form>
      </div>
    </BottomSheet>
  );
};

export default UpdateSpaceMemberMessageSheet;
