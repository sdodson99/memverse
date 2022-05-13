import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceToolbar from './SpaceToolbar';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';
import { useAccountContext } from '../../hooks/authentication/use-account-context';
import { renderApp } from '../../test-utils/render-app';

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

jest.mock('../../hooks/authentication/use-is-logged-in');
const mockUseIsLoggedIn = useIsLoggedIn as jest.Mock;

jest.mock('../../hooks/authentication/use-account-context');
const mockUseAccountContext = useAccountContext as jest.Mock;

describe('<SpaceToolbar />', () => {
  beforeEach(() => {
    mockUseSpaceMembersContext.mockReturnValue({ spaceMembers: [] });
    mockUseAccountContext.mockReturnValue({});
  });

  afterEach(() => {
    mockUseSpaceMembersContext.mockReset();
    mockUseAccountContext.mockReset();
    mockUseIsLoggedIn.mockReset();
  });

  it('should mount', () => {
    renderApp(<SpaceToolbar />);

    const spaceToolbar = screen.getByTestId('SpaceToolbar');

    expect(spaceToolbar).toBeInTheDocument();
  });

  it('should open members sheet when view members button clicked', () => {
    renderApp(<SpaceToolbar />);
    const viewMembersButton = screen.getByText('🔎');

    viewMembersButton.click();
    const viewSpaceMembers = screen.getByTestId('ViewSpaceMembers');

    expect(viewSpaceMembers).toBeInTheDocument();
  });

  describe('when logged in', () => {
    beforeEach(() => {
      mockUseIsLoggedIn.mockReturnValue(true);
    });

    it('should open update message sheet when update message button clicked', () => {
      renderApp(<SpaceToolbar />);
      const updateMessageButton = screen.getByText('✏️');

      updateMessageButton.click();
      const updateMemberMessage = screen.getByTestId(
        'UpdateSpaceMemberMessage'
      );

      expect(updateMemberMessage).toBeInTheDocument();
    });
  });
});
