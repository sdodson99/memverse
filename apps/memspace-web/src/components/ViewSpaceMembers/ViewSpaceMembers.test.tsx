import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewSpaceMembers from './ViewSpaceMembers';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';

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
    render(<ViewSpaceMembers />);

    const viewSpaceMembers = screen.getByTestId('ViewSpaceMembers');

    expect(viewSpaceMembers).toBeInTheDocument();
  });

  it('should render members listing', () => {
    render(<ViewSpaceMembers />);

    const membersListing = screen.getByTestId('SpaceMemberListing');

    expect(membersListing).toBeInTheDocument();
  });

  it('should toggle pause when space member paused', () => {
    render(<ViewSpaceMembers />);
    const firstMenuButton = screen.getAllByTestId('MenuButton')[0];
    firstMenuButton.click();

    const pauseButton = screen.getByText('Pause');
    pauseButton.click();

    expect(mockToggleSpaceMemberPaused).toBeCalledWith({
      id: '1',
      username: 'user1',
    });
  });

  it('should show details when space member details requested to be shown', () => {
    render(<ViewSpaceMembers />);
    const firstMenuButton = screen.getAllByTestId('MenuButton')[0];
    firstMenuButton.click();

    const showDetailsButton = screen.getByText('Show Details');
    showDetailsButton.click();

    expect(mockSetShowSpaceMemberDetails).toBeCalledWith(
      { id: '1', username: 'user1' },
      true
    );
  });

  describe('with filtering', () => {
    it('should only render members that pass filter', () => {
      render(<ViewSpaceMembers />);
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
      render(<ViewSpaceMembers />);
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
