import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpacePage from '../';
import { renderApp } from '../../test-utils/render-app';
import { useMembers } from '../../hooks/members/use-members';

jest.mock('../../hooks/members/use-members');
const mockUseMembers = useMembers as jest.Mock;

describe('<SpacePage />', () => {
  afterEach(() => {
    mockUseMembers.mockReset();
  });

  it('should render space when successfully loaded', () => {
    mockUseMembers.mockReturnValue({
      members: [],
    });
    renderApp(<SpacePage />);

    const space = screen.getByTestId('Space');

    expect(space).toBeInTheDocument();
  });

  it('should render loading prompt when loading', () => {
    mockUseMembers.mockReturnValue({
      loading: true,
    });
    renderApp(<SpacePage />);

    const loading = screen.getByText('Loading members...');

    expect(loading).toBeInTheDocument();
  });

  it('should render error prompt when loading fails', () => {
    mockUseMembers.mockReturnValue({
      error: new Error(),
    });
    renderApp(<SpacePage />);

    const error = screen.getByText(
      'Failed to load members. Please refresh to try again.'
    );

    expect(error).toBeInTheDocument();
  });
});
