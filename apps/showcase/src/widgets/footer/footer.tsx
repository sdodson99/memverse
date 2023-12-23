import Image from 'next/image';
import Link from 'next/link';
import { BsYoutube } from 'react-icons/bs';
import { MdPrivacyTip, MdStar } from 'react-icons/md';

const YOUTUBE_CHANNEL_LINK = 'https://www.youtube.com/@SingletonSean';

export function Footer() {
  return (
    <footer className="text-white">
      <section className="bg-zinc-900">
        <div className="content-container mx-auto flex flex-col items-center py-8 sm:flex-row sm:justify-between">
          <Image src="/logo-light.png" alt="" width="75" height="75" />
          <div className="mt-8 sm:ml-8 sm:mt-0">
            <Link
              className="flex items-center justify-center hover:underline sm:justify-start"
              href="/"
            >
              <MdStar />
              <span className="ml-2">Showcase</span>
            </Link>
            <Link
              className="mt-4 flex items-center justify-center hover:underline sm:justify-start"
              href="privacy"
            >
              <MdPrivacyTip />
              <span className="ml-2">Privacy</span>
            </Link>
            <a
              className="mt-4 flex items-center justify-center hover:underline sm:justify-start"
              href={YOUTUBE_CHANNEL_LINK}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <BsYoutube />
              <span className="ml-2">Channel</span>
            </a>
          </div>
        </div>
      </section>
      <section className="bg-black p-4 text-center text-sm">
        Copyright © {new Date().getFullYear()} SingletonSean. All rights
        reserved.
      </section>
    </footer>
  );
}
