import { useSession } from 'next-auth/react';
import { useMembersContext } from '../view-members/members-context';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateMemberMessageAction } from './update-member-message-action';

type UpdateMemberMessageFieldVaues = {
  message: string;
};

type UpdateMemberMessageFormProps = {
  onCancel: () => void;
};

export function UpdateMemberMessageForm({
  onCancel,
}: UpdateMemberMessageFormProps) {
  const session = useSession();
  const { members } = useMembersContext();

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

  const handleValidSubmit: SubmitHandler<
    UpdateMemberMessageFieldVaues
  > = async (data) => {
    try {
      await updateMemberMessageAction(data);
    } catch {
      onCancel();
    }
  };

  const handleInvalidSubmit = () => {
    console.warn('Invalid form submit');
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit, handleInvalidSubmit)}>
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
