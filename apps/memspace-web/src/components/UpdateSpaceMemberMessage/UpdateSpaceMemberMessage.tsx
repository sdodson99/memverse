import React, { useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import TextInput from '../TextInput/TextInput';
import styles from './UpdateSpaceMemberMessage.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMemberMessage } from '../../hooks/members/use-member-message';
import { useUpdateMemberMessage } from '../../hooks/members/use-update-member-message';
import { useAccountContext } from '../../hooks/authentication/use-account-context';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';

type UpdateSpaceMemberMessageProps = {};

type UpdateSpaceMemberMessageFieldVaues = {
  message: string;
};

const UpdateSpaceMemberMessage = ({}: UpdateSpaceMemberMessageProps) => {
  const { message, loading, error: loadError } = useMemberMessage();
  const { account } = useAccountContext();

  const { execute: executeUpdateMemberMessage, error: submitError } =
    useUpdateMemberMessage();
  const { updateSpaceMemberMessage } = useSpaceMembersContext();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<UpdateSpaceMemberMessageFieldVaues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (!loading && !loadError && message) {
      setValue('message', message);
    }
  }, [message, loading, loadError, setValue]);

  const onSubmit: SubmitHandler<UpdateSpaceMemberMessageFieldVaues> = async (
    data
  ) => {
    const { message } = data;

    const { error } = await executeUpdateMemberMessage(message);

    if (error) {
      return;
    }

    if (account) {
      updateSpaceMemberMessage(account.id, message);
    }

    reset({}, { keepValues: true });
  };

  const canSubmit = !isSubmitting && isDirty;

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
            autoComplete="off"
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
          {submitError && (
            <div className={styles.errorMessage}>
              Failed to update message. Please try again later.
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UpdateSpaceMemberMessage;
