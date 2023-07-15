import { SubmitHandler, useForm } from 'react-hook-form';
import { updateMemberMessageAction } from './update-member-message-action';
import { useState } from 'react';
import { useMembersContext } from '@/entities/member';
import { useAuthContext } from '../auth';
import { logAnalyticsEvent } from '@/shared/analytics';
import { useCurrentMock } from '@/shared/mock';

type UpdateMemberMessageFieldVaues = {
  message: string;
};

export type UpdateMemberMessageFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function UpdateMemberMessageForm({
  onSuccess,
  onCancel,
}: UpdateMemberMessageFormProps) {
  const session = useAuthContext().useSession();
  const { members, updateMemberMessage } = useMembersContext();

  const currentMemberId = session?.data?.channelId;
  const currentMember = members.find((m) => m.id === currentMemberId);
  const currentMemberMessage = currentMember?.message;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateMemberMessageFieldVaues>({
    values: {
      message: currentMemberMessage ?? '',
    },
  });

  const [submitError, setSubmitError] = useState(false);

  const { mock, mockChannelId } = useCurrentMock();

  const handleValidSubmit: SubmitHandler<
    UpdateMemberMessageFieldVaues
  > = async (data) => {
    logAnalyticsEvent('update_message_valid_submit');

    setSubmitError(false);

    try {
      await updateMemberMessageAction(data, {
        mock,
        mockChannelId,
      });

      if (currentMemberId) {
        updateMemberMessage(currentMemberId, data.message);
      }

      logAnalyticsEvent('update_message_success', {
        messageLength: data.message.length,
      });

      onSuccess();
    } catch (err) {
      logAnalyticsEvent('update_message_error');

      setSubmitError(true);
    }
  };

  const handleInvalidSubmit = () => {
    logAnalyticsEvent('update_message_invalid_submit');
  };

  const handleCancelClick = () => {
    logAnalyticsEvent('update_message_cancel');

    onCancel();
  };

  const handleMessageInputBlur = () => {
    logAnalyticsEvent('update_message_input_change');
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}>
      {submitError ? (
        <p className="p-4 bg-red-600 text-white mb-8 rounded-lg">
          Failed to update message. Please try again!
        </p>
      ) : null}

      <p>As a member, you get to share a message with the world.</p>

      <div className="mt-8 flex flex-col">
        <label htmlFor="message">Message</label>
        <input
          {...register('message', {
            onBlur: handleMessageInputBlur,
          })}
          id="message"
          className="mt-2 px-1 py-2 border border-gray-300 rounded"
          maxLength={50}
        />
      </div>
      <div className="mt-8">
        <button
          type="submit"
          className="mr-4 bg-blue-600 hover:bg-blue-800 transition text-white rounded px-4 py-2 disabled:opacity-70"
          disabled={isSubmitting}
        >
          Update
        </button>
        <button
          type="button"
          className="mr-4 bg-gray-100 hover:bg-gray-300 transition text-black rounded px-4 py-2"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
