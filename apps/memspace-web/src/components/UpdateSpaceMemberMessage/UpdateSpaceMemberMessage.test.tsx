import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateSpaceMemberMessage from './UpdateSpaceMemberMessage';
import { useMemberMessage } from '../../hooks/members/use-member-message';

jest.mock('../../hooks/members/use-member-message');
const mockUseMemberMessage = useMemberMessage as jest.Mock;

describe('<UpdateSpaceMemberMessage />', () => {
  beforeEach(() => {
    mockUseMemberMessage.mockReturnValue({});
  });

  afterEach(() => {
    mockUseMemberMessage.mockReset();
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
});
