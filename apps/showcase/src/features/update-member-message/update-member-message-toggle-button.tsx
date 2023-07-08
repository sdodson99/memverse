'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { UpdateMemberMessageForm } from './update-member-message-form';
import { useMembersContext } from '../view-members/members-context';
import { useSession } from 'next-auth/react';
import * as Toast from '@radix-ui/react-toast';

const MESSAGE_UPDATED_TOAST_TIMEOUT_LENGTH = 3000;

export function UpdateMemberMessageToggleButton() {
  const [isUpdateMemberMessageSheetOpen, setIsUpdateMemberMessageSheetOpen] =
    useState(false);
  const [showMessageUpdatedToast, setShowMessageUpdatedToast] = useState(false);
  const messageUpdatedToastTimeoutRef = useRef(0);

  function openUpdateMemberMessageSheet() {
    setIsUpdateMemberMessageSheetOpen(true);
  }

  function handleUpdateMessageSuccess() {
    setIsUpdateMemberMessageSheetOpen(false);

    setShowMessageUpdatedToast(true);
    messageUpdatedToastTimeoutRef.current = window.setTimeout(() => {
      setShowMessageUpdatedToast(false);
    }, MESSAGE_UPDATED_TOAST_TIMEOUT_LENGTH);
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
          <UpdateMemberMessageForm
            onSuccess={handleUpdateMessageSuccess}
            onCancel={handleSheetDismiss}
          />
        </section>
      </BottomSheet>

      <Toast.Provider>
        <Toast.Root
          open={showMessageUpdatedToast}
          className="text-white bg-green-700 rounded-lg p-4"
        >
          <Toast.Title className="font-bold">Message Updated</Toast.Title>
          <Toast.Description>
            We successfully updated your message.
          </Toast.Description>
        </Toast.Root>

        <Toast.Viewport className="fixed top-0 p-4 right-1/2 translate-x-1/2" />
      </Toast.Provider>
    </div>
  );
}
