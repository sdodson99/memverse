import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceCanvas from './SpaceCanvas';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

jest.mock('@psychobolt/react-paperjs');

describe('<SpaceCanvas />', () => {
  beforeEach(() => {
    mockUseSpaceMembersContext.mockReturnValue({ spaceMembers: [{ id: '1' }] });
  });

  it('should mount', () => {
    render(<SpaceCanvas />);

    const spaceCanvas = screen.getByTestId('PaperContainer');

    expect(spaceCanvas).toBeInTheDocument();
  });
});
