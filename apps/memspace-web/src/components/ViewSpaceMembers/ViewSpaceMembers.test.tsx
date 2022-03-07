import React from 'react';
import { render, screen } from '@testing-library/react';
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
      spaceMembers: [{ id: '1' }, { id: '2' }],
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

    expect(mockToggleSpaceMemberPaused).toBeCalledWith({ id: '1' });
  });

  it('should show details when space member details requested to be shown', () => {
    render(<ViewSpaceMembers />);
    const firstMenuButton = screen.getAllByTestId('MenuButton')[0];
    firstMenuButton.click();

    const showDetailsButton = screen.getByText('Show Details');
    showDetailsButton.click();

    expect(mockSetShowSpaceMemberDetails).toBeCalledWith({ id: '1' }, true);
  });
});
