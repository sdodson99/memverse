'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { UpdateMemberMessageForm } from './update-member-message-form';

export function UpdateMemberMessageToggleButton() {
  const [isUpdateMemberMessageSheetOpen, setIsUpdateMemberMessageSheetOpen] =
    useState(false);

  function openUpdateMemberMessageSheet() {
    setIsUpdateMemberMessageSheetOpen(true);
  }

  function handleSheetDismiss() {
    setIsUpdateMemberMessageSheetOpen(false);
  }

  return (
    <div>
      <button className="mx-8" onClick={openUpdateMemberMessageSheet}>
        <Image
          src="/pencil-emoji.png"
          alt="Update Message"
          width="50"
          height="50"
        />
      </button>
      <BottomSheet
        open={isUpdateMemberMessageSheetOpen}
        onDismiss={handleSheetDismiss}
        header="Update Message"
        maxHeight={500}
      >
        <section className="max-w-2xl mx-auto my-8 px-8">
          <p>As a member, you get to share a message with the world.</p>

          <UpdateMemberMessageForm onCancel={handleSheetDismiss} />
        </section>
      </BottomSheet>
    </div>
  );
}
