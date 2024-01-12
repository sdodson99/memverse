import { Layout } from '@/widgets/layout';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  return (
    <Layout>
      <div className="bg-primary flex-1 text-white">
        <div className="content-container py-12">
          <div className="flex items-center">
            <Image src="/logo-dark.png" alt="" width="50" height="50" />
            <div className="ml-4">SingletonSean Members Showcase</div>
          </div>
          <h1 className="mt-12 text-4xl font-bold">About</h1>
          <section className="mt-12">
            <h2 className="text-2xl font-bold">What Is This App</h2>
            <p className="py-2">
              The SingletonSean Members Showcase is a platform that displays
              member avatars of the SingletonSean YouTube channel. Members can
              log in and add a message that shows under their member avatar in
              the showcase. This acts as a fun way to give a shoutout to channel
              members and allow them to share a message to everyone.
            </p>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              What This App Will Do With User Data
            </h2>
            <p className="py-2">
              The SingletonSean Members Showcase will use Google OAuth to get
              the YouTube channel ID of the logged in user. This app will use
              the channel ID in order to determine if the user is a member of
              the SingletonSean YouTube channel.
            </p>
            <p className="py-2">
              The channel ID will be securely encrypted in an HTTP-only cookie.
            </p>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              How This App Enhances User Functionality
            </h2>
            <p className="py-2">
              Verified SingletonSean channel members will be able to access
              premium perks when the log in to the SingletonSean Members
              Showcase. Most notably, they will be able to share a message under
              their member showcase avatar.
            </p>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-bold">
              Google OAuth2 Limited Use Disclosure
            </h2>
            <p className="py-2">
              The SingletonSean Members Showcase understands and will adhere to
              the{' '}
              <a
                className="link"
                href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>
          <section className="mt-12">
            <h2 className="text-2xl font-bold">Privacy Policy</h2>
            <p className="py-2">
              Please view our Privacy Policy at{' '}
              <Link className="link" href="/privacy">
                https://www.singletonsean.com/privacy
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
