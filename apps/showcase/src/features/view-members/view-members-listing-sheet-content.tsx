import { useMembersContext } from '@/entities/member';
import { useEffect, useState } from 'react';
import { MembersListing } from './members-listing';

export function ViewMembersListingSheetContent() {
  const { members } = useMembersContext();

  const [sheetScrollTargetId, setSheetScrollTargetId] = useState<string>();

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

  const membersCount = members.length;

  return (
    <section
      data-testid="ViewMembersSheet"
      className="max-w-2xl mx-auto my-8 px-8"
    >
      <p>
        Thank you to the <strong>{membersCount}</strong> member(s) below for
        supporting the SingletonSean YouTube channel.
      </p>

      <div className="mt-8">
        {sheetScrollTargetId ? (
          <MembersListing scrollTargetId={sheetScrollTargetId} />
        ) : null}
      </div>
    </section>
  );
}
