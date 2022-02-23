import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceToolbar from './SpaceToolbar';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { useIsLoggedIn } from '../../hooks/authentication/use-is-logged-in';

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

jest.mock('../../hooks/authentication/use-is-logged-in');
const mockUseIsLoggedIn = useIsLoggedIn as jest.Mock;

describe('<SpaceToolbar />', () => {
  beforeEach(() => {
    mockUseSpaceMembersContext.mockReturnValue({ spaceMembers: [] });
  });

  afterEach(() => {
    mockUseSpaceMembersContext.mockReset();
    mockUseIsLoggedIn.mockReset();
  });

  it('should mount', () => {
    render(<SpaceToolbar />);

    const spaceToolbar = screen.getByTestId('SpaceToolbar');

    expect(spaceToolbar).toBeInTheDocument();
  });

  it('should open members sheet when view members button clicked', () => {
    render(<SpaceToolbar />);
    const viewMembersButton = screen.getByText('🔎');

    viewMembersButton.click();
    const spaceMembersSheet = screen.getByTestId('SpaceMembersSheet');

    expect(spaceMembersSheet).toBeInTheDocument();
  });

  describe('when logged in', () => {
    beforeEach(() => {
      mockUseIsLoggedIn.mockReturnValue(true);
    });

    it('should open update message sheet when update message button clicked', () => {
      render(<SpaceToolbar />);
      const updateMessageButton = screen.getByText('✏️');

      updateMessageButton.click();
      const updateMessageSheet = screen.getByTestId(
        'UpdateSpaceMemberMessageSheet'
      );

      expect(updateMessageSheet).toBeInTheDocument();
    });
  });
});
