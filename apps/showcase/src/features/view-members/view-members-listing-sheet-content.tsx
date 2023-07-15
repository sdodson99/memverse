import { useMembersContext } from '@/entities/member';
import { ChangeEvent, useEffect, useState } from 'react';
import { MembersListing } from './members-listing';
import InfiniteScroll from 'react-infinite-scroll-component';
import { logAnalyticsEvent } from '@/shared/analytics';

const MEMBERS_TO_SHOW_PER_SCROLL = 20;

export function ViewMembersListingSheetContent() {
  const { members } = useMembersContext();

  const [sheetScrollTargetId, setSheetScrollTargetId] = useState<string>();
  const [membersToShowLength, setMembersToShowLength] = useState(
    MEMBERS_TO_SHOW_PER_SCROLL
  );

  useEffect(() => {
    const sheetScrollTarget = document.querySelector(
      '[data-rsbs-scroll="true"]'
    );

    if (!sheetScrollTarget) {
      return;
    }

    sheetScrollTarget.id = 'sheet-scroll-id';

    setSheetScrollTargetId(sheetScrollTarget.id);
  }, []);

  const loadMoreMembers = () => {
    setMembersToShowLength((c) => c + MEMBERS_TO_SHOW_PER_SCROLL);
  };

  const [membersSearch, setMembersSearch] = useState('');

  const handleMembersSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMembersSearch(e.target.value);
  };

  const handleMembersSearchBlur = () => {
    if (!membersSearch.length) {
      return;
    }

    logAnalyticsEvent('view_members_sheet_search_input_use');
  };

  const membersCount = members.length;

  const transformedMembers = members
    .sort((a, b) => {
      return (b.message?.length ?? 0) - (a.message?.length ?? 0);
    })
    .filter((m) =>
      m.username.toLowerCase().includes(membersSearch.toLowerCase())
    )
    .slice(0, membersToShowLength);

  const canLoadMoreMembers = transformedMembers.length !== membersCount;

  return (
    <section
      data-testid="ViewMembersSheet"
      className="max-w-2xl mx-auto my-8 px-8"
    >
      <p>
        Thank you to the <strong>{membersCount}</strong> member(s) below for
        supporting the SingletonSean YouTube channel.
      </p>

      <input
        type="text"
        className="mt-8 px-1 py-2 border border-gray-300 rounded w-full"
        onChange={handleMembersSearchChange}
        onBlur={handleMembersSearchBlur}
        placeholder="Search Members..."
      />

      <div className="mt-8">
        {sheetScrollTargetId ? (
          <InfiniteScroll
            next={loadMoreMembers}
            hasMore={canLoadMoreMembers}
            dataLength={transformedMembers.length}
            loader={<div />}
            scrollableTarget={sheetScrollTargetId}
          >
            <MembersListing members={transformedMembers} />
          </InfiniteScroll>
        ) : null}
      </div>
    </section>
  );
}
