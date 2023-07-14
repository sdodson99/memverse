'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { MembersListing } from './members-listing';
import { logAnalyticsEvent } from '@/shared/analytics';
import { useMembersContext } from '@/entities/member';

export function ViewMembersListingToggleButton() {
  const [isMembersListingSheetOpen, setIsMembersListingSheetOpen] =
    useState(false);

  function openMembersListingSheet() {
    logAnalyticsEvent('open_members_listing_sheet');
    setIsMembersListingSheetOpen(true);
  }

  function dismissMembersListingSheet() {
    logAnalyticsEvent('close_members_listing_sheet');
    setIsMembersListingSheetOpen(false);
  }

  const { members } = useMembersContext();
  const membersCount = members.length;

  return (
    <div>
      <button className="mx-8" onClick={openMembersListingSheet}>
        <Image
          src="/magnifying-glass-emoji.png"
          alt="View Members"
          width="50"
          height="50"
        />
      </button>
      <BottomSheet
        open={isMembersListingSheetOpen}
        onDismiss={dismissMembersListingSheet}
        header="Members"
        defaultSnap={({ maxHeight }) => maxHeight * 0.8}
        snapPoints={({ maxHeight }) => [maxHeight * 0.8]}
      >
        <section
          data-testid="ViewMembersSheet"
          className="max-w-2xl mx-auto my-8 px-8"
        >
          <p>
            Thank you to the <strong>{membersCount}</strong> member(s) below for
            supporting the SingletonSean YouTube channel.
          </p>

          <div className="mt-8">
            <MembersListing />
          </div>
        </section>
      </BottomSheet>
    </div>
  );
}
