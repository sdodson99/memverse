import { Layout } from '@/widgets/layout';
import Image from 'next/image';

const WEBSITE_URL = 'https://www.singletonsean.com';

export default function Privacy() {
  return (
    <Layout>
      <div className="bg-primary flex-1 text-white">
        <div className="content-container py-12">
          <div className="flex items-center">
            <Image src="/logo-dark.png" alt="" width="50" height="50" />
            <div className="ml-4">SingletonSean Members Showcase</div>
          </div>
          <h1 className="mt-12 text-4xl font-bold">Privacy Policy</h1>
          <section className="mt-12">
            <h2 className="text-2xl font-bold">Introduction</h2>
            <p className="py-2">
              SingletonSean (“we” or “us”) is committed to protecting your
              privacy. This Privacy Policy explains the methods and reasons we
              collect, use, disclose, transfer, and store your information. If
              you have any questions about the contents of this privacy policy,
              please contact us!
            </p>
            <p className="py-2">
              If you do not consent to the collection and use of information
              from or about you in accordance with this Privacy Policy, then you
              are not permitted to use the SingletonSean Members Showcase or any
              services provided on{' '}
              <a href={WEBSITE_URL} className="link">
                {WEBSITE_URL}
              </a>
              .
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold">Applicable Law</h2>
            <p className="py-2">
              SingletonSean is headquartered in the United States of America in
              the state of Maryland. By viewing any content or otherwise using
              the services offered by SingletonSean, you consent to the transfer
              of information to the United States of America to the extent
              applicable, and the collection, storage, and processing of
              information under Maryland, USA law.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold">Information We Collect</h2>
            <p className="py-2">
              <strong>Information you Submit</strong>: We store information you
              provide on this site via forms or any other interactive content.
              This information commonly includes, but is not limited to, your
              public YouTube profile (including channel ID, username, and
              avatar) and your YouTube Membership status with the SingletonSean
              channel.
            </p>
            <p className="py-2">
              <strong>Log Files</strong>: We collect information when you use
              services provided on our site. This information may include your
              IP address, device and software characteristics (such as type and
              operating system), page views, device identifiers or other unique
              identifiers such as advertising identifiers (e.g., “ad-ID” or
              “IDFA”), and carrier information. Log files are primarily used for
              the purpose of enhancing the user experience.
            </p>
            <p className="py-2">
              <strong>Cookies</strong>: We use cookies and related technologies
              to keep track of user preferences and activity. Cookies are small
              text files created by a web server, delivered through a web
              browser, and stored on your computer. Most Internet browsers
              automatically accept cookies. You can instruct your browser, by
              changing its settings, to stop accepting cookies or to prompt you
              before accepting a cookie from the websites you visit.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold">Third Party Services</h2>
            <p className="py-2">
              This site contains links to other websites not owned by
              SingletonSean. In general, the third-party services used by us
              will only collect, use and disclose your information to the extent
              necessary to allow them to perform their intended services. Please
              be aware that we are not responsible for the privacy policies of
              third-party services.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold">Children and COPPA</h2>
            <p className="py-2">
              SingletonSean is committed to complying with the Children’s Online
              Privacy Protection Act (COPPA). We do not use our services to
              intentionally solicit data from or market to children under the
              age of 13. We encourage parents and guardians to report any
              suspicions that a child has provided us with information without
              their consent. We will take reasonable action to remove this
              information.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold">Your Choices</h2>
            <p className="py-2">
              <strong>Opt-Out of Third Party Advertisement Cookies</strong>: You
              may opt out of a third-party vendor’s use of cookies for interest
              based advertising by visiting{' '}
              <a href="https://aboutads.info" className="link">
                https://aboutads.info
              </a>
              .
            </p>
            <p className="py-2">
              <strong>Do Not Track Browser settings</strong>: If you enable Do
              Not Track settings in the browser you are using, SingletonSean
              will not use information about websites you visit, other than our
              site. Learn more about Do Not Track by visiting{' '}
              <a href="https://allaboutdnt.com" className="link">
                https://allaboutdnt.com
              </a>
              .
            </p>
            <p className="py-2">
              <strong>Email Communication Opt-Out</strong>: If you receive
              promotional emails from SingletonSean, you can unsubscribe by
              clicking the bottom Unsubscribe or Opt-Out link at the bottom of
              every email.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="py-2">
              We believe our talented customer service staff will be able to
              resolve any issues you may have using the our services. If you
              would like additional information about this privacy policy,
              please visit our homepage at{' '}
              <a href={WEBSITE_URL} className="link">
                {WEBSITE_URL}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
