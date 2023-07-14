import { Member, useMembersContext } from '@/entities/member';
import { logAnalyticsEvent } from '@/shared/analytics';
import Image from 'next/image';
import { useState } from 'react';
import { MdOpenInNew } from 'react-icons/md';
import InfiniteScroll from 'react-infinite-scroll-component';

const MEMBERS_TO_SHOW_PER_SCROLL = 20;

type MembersListingProps = {
  scrollTargetId?: string;
};

export function MembersListing({ scrollTargetId }: MembersListingProps) {
  const { members } = useMembersContext();

  const [membersToShowLength, setMembersToShowLength] = useState(
    MEMBERS_TO_SHOW_PER_SCROLL
  );

  const transformedMembers = members
    .sort((a, b) => {
      return (b.message?.length ?? 0) - (a.message?.length ?? 0);
    })
    .slice(0, membersToShowLength);

  const loadMoreMembers = () => {
    setMembersToShowLength((c) => c + MEMBERS_TO_SHOW_PER_SCROLL);
  };

  const canLoadMoreMembers = members.length !== transformedMembers.length;

  return (
    <InfiniteScroll
      next={loadMoreMembers}
      hasMore={canLoadMoreMembers}
      dataLength={transformedMembers.length}
      loader={<div />}
      scrollableTarget={scrollTargetId}
    >
      <div>
        {transformedMembers.map((m) => (
          <article key={m.id} className="mb-4">
            <MemberListingItem {...m} />
          </article>
        ))}
      </div>
    </InfiniteScroll>
  );
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
