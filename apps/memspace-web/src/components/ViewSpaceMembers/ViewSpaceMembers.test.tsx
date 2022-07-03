import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewSpaceMembers from './ViewSpaceMembers';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';
import { renderApp } from '../../test-utils/render-app';
import { SpaceMember } from '../../models/space-member';

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('<ViewSpaceMembers />', () => {
  let mockToggleSpaceMemberPaused: jest.Mock;
  let mockSetShowSpaceMemberDetails: jest.Mock;
  let spaceMembers: SpaceMember[];

  const createSpaceMember = (id: string) => {
    return {
      id,
      username: `user${id}`,
      speedPixelsPerSecond: 0,
      directionDegrees: 0,
      x: 0,
      y: 0,
    };
  };

  beforeEach(() => {
    mockToggleSpaceMemberPaused = jest.fn();
    mockSetShowSpaceMemberDetails = jest.fn();

    spaceMembers = [
      createSpaceMember('1'),
      createSpaceMember('2'),
    ] as unknown as SpaceMember[];
    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembers,
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

    const pauseButton = screen.getAllByLabelText('Pause')[0];
    pauseButton.click();

    expect(mockToggleSpaceMemberPaused).toBeCalledWith(spaceMembers[0]);
  });

  it('should show details when space member details requested to be shown', () => {
    renderApp(<ViewSpaceMembers />);

    const showDetailsButton = screen.getAllByText('Show details')[0];
    showDetailsButton.click();

    expect(mockSetShowSpaceMemberDetails).toBeCalledWith(spaceMembers[0], true);
  });

  it('should order space members by message', () => {
    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembers: [
        {
          ...createSpaceMember('1'),
          message: 'def',
        },
        createSpaceMember('2'),
        {
          ...createSpaceMember('3'),
          message: 'abc',
        },
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

  describe('pagination', () => {
    beforeEach(() => {
      mockUseSpaceMembersContext.mockReturnValue({
        spaceMembers: [
          createSpaceMember('1'),
          createSpaceMember('2'),
          createSpaceMember('3'),
          createSpaceMember('4'),
          createSpaceMember('5'),
          createSpaceMember('6'),
          createSpaceMember('7'),
          createSpaceMember('8'),
          createSpaceMember('9'),
          createSpaceMember('10'),
          createSpaceMember('11'),
          createSpaceMember('12'),
        ],
        toggleSpaceMemberPaused: mockToggleSpaceMemberPaused,
        setShowSpaceMemberDetails: mockSetShowSpaceMemberDetails,
      });
    });

    it('should show first page on initialization', () => {
      renderApp(<ViewSpaceMembers />);

      const spaceMemberListingItemUsernames = screen.getAllByTestId(
        'SpaceMemberListingItemUsername'
      );

      expect(spaceMemberListingItemUsernames.length).toBe(10);
      expect(spaceMemberListingItemUsernames[0].textContent).toBe('user1');
      expect(spaceMemberListingItemUsernames[9].textContent).toBe('user10');
    });

    it('should show correct page when page changed', () => {
      renderApp(<ViewSpaceMembers />);

      const page2Button = screen.getByText('2');
      page2Button.click();

      const spaceMemberListingItemUsernames = screen.getAllByTestId(
        'SpaceMemberListingItemUsername'
      );

      expect(spaceMemberListingItemUsernames.length).toBe(2);
      expect(spaceMemberListingItemUsernames[0].textContent).toBe('user11');
      expect(spaceMemberListingItemUsernames[1].textContent).toBe('user12');
    });

    it('should show first page when filter changed', () => {
      renderApp(<ViewSpaceMembers />);
      const page2Button = screen.getByText('2');
      page2Button.click();
      const filterInput = screen.getByPlaceholderText('Filter members');

      fireEvent.change(filterInput, {
        target: {
          value: 'user',
        },
      });
      const spaceMemberListingItemUsernames = screen.getAllByTestId(
        'SpaceMemberListingItemUsername'
      );

      expect(spaceMemberListingItemUsernames.length).toBe(10);
      expect(spaceMemberListingItemUsernames[0].textContent).toBe('user1');
      expect(spaceMemberListingItemUsernames[9].textContent).toBe('user10');
    });

    it('should hide pagination when no space members', () => {
      mockUseSpaceMembersContext.mockReturnValue({
        spaceMembers: [],
        toggleSpaceMemberPaused: mockToggleSpaceMemberPaused,
        setShowSpaceMemberDetails: mockSetShowSpaceMemberDetails,
      });
      renderApp(<ViewSpaceMembers />);

      const pageButton = screen.queryByText('1');

      expect(pageButton).not.toBeInTheDocument();
    });
  });
});
