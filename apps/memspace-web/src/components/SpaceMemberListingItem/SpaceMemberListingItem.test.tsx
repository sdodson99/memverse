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
      channelId: '123',
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

  it('should render message when user has message', () => {
    props.message = 'hello world';
    render(<SpaceMemberListingItem {...props} />);

    const message = screen.getByText(props.message);

    expect(message).toBeInTheDocument();
  });

  describe('menu', () => {
    it('should raise onPause when pause button clicked', () => {
      props.paused = false;
      props.onPause = jest.fn();
      render(<SpaceMemberListingItem {...props} />);
      const menuButton = screen.getByTestId('MenuButton');
      menuButton.click();

      const pauseButton = screen.getByText('Pause');
      pauseButton.click();

      expect(props.onPause).toBeCalled();
    });

    it('should raise onUnpause when unpause button clicked', () => {
      props.paused = true;
      props.onUnpause = jest.fn();
      render(<SpaceMemberListingItem {...props} />);
      const menuButton = screen.getByTestId('MenuButton');
      menuButton.click();

      const unpauseButton = screen.getByText('Unpause');
      unpauseButton.click();

      expect(props.onUnpause).toBeCalled();
    });

    it('should raise onShowDetails when show details button clicked', () => {
      props.isShowingDetails = false;
      props.onShowDetails = jest.fn();
      render(<SpaceMemberListingItem {...props} />);
      const menuButton = screen.getByTestId('MenuButton');
      menuButton.click();

      const showDetailsButton = screen.getByText('Show Details');
      showDetailsButton.click();

      expect(props.onShowDetails).toBeCalled();
    });

    it('should raise onHideDetails when hide details button clicked', () => {
      props.isShowingDetails = true;
      props.onHideDetails = jest.fn();
      render(<SpaceMemberListingItem {...props} />);
      const menuButton = screen.getByTestId('MenuButton');
      menuButton.click();

      const hideDetailsButton = screen.getByText('Hide Details');
      hideDetailsButton.click();

      expect(props.onHideDetails).toBeCalled();
    });
  });
});
