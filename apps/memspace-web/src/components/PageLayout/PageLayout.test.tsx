import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageLayout, { PageLayoutProps } from './PageLayout';
import { AccessTokenProvider } from '../../hooks/authentication/use-access-token-context';

describe('<PageLayout />', () => {
  let props: PageLayoutProps;

  let children: string;

  beforeEach(() => {
    children = 'children';

    props = {
      title: 'title',
      children,
    };
  });

  it('should mount', () => {
    render(<PageLayout {...props} />, { wrapper: AccessTokenProvider });

    const pageLayout = screen.getByTestId('PageLayout');

    expect(pageLayout).toBeInTheDocument();
  });

  it('should render content', () => {
    render(<PageLayout {...props} />, { wrapper: AccessTokenProvider });

    const title = screen.getByText(props.title);
    const content = screen.getByText(children);

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
