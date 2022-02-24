import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewSpaceMembers from './ViewSpaceMembers';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('<ViewSpaceMembers />', () => {
  beforeEach(() => {
    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembers: [{ id: '1' }, { id: '2' }],
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
});
