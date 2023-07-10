import { Member, useMembersContext } from '@/entities/member';
import { logAnalyticsEvent } from '@/shared/analytics';
import Image from 'next/image';
import { MdOpenInNew } from 'react-icons/md';

export function MembersListing() {
  const { members } = useMembersContext();

  const sortedMembers = members.sort((a, b) => {
    return (b.message?.length ?? 0) - (a.message?.length ?? 0);
  });

  return sortedMembers.map((m) => (
    <article key={m.id} className="mb-4">
      <MemberListingItem {...m} />
    </article>
  ));
}

function MemberListingItem({ id, username, message, photoUrl }: Member) {
  const channelLink = `https://www.youtube.com/channel/${id}`;

  function handleViewChannelClick() {
    logAnalyticsEvent('view_member_channel_click', {
      targetMemberId: id,
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src={photoUrl}
          alt={`${username} Avatar`}
          data-testid={photoUrl}
          width={75}
          height={75}
          className="flex-shrink-0"
        />
        <div className="ml-4 flex-shrink">
          <div className="font-bold">{username}</div>
          {message ? <div className="break-word">{message}</div> : null}
        </div>
      </div>
      <a
        className="ml-2"
        href={channelLink}
        onClick={handleViewChannelClick}
        target="_blank"
        referrerPolicy="no-referrer"
      >
        <MdOpenInNew aria-label="View Channel" size={'1.5rem'} />
      </a>
    </div>
  );
}
