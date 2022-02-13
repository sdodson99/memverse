import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceMembersSheet, { SpaceMembersSheetProps } from './SpaceMembersSheet';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('<SpaceMembersSheet />', () => {
  let props: SpaceMembersSheetProps;

  beforeEach(() => {
    props = {
      open: true,
    };

    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembers: [{ id: '1' }, { id: '2' }],
    });
  });

  afterEach(() => {
    mockUseSpaceMembersContext.mockReset();
  });

  it('should mount', () => {
    render(<SpaceMembersSheet {...props} />);

    const spaceMembersSheet = screen.getByTestId('SpaceMembersSheet');

    expect(spaceMembersSheet).toBeInTheDocument();
  });

  it('should render members listing', () => {
    render(<SpaceMembersSheet {...props} />);

    const membersListing = screen.getByTestId('SpaceMemberListing');

    expect(membersListing).toBeInTheDocument();
  });
});
