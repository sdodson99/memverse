import React, { MutableRefObject, useRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceCanvas from './SpaceCanvas';
import paper from 'paper';
import { usePaperScope } from '../../hooks/space/use-paper-scope';
import { useUpdateSpaceMemberRasters } from '../../hooks/space/use-update-space-member-rasters';
import { useAddSpaceMemberRasters } from '../../hooks/space/use-add-space-member-rasters';
import { when } from 'jest-when';
import { SpaceMember } from '../../models/space-member';
import { useSpaceMembersContext } from '../../hooks/space/use-space-members-context';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));
const mockUseRef = useRef as jest.Mock;

jest.mock('../../hooks/space/use-paper-scope');
const mockUsePaperScope = usePaperScope as jest.Mock;

jest.mock('../../hooks/space/use-update-space-member-rasters');
const mockUseUpdateSpaceMemberRasters =
  useUpdateSpaceMemberRasters as jest.Mock;

jest.mock('../../hooks/space/use-add-space-member-rasters');
const mockUseAddSpaceMemberRasters = useAddSpaceMemberRasters as jest.Mock;

jest.mock('../../hooks/space/use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('<SpaceCanvas />', () => {
  let members: SpaceMember[];
  let mockCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
  let mockPaperScope: paper.PaperScope;

  beforeEach(() => {
    members = [
      {
        id: '1',
        message: 'message1',
        photoUrl: 'photoUrl1',
        username: 'username1',
      },
      {
        id: '2',
        message: 'message2',
        photoUrl: 'photoUrl2',
        username: 'username2',
      },
    ] as SpaceMember[];
    mockUseSpaceMembersContext.mockReturnValue({ spaceMembers: members });

    mockCanvasRef = {
      current: null,
    };
    mockUseRef.mockReturnValue(mockCanvasRef);

    mockPaperScope = {} as paper.PaperScope;
    mockUsePaperScope.mockReturnValue({
      scope: mockPaperScope,
    });

    mockUseAddSpaceMemberRasters.mockReturnValue({});
  });

  afterEach(() => {
    mockUseRef.mockReset();
  });

  it('should mount', () => {
    render(<SpaceCanvas />);

    const spaceCanvas = screen.getByTestId('SpaceCanvas');

    expect(spaceCanvas).toBeInTheDocument();
  });

  it('should add member rasters to paper scope', () => {
    render(<SpaceCanvas />);

    expect(mockUseAddSpaceMemberRasters).toBeCalledWith(
      members,
      mockPaperScope
    );
  });

  it('should update member rasters', () => {
    const memberRasters = [{}];
    when(mockUseAddSpaceMemberRasters)
      .calledWith(members, mockPaperScope)
      .mockReturnValue({ memberRasters });

    render(<SpaceCanvas />);

    expect(mockUseUpdateSpaceMemberRasters).toBeCalledWith(
      memberRasters,
      mockPaperScope
    );
  });
});
