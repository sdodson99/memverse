import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { renderApp } from '../../test-utils/render-app';
import MetaPage from '../meta.page';
import pkg from '../../../package.json';

describe('<MetaPage />', () => {
  it('should render version', () => {
    pkg.version = '1.2.3';
    renderApp(<MetaPage />);

    const version = screen.getByText('Version: 1.2.3');

    expect(version).toBeInTheDocument();
  });
});
