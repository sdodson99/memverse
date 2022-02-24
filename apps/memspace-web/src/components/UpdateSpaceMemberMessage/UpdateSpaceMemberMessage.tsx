import React, { useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import TextInput from '../TextInput/TextInput';
import styles from './UpdateSpaceMemberMessage.module.css';
import { useForm } from 'react-hook-form';
import { useMemberMessage } from '../../hooks/members/use-member-message';

type UpdateSpaceMemberMessageProps = {};

const UpdateSpaceMemberMessage = ({}: UpdateSpaceMemberMessageProps) => {
  const { message, loading, error } = useMemberMessage();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!loading && !error) {
      setValue('message', message);
    }
  }, [message, loading, error, setValue]);

  const onSubmit = () => {};

  return (
    <div
      className={styles.updateSpaceMemberMessage}
      data-testid="UpdateSpaceMemberMessage"
    >
      <div className={styles.description}>
        {
          "As a member, you get to set the message that you'd like to share with the world."
        }
      </div>

      {loading && (
        <div className={styles.loadingSpinner}>
          <LoadingSpinner size={100} />
        </div>
      )}

      {!loading && (
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
      )}
    </div>
  );
};

export default UpdateSpaceMemberMessage;
