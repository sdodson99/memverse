import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceMember, { SpaceMemberProps } from './SpaceMember';

jest.mock('../../hooks/space/use-space-member-scaling');
jest.mock('@psychobolt/react-paperjs');

describe('<SpaceMember />', () => {
  let props: SpaceMemberProps;

  beforeEach(() => {
    props = {
      username: 'username',
      photoUrl: 'photoUrl',
      message: 'message',
      x: 0,
      y: 0,
      width: 50,
      height: 50,
      loaded: true,
      showUsername: false,
      showMessage: false,
    };
  });

  it('should mount', () => {
    render(<SpaceMember {...props} />);

    const spaceMember = screen.getByTestId('Layer');

    expect(spaceMember).toBeInTheDocument();
  });

  describe('username', () => {
    it('should render username when showUsername true', () => {
      props.showUsername = true;
      render(<SpaceMember {...props} />);

      const username = screen.getByText('username');

      expect(username).toBeInTheDocument();
    });

    it('should hide username when showUsername false', () => {
      props.showUsername = false;
      render(<SpaceMember {...props} />);

      const username = screen.queryByText('username');

      expect(username).toBeNull();
    });

    describe('position', () => {
      beforeEach(() => {
        props.showUsername = true;
      });

      it('should render username above avatar', () => {
        render(<SpaceMember {...props} />);

        const username = screen.getAllByTestId('PointTextData')[0];
        const usernameData = JSON.parse(username.textContent ?? '');

        expect(usernameData.position.y).toBe(-40);
      });

      it('should render username above message when showUsername and showMessage true', () => {
        props.showMessage = true;
        render(<SpaceMember {...props} />);

        const username = screen.getAllByTestId('PointTextData')[0];
        const usernameData = JSON.parse(username.textContent ?? '');

        expect(usernameData.position.y).toBe(-55);
      });
    });
  });

  describe('message', () => {
    it('should show message when showMessage true', () => {
      props.showMessage = true;
      render(<SpaceMember {...props} />);

      const message = screen.getAllByTestId('PointTextData')[0];
      const messageData = JSON.parse(message.textContent ?? '');

      expect(messageData.opacity).toBe(1);
    });

    it('should hide message when showMessage false', () => {
      props.showMessage = false;
      render(<SpaceMember {...props} />);

      const message = screen.getAllByTestId('PointTextData')[0];
      const messageData = JSON.parse(message.textContent ?? '');

      expect(messageData.opacity).toBe(0);
    });

    it('should render message above avatar', () => {
      render(<SpaceMember {...props} />);

      const message = screen.getAllByTestId('PointTextData')[0];
      const messageData = JSON.parse(message.textContent ?? '');

      expect(messageData.position.y).toBe(-40);
    });
  });
});
