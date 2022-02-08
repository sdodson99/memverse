import React, { MutableRefObject, useRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SpaceCanvas from './SpaceCanvas';
import paper from 'paper';
import { usePaperScope } from '../../hooks/space/usePaperScope';
import { useUpdateMemberRasters } from '../../hooks/space/useUpdateMemberRasters';
import { useAddMemberRasters } from '../../hooks/space/useAddMemberRasters';
import { when } from 'jest-when';
import { SpaceMember } from '../../models/space-member';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));
const mockUseRef = useRef as jest.Mock;

jest.mock('../../hooks/space/usePaperScope');
const mockUsePaperScope = usePaperScope as jest.Mock;

jest.mock('../../hooks/space/useUpdateMemberRasters');
const mockUseUpdateMemberRasters = useUpdateMemberRasters as jest.Mock;

jest.mock('../../hooks/space/useAddMemberRasters');
const mockUseAddMemberRasters = useAddMemberRasters as jest.Mock;

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

    mockCanvasRef = {
      current: null,
    };
    mockUseRef.mockReturnValue(mockCanvasRef);

    mockPaperScope = {} as paper.PaperScope;
    mockUsePaperScope.mockReturnValue({
      scope: mockPaperScope,
    });

    mockUseAddMemberRasters.mockReturnValue({});
  });

  afterEach(() => {
    mockUseRef.mockReset();
  });

  it('should mount', () => {
    render(<SpaceCanvas members={members} />);

    const spaceCanvas = screen.getByTestId('SpaceCanvas');

    expect(spaceCanvas).toBeInTheDocument();
  });

  it('should add member rasters to paper scope', () => {
    render(<SpaceCanvas members={members} />);

    expect(mockUseAddMemberRasters).toBeCalledWith(members, mockPaperScope);
  });

  it('should update member rasters', () => {
    const memberRasters = [{}];
    when(mockUseAddMemberRasters)
      .calledWith(members, mockPaperScope)
      .mockReturnValue({ memberRasters });

    render(<SpaceCanvas members={members} />);

    expect(mockUseUpdateMemberRasters).toBeCalledWith(
      memberRasters,
      mockPaperScope
    );
  });
});
