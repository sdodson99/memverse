import { logAnalyticsEvent } from '@/shared/analytics';
import { MdOpenInNew } from 'react-icons/md';

const JOIN_LINK =
  'https://www.youtube.com/channel/UC7X9mQ_XtTYWzr9Tf_NYcIg/join';

type UpdateMemberMessageForbiddenProps = {
  onClose: () => void;
};

export function UpdateMemberMessageForbidden({
  onClose,
}: UpdateMemberMessageForbiddenProps) {
  const handleCloseClick = () => {
    logAnalyticsEvent('update_message_forbidden_close');

    onClose();
  };

  const handleJoinNowClick = () => {
    logAnalyticsEvent('update_message_forbidden_join_click');
  };

  return (
    <div>
      <p>
        You must be a SingletonSean YouTube Member in order to share a message.
      </p>

      <div className="mt-8 flex">
        <a
          href={JOIN_LINK}
          target="_blank"
          className="mr-4 bg-blue-600 hover:bg-blue-800 transition text-white rounded px-4 py-2"
          onClick={handleJoinNowClick}
        >
          <span className="flex items-center">
            Join Now
            <MdOpenInNew className="inline ml-2" />
          </span>
        </a>
        <button
          onClick={handleCloseClick}
          className="mr-4 bg-gray-100 hover:bg-gray-300 transition text-black rounded px-4 py-2"
        >
          Close
        </button>
      </div>
    </div>
  );
}
