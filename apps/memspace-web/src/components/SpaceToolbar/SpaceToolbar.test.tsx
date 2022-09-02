import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceToolbar from './SpaceToolbar';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';
import { renderApp } from '../../test-utils/render-app';
import { usePaperScope } from '../../hooks/space/use-paper-scope';

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

jest.mock('../../hooks/authentication/use-is-logged-in');
const mockUseIsLoggedIn = useIsLoggedIn as jest.Mock;

jest.mock('../../hooks/space/use-paper-scope');
const mockUsePaperScope = usePaperScope as jest.Mock;

describe('<SpaceToolbar />', () => {
  let mockShuffleSpaceMembers: jest.Mock;

  beforeEach(() => {
    mockShuffleSpaceMembers = jest.fn();
    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembers: [],
      shuffleSpaceMembers: mockShuffleSpaceMembers,
    });

    mockUsePaperScope.mockReturnValue([]);
  });

  afterEach(() => {
    mockUseSpaceMembersContext.mockReset();
    mockUseIsLoggedIn.mockReset();
    mockUsePaperScope.mockReset();
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

  describe('when shuffle members clicked', () => {
    it('should shuffle members when paper scope available', () => {
      const bounds = {};
      mockUsePaperScope.mockReturnValue([
        {
          view: {
            bounds,
          },
        },
      ]);
      renderApp(<SpaceToolbar />);
      const shuffleMembersButton = screen.getByText('🔀');

      shuffleMembersButton.click();

      expect(mockShuffleSpaceMembers).toBeCalledWith(bounds);
    });

    it('should not shuffle members when paper scope not available', () => {
      renderApp(<SpaceToolbar />);
      const shuffleMembersButton = screen.getByText('🔀');

      shuffleMembersButton.click();

      expect(mockShuffleSpaceMembers).not.toBeCalled();
    });
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
