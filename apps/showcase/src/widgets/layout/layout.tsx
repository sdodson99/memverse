import { PropsWithChildren } from 'react';
import { Footer } from '../footer';
import classNames from 'classnames';

type LayoutProps = PropsWithChildren<{
  fill?: boolean;
}>;

export function Layout({ children, fill = true }: LayoutProps) {
  return (
    <>
      <main
        className={classNames('flex flex-col', {
          ['min-h-screen']: fill,
        })}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
