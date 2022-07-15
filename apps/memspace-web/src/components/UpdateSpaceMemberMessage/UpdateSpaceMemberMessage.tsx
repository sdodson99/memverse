import React, { useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import TextInput from '../TextInput/TextInput';
import styles from './UpdateSpaceMemberMessage.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMemberMessage } from '../../hooks/members/use-member-message';
import { useUpdateMemberMessage } from '../../hooks/members/use-update-member-message';
import { useAccountContext } from '../../hooks/authentication/use-account-context';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Button } from '@chakra-ui/react';

type UpdateSpaceMemberMessageProps = {
  onSuccess?: (memberId: string) => void;
};

type UpdateSpaceMemberMessageFieldVaues = {
  message: string;
};

const UpdateSpaceMemberMessage = ({
  onSuccess,
}: UpdateSpaceMemberMessageProps) => {
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
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<UpdateSpaceMemberMessageFieldVaues>({
    mode: 'onSubmit',
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
      const { id } = account;

      updateSpaceMemberMessage(id, message);

      onSuccess?.(id);
    }

    reset({}, { keepValues: true, keepIsSubmitted: true });
  };

  const showSubmitResult = isSubmitted && !isSubmitting;

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
            {...register('message')}
          />
          <div className={styles.submitRow}>
            <Button
              isLoading={isSubmitting}
              loadingText="Updating..."
              colorScheme="blue"
              type="submit"
            >
              Update
            </Button>
          </div>

          {showSubmitResult && submitError && (
            <div className={styles.errorMessage}>
              <ErrorMessage>
                Failed to update message. Please try again later.
              </ErrorMessage>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UpdateSpaceMemberMessage;
