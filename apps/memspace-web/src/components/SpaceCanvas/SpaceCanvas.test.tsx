import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceCanvas from './SpaceCanvas';
import { SpaceMembersProvider } from '../../hooks/space/use-space-members-context';

describe('<SpaceCanvas />', () => {
  it('should mount', () => {
    render(<SpaceCanvas />, {
      wrapper: ({ children }) => (
        <SpaceMembersProvider members={[]}>{children}</SpaceMembersProvider>
      ),
    });

    const spaceCanvas = screen.getByTestId('SpaceCanvas');

    expect(spaceCanvas).toBeInTheDocument();
  });
});
