import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageLayout, { PageLayoutProps } from './PageLayout';
import { renderApp } from '../../test-utils/render-app';

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
    renderApp(<PageLayout {...props} />);

    const pageLayout = screen.getByTestId('PageLayout');

    expect(pageLayout).toBeInTheDocument();
  });

  it('should render content', () => {
    renderApp(<PageLayout {...props} />);

    const title = screen.getByText(props.title);
    const content = screen.getByText(children);

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });
});
