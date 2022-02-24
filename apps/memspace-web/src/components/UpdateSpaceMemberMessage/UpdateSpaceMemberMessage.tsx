import React, { useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import TextInput from '../TextInput/TextInput';
import styles from './UpdateSpaceMemberMessage.module.css';
import { useForm } from 'react-hook-form';
import { useMemberMessage } from '../../hooks/members/use-member-message';

type UpdateSpaceMemberMessageProps = {};

const UpdateSpaceMemberMessage = ({}: UpdateSpaceMemberMessageProps) => {
  const { message, loading, error: loadError } = useMemberMessage();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const currentMessage = watch('message');

  useEffect(() => {
    if (!loading && !loadError) {
      setValue('message', message);
    }
  }, [message, loading, loadError, setValue]);

  const onSubmit = () => {};

  const messageDirty = message !== currentMessage;
  const canSubmit = !isSubmitting && messageDirty;

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
          <div className={styles.submitRow}>
            <button className={styles.submitButton} disabled={!canSubmit}>
              Update
            </button>

            {isSubmitting && (
              <div className={styles.submittingSpinner}>
                <LoadingSpinner size={35} strokeWidth={3} color="black" />
              </div>
            )}
          </div>
          <div className={styles.errorMessage}>
            Failed to update message. Please try again later.
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateSpaceMemberMessage;
