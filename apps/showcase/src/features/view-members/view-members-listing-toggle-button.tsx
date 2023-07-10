'use client';

import { useState } from 'react';
import Image from 'next/image';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { MembersListing } from './members-listing';
import { logAnalyticsEvent } from '@/shared/analytics';

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
          <MembersListing />
        </section>
      </BottomSheet>
    </div>
  );
}
