import React, { MutableRefObject, useRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Space from './Space';
import paper from 'paper';
import { Member } from '../../models/member';

jest.mock('paper');
const mockPaperSetup = paper.setup as jest.Mock;
const mockPaperRaster = paper.Raster as jest.Mock;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(),
}));
const mockUseRef = useRef as jest.Mock;

describe('<Space />', () => {
  let members: Member[];
  let mockCanvasRef: MutableRefObject<HTMLCanvasElement | null>;

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
    ];

    mockCanvasRef = {
      current: null,
    };
    mockUseRef.mockReturnValue(mockCanvasRef);

    // @ts-ignore
    paper.view = {};
  });

  afterEach(() => {
    mockPaperSetup.mockReset();
    mockPaperRaster.mockReset();
    mockUseRef.mockReset();
  });

  it('should mount', () => {
    render(<Space members={members} />);

    const space = screen.getByTestId('Space');

    expect(space).toBeInTheDocument();
  });

  it('should setup Paper', () => {
    mockCanvasRef.current = {} as HTMLCanvasElement;

    render(<Space members={members} />);

    expect(mockPaperSetup).toBeCalledTimes(1);
  });

  it('should add members to canvas', () => {
    mockCanvasRef.current = {} as HTMLCanvasElement;

    render(<Space members={members} />);

    expect(mockPaperRaster).toBeCalledTimes(2);
  });
});
