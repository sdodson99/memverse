'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { UpdateMemberMessageForm } from './update-member-message-form';
import { useMembersContext } from '../view-members/members-context';
import { useSession } from 'next-auth/react';

export function UpdateMemberMessageToggleButton() {
  const [isUpdateMemberMessageSheetOpen, setIsUpdateMemberMessageSheetOpen] =
    useState(false);

  function openUpdateMemberMessageSheet() {
    setIsUpdateMemberMessageSheetOpen(true);
  }

  function handleSheetDismiss() {
    setIsUpdateMemberMessageSheetOpen(false);
  }

  const session = useSession();
  const { members } = useMembersContext();
  const isCurrentMember = members.some(
    (m) => m.id === session?.data?.channelId
  );

  return (
    <div>
      <button
        disabled={!isCurrentMember}
        className="mx-8 disabled:opacity-70"
        onClick={openUpdateMemberMessageSheet}
      >
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
