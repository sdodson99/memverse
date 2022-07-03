import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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
      directionDegrees: 0,
      onDirectionDegreesChanged: jest.fn(),
      speedPixelsPerSecond: 0,
      onSpeedChanged: jest.fn(),
      x: 0,
      y: 0,
      onPositionXChanged: jest.fn(),
      onPositionYChanged: jest.fn(),
      isShowingDetails: false,
      onShowDetails: jest.fn(),
      onHideDetails: jest.fn(),
      paused: false,
      onPause: jest.fn(),
      onUnpause: jest.fn(),
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

  describe('configuration panel', () => {
    it('should raise onPause when pause selected', () => {
      props.paused = false;
      render(<SpaceMemberListingItem {...props} />);

      const pauseLabel = screen.getByLabelText('Pause');
      pauseLabel.click();

      expect(props.onPause).toBeCalled();
    });

    it('should raise onUnpause when pause unselected', () => {
      props.paused = true;
      render(<SpaceMemberListingItem {...props} />);

      const pauseLabel = screen.getByLabelText('Pause');
      pauseLabel.click();

      expect(props.onUnpause).toBeCalled();
    });

    it('should raise onShowDetails when show details selected', () => {
      props.isShowingDetails = false;
      render(<SpaceMemberListingItem {...props} />);

      const showDetailsLabel = screen.getByLabelText('Show details');
      showDetailsLabel.click();

      expect(props.onShowDetails).toBeCalled();
    });

    it('should raise onHideDetails when show details unselected', () => {
      props.isShowingDetails = true;
      render(<SpaceMemberListingItem {...props} />);

      const showDetailsLabel = screen.getByLabelText('Show details');
      showDetailsLabel.click();

      expect(props.onHideDetails).toBeCalled();
    });

    it('should update speed when speed changed', () => {
      const speed = 120;
      render(<SpaceMemberListingItem {...props} />);

      const speedLabel = screen.getByLabelText('Speed (pixels per second)');
      fireEvent.change(speedLabel, {
        target: {
          value: speed,
        },
      });

      expect(props.onSpeedChanged).toBeCalledWith(speed);
    });

    it('should update direction when direction changed', () => {
      const directionDegrees = 120;
      render(<SpaceMemberListingItem {...props} />);

      const directionLabel = screen.getByLabelText('Direction (degrees)');
      fireEvent.change(directionLabel, {
        target: {
          value: directionDegrees,
        },
      });

      expect(props.onDirectionDegreesChanged).toBeCalledWith(directionDegrees);
    });

    it('should update position X when position X blurred', () => {
      const positionX = 120;
      render(<SpaceMemberListingItem {...props} />);

      const positionXLabel = screen.getByLabelText('Position X');
      fireEvent.change(positionXLabel, {
        target: {
          value: positionX,
        },
      });
      fireEvent.blur(positionXLabel);

      expect(props.onPositionXChanged).toBeCalledWith(positionX);
    });

    it('should update position Y when position Y blurred', () => {
      const positionY = 120;
      render(<SpaceMemberListingItem {...props} />);

      const positionYLabel = screen.getByLabelText('Position Y');
      fireEvent.change(positionYLabel, {
        target: {
          value: positionY,
        },
      });
      fireEvent.blur(positionYLabel);

      expect(props.onPositionYChanged).toBeCalledWith(positionY);
    });
  });
});
