import { render } from '@testing-library/react';
import { ReactNode, Suspense } from 'react';

export function renderServerComponent(children: ReactNode) {
  const result = render(<Suspense>{children}</Suspense>);

  return {
    ...result,
    rerender: (nextChildren: ReactNode) =>
      result.rerender(<Suspense>{nextChildren}</Suspense>),
  };
}
