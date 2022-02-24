import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateSpaceMemberMessage from './UpdateSpaceMemberMessage';
import { useMemberMessage } from '../../hooks/members/use-member-message';
import { useUpdateMemberMessage } from '../../hooks/members/use-update-member-message';

jest.mock('../../hooks/members/use-member-message');
const mockUseMemberMessage = useMemberMessage as jest.Mock;

jest.mock('../../hooks/members/use-update-member-message');
const mockUseUpdateMemberMessage = useUpdateMemberMessage as jest.Mock;

describe('<UpdateSpaceMemberMessage />', () => {
  beforeEach(() => {
    mockUseMemberMessage.mockReturnValue({});
    mockUseUpdateMemberMessage.mockReturnValue({});
  });

  afterEach(() => {
    mockUseMemberMessage.mockReset();
    mockUseUpdateMemberMessage.mockReset();
  });

  it('should mount', () => {
    render(<UpdateSpaceMemberMessage />);

    const updateSpaceMemberMessage = screen.getByTestId(
      'UpdateSpaceMemberMessage'
    );

    expect(updateSpaceMemberMessage).toBeInTheDocument();
  });

  it('should render loading spinner when loading', () => {
    mockUseMemberMessage.mockReturnValue({ loading: true });
    render(<UpdateSpaceMemberMessage />);

    const loadingSpinner = screen.getByTestId('LoadingSpinner');

    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should initialize member message', () => {
    const message = 'hello world';
    mockUseMemberMessage.mockReturnValue({ message });
    render(<UpdateSpaceMemberMessage />);

    const initializeMessageTextInput = screen.getByDisplayValue(message);

    expect(initializeMessageTextInput).toBeInTheDocument();
  });

  it('should render error message when submit fails', () => {
    mockUseUpdateMemberMessage.mockReturnValue({ error: new Error() });
    render(<UpdateSpaceMemberMessage />);

    const errorMessage = screen.getByText(
      'Failed to update message. Please try again later.'
    );

    expect(errorMessage).toBeInTheDocument();
  });

  describe('with message changed', () => {
    let updateButton: HTMLInputElement;
    let messageTextInput: HTMLElement;

    beforeEach(() => {
      mockUseMemberMessage.mockReturnValue({ message: 'hello world' });
      render(<UpdateSpaceMemberMessage />);
      updateButton = screen.getByText('Update') as HTMLInputElement;
      messageTextInput = screen.getByDisplayValue('hello world');

      fireEvent.change(messageTextInput, {
        target: {
          value: 'other',
        },
      });
    });

    it('should enable submit button', () => {
      expect(updateButton.disabled).toBeFalsy();
    });

    it('should disable submit button when message reverted', () => {
      expect(updateButton.disabled).toBeFalsy();

      fireEvent.change(messageTextInput, {
        target: {
          value: 'hello world',
        },
      });

      expect(updateButton.disabled).toBeTruthy();
    });
  });

  describe('on submit', () => {
    let updateButton: HTMLInputElement;
    let mockExecuteUpdateMemberMessage: jest.Mock;

    let message: string;

    beforeEach(() => {
      mockExecuteUpdateMemberMessage = jest.fn();
      mockUseUpdateMemberMessage.mockReturnValue({
        execute: mockExecuteUpdateMemberMessage,
      });
      render(<UpdateSpaceMemberMessage />);
      updateButton = screen.getByText('Update') as HTMLInputElement;

      const messageTextInput = screen.getByTestId('messageTextInput');
      message = 'message';
      fireEvent.change(messageTextInput, {
        target: {
          value: message,
        },
      });
    });

    it('should execute update for message', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({});

      fireEvent.click(updateButton);

      await waitFor(() => {
        expect(mockExecuteUpdateMemberMessage).toBeCalledWith(message);
      });
    });

    it('should disable submit button when successful', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({});

      fireEvent.click(updateButton);

      await waitFor(() => {
        expect(updateButton.disabled).toBeTruthy();
      });
    });

    it('should enable submit button when successful', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({ error: new Error() });

      fireEvent.click(updateButton);

      await waitFor(() => {
        expect(updateButton.disabled).toBeFalsy();
      });
    });
  });
});
