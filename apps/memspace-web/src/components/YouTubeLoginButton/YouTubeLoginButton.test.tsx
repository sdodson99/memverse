import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import YouTubeLoginButton from './YouTubeLoginButton';

describe('<YouTubeLoginButton />', () => {
  it('should mount', () => {
    render(<YouTubeLoginButton />);

    const youTubeLoginButton = screen.getByTestId('YouTubeLoginButton');

    expect(youTubeLoginButton).toBeInTheDocument();
  });
});
