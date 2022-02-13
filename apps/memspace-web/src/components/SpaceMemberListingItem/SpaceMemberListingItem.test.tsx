import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceMemberListingItem, {
  SpaceMemberListingItemProps,
} from './SpaceMemberListingItem';

describe('<SpaceMemberListingItem />', () => {
  let props: SpaceMemberListingItemProps;

  beforeEach(() => {
    props = {
      username: 'username',
      photoUrl: 'photoUrl',
    };
  });

  it('should mount', () => {
    render(<SpaceMemberListingItem {...props} />);

    const spaceMemberListingItem = screen.getByTestId('SpaceMemberListingItem');

    expect(spaceMemberListingItem).toBeInTheDocument();
  });

  it('should render space member details', () => {
    render(<SpaceMemberListingItem {...props} />);

    const username = screen.getByText(props.username);
    const avatar = screen.getByAltText(`${props.username} Avatar`);

    expect(username).toBeInTheDocument();
    expect(avatar).toBeInTheDocument();
  });
});
