import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewSpaceMembers from './ViewSpaceMembers';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { renderApp } from '../../test-utils/render-app';

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('<ViewSpaceMembers />', () => {
  let mockToggleSpaceMemberPaused: jest.Mock;
  let mockSetShowSpaceMemberDetails: jest.Mock;

  beforeEach(() => {
    mockToggleSpaceMemberPaused = jest.fn();
    mockSetShowSpaceMemberDetails = jest.fn();

    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembers: [
        { id: '1', username: 'user1' },
        { id: '2', username: 'user2' },
      ],
      toggleSpaceMemberPaused: mockToggleSpaceMemberPaused,
      setShowSpaceMemberDetails: mockSetShowSpaceMemberDetails,
    });
  });

  afterEach(() => {
    mockUseSpaceMembersContext.mockReset();
  });

  it('should mount', () => {
    renderApp(<ViewSpaceMembers />);

    const viewSpaceMembers = screen.getByTestId('ViewSpaceMembers');

    expect(viewSpaceMembers).toBeInTheDocument();
  });

  it('should render members listing', () => {
    renderApp(<ViewSpaceMembers />);

    const membersListing = screen.getByTestId('SpaceMemberListing');

    expect(membersListing).toBeInTheDocument();
  });

  it('should toggle pause when space member paused', () => {
    renderApp(<ViewSpaceMembers />);
    const firstMenuButton = screen.getAllByTestId('MenuButton')[0];
    firstMenuButton.click();

    const pauseButton = screen.getAllByText('Pause')[0];
    pauseButton.click();

    expect(mockToggleSpaceMemberPaused).toBeCalledWith({
      id: '1',
      username: 'user1',
    });
  });

  it('should show details when space member details requested to be shown', () => {
    renderApp(<ViewSpaceMembers />);
    const firstMenuButton = screen.getAllByTestId('MenuButton')[0];
    firstMenuButton.click();

    const showDetailsButton = screen.getAllByText('Show Details')[0];
    showDetailsButton.click();

    expect(mockSetShowSpaceMemberDetails).toBeCalledWith(
      { id: '1', username: 'user1' },
      true
    );
  });

  it('should order space members by message', () => {
    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembers: [
        { id: '1', username: 'user1', message: 'def' },
        { id: '2', username: 'user2' },
        { id: '3', username: 'user3', message: 'abc' },
      ],
    });
    renderApp(<ViewSpaceMembers />);

    const spaceMemberListingItemUsernames = screen.getAllByTestId(
      'SpaceMemberListingItemUsername'
    );

    expect(spaceMemberListingItemUsernames[0].textContent).toBe('user1');
    expect(spaceMemberListingItemUsernames[1].textContent).toBe('user3');
    expect(spaceMemberListingItemUsernames[2].textContent).toBe('user2');
  });

  describe('with filtering', () => {
    it('should only render members that pass filter', () => {
      renderApp(<ViewSpaceMembers />);
      const filterInput = screen.getByPlaceholderText('Filter members');

      fireEvent.change(filterInput, {
        target: {
          value: 'user1',
        },
      });
      const user1 = screen.queryByText('user1');
      const user2 = screen.queryByText('user2');

      expect(user1).toBeInTheDocument();
      expect(user2).not.toBeInTheDocument();
    });

    it('should render fallback message when all members filtered', () => {
      renderApp(<ViewSpaceMembers />);
      const filterInput = screen.getByPlaceholderText('Filter members');

      fireEvent.change(filterInput, {
        target: {
          value: 'random filter',
        },
      });
      const fallbackMessage = screen.queryByText(
        "No members found that match the filter 'random filter'."
      );

      expect(fallbackMessage).toBeInTheDocument();
    });
  });
});
