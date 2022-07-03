import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceMemberListing, {
  SpaceMemberListingProps,
} from './SpaceMemberListing';
import { SpaceMember } from '../../models/space-member';

describe('<SpaceMemberListing />', () => {
  let members: SpaceMember[];
  let props: SpaceMemberListingProps;

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

    props = {
      members,
      onDirectionDegreesChanged: jest.fn(),
      onSpeedChanged: jest.fn(),
      onPositionXChanged: jest.fn(),
      onPositionYChanged: jest.fn(),
      onShowDetails: jest.fn(),
      onHideDetails: jest.fn(),
      onPause: jest.fn(),
      onUnpause: jest.fn(),
    };
  });

  it('should mount', () => {
    render(<SpaceMemberListing {...props} />);

    const spaceMemberListing = screen.getByTestId('SpaceMemberListing');

    expect(spaceMemberListing).toBeInTheDocument();
  });

  it('should render members', () => {
    render(<SpaceMemberListing {...props} />);

    const memberListingItems = screen.getAllByTestId('SpaceMemberListingItem');

    expect(memberListingItems).toHaveLength(2);
  });
});
