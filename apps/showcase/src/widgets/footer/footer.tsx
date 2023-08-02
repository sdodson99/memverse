import Image from 'next/image';
import { BsYoutube } from 'react-icons/bs';

const YOUTUBE_CHANNEL_LINK = 'https://www.youtube.com/@SingletonSean';

export function Footer() {
  return (
    <footer className="text-white">
      <section className="bg-zinc-900">
        <div className="content-container flex flex-col items-center p-8 sm:flex-row sm:justify-between sm:items-start mx-auto">
          <Image src="/logo-light.png" alt="" width="75" height="75" />
          <div className="mt-8 sm:mt-0 sm:ml-8">
            <a
              className="flex items-center hover:underline"
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
      <section className="p-4 text-center bg-black text-sm">
        Copyright © {new Date().getFullYear()} Sean Dodson. All rights reserved.
      </section>
    </footer>
  );
}
