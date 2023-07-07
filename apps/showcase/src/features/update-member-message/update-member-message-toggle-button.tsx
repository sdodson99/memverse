'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

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

          <form>
            <div className="mt-8 flex flex-col">
              <label htmlFor="message">Message</label>
              <input
                type="text"
                name="message"
                id="message"
                className="mt-2 px-1 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="mr-4 bg-blue-600 hover:bg-blue-800 transition text-white rounded px-4 py-2"
              >
                Update
              </button>
              <button
                type="button"
                className="mr-4 bg-gray-100 hover:bg-gray-300 transition text-black rounded px-4 py-2"
                onClick={handleSheetDismiss}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </BottomSheet>
    </div>
  );
}
