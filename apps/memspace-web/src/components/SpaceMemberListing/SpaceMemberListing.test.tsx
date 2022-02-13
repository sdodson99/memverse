import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceMemberListing from './SpaceMemberListing';
import { SpaceMember } from '../../models/space-member';

describe('<SpaceMemberListing />', () => {
  let members: SpaceMember[];

  beforeEach(() => {
    members = [
      {
        id: 'id1',
        username: 'username1',
        photoUrl: 'photoUrl1',
      },
      {
        id: 'id2',
        username: 'username2',
        photoUrl: 'photoUrl2',
      },
    ] as SpaceMember[];
  });

  it('should mount', () => {
    render(<SpaceMemberListing members={members} />);

    const spaceMemberListing = screen.getByTestId('SpaceMemberListing');

    expect(spaceMemberListing).toBeInTheDocument();
  });

  it('should render members', () => {
    render(<SpaceMemberListing members={members} />);

    const memberListingItems = screen.getAllByTestId('SpaceMemberListingItem');

    expect(memberListingItems).toHaveLength(2);
  });
});
