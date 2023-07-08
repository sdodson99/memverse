import { useSession } from 'next-auth/react';
import { useMembersContext } from '../view-members/members-context';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateMemberMessageAction } from './update-member-message-action';
import { useState } from 'react';

type UpdateMemberMessageFieldVaues = {
  message: string;
};

type UpdateMemberMessageFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function UpdateMemberMessageForm({
  onSuccess,
  onCancel,
}: UpdateMemberMessageFormProps) {
  const session = useSession();
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

  const handleValidSubmit: SubmitHandler<
    UpdateMemberMessageFieldVaues
  > = async (data) => {
    setSubmitError(false);

    try {
      await updateMemberMessageAction(data);

      if (currentMemberId) {
        updateMemberMessage(currentMemberId, data.message);
      }

      onSuccess();
    } catch (err) {
      setSubmitError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)}>
      {submitError ? (
        <p className="p-4 bg-red-600 text-white mb-8 rounded-lg">
          Failed to update message. Please try again!
        </p>
      ) : null}

      <p>As a member, you get to share a message with the world.</p>

      <div className="mt-8 flex flex-col">
        <label htmlFor="message">Message</label>
        <input
          {...register('message')}
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
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
