import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateSpaceMemberMessage from './UpdateSpaceMemberMessage';
import { useMemberMessage } from '../../hooks/members/use-member-message';
import { useUpdateMemberMessage } from '../../hooks/members/use-update-member-message';
import { useAccountContext } from '../../hooks/authentication/use-account-context';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';

jest.mock('../../hooks/members/use-member-message');
const mockUseMemberMessage = useMemberMessage as jest.Mock;

jest.mock('../../hooks/members/use-update-member-message');
const mockUseUpdateMemberMessage = useUpdateMemberMessage as jest.Mock;

jest.mock('../../hooks/authentication/use-account-context');
const mockUseAccountContext = useAccountContext as jest.Mock;

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('<UpdateSpaceMemberMessage />', () => {
  beforeEach(() => {
    mockUseAccountContext.mockReturnValue({});
    mockUseSpaceMembersContext.mockReturnValue({});
    mockUseMemberMessage.mockReturnValue({});
    mockUseUpdateMemberMessage.mockReturnValue({});
  });

  afterEach(() => {
    mockUseMemberMessage.mockReset();
    mockUseUpdateMemberMessage.mockReset();
    mockUseSpaceMembersContext.mockReset();
    mockUseAccountContext.mockReset();
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

  describe('on submit', () => {
    let updateButton: HTMLInputElement;
    let mockExecuteUpdateMemberMessage: jest.Mock;
    let mockUpdateSpaceMemberMessage: jest.Mock;

    let message: string;

    beforeEach(async () => {
      mockUpdateSpaceMemberMessage = jest.fn();
      mockUseSpaceMembersContext.mockReturnValue({
        updateSpaceMemberMessage: mockUpdateSpaceMemberMessage,
      });
      mockExecuteUpdateMemberMessage = jest.fn();
      mockUseUpdateMemberMessage.mockReturnValue({
        execute: mockExecuteUpdateMemberMessage,
      });
      mockUseAccountContext.mockReturnValue({
        account: {
          id: '123',
        },
      });
      render(<UpdateSpaceMemberMessage />);
      updateButton = screen.getByText('Update') as HTMLInputElement;

      const messageTextInput = screen.getByTestId('messageTextInput');
      message = 'message';
      await act(async () => {
        fireEvent.change(messageTextInput, {
          target: {
            value: message,
          },
        });
      });
    });

    it('should execute update for message', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({});

      fireEvent.submit(updateButton);

      await waitFor(() => {
        expect(mockExecuteUpdateMemberMessage).toBeCalledWith(message);
      });
    });

    it('should enable submit button when unsuccessful', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({ error: new Error() });

      fireEvent.submit(updateButton);

      await waitFor(() => {
        expect(updateButton.disabled).toBeFalsy();
      });
    });

    it('should render error message when unsuccessful', async () => {
      mockUseUpdateMemberMessage.mockReturnValue({ error: new Error() });
      mockExecuteUpdateMemberMessage.mockReturnValue({ error: new Error() });
      fireEvent.submit(updateButton);

      const errorMessage = await screen.findByText(
        'Failed to update message. Please try again later.'
      );

      expect(errorMessage).toBeInTheDocument();
    });

    it('should update space member message when successful', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({});

      fireEvent.submit(updateButton);

      await waitFor(() => {
        expect(mockUpdateSpaceMemberMessage).toBeCalledWith('123', 'message');
      });
    });

    it('should render success message when successful', async () => {
      mockExecuteUpdateMemberMessage.mockReturnValue({});
      fireEvent.submit(updateButton);

      const successMessage = await screen.findByText(
        'Successfully updated message.'
      );

      expect(successMessage).toBeInTheDocument();
    });
  });
});
