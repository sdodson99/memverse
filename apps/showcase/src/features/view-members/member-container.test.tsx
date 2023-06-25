import { render, screen, act } from '@testing-library/react';
import {
  MEMBER_SPRITE_LENGTH_HALF,
  MemberContainer,
  MemberContainerProps,
  MemberPosition,
} from './member-container';
import '@testing-library/jest-dom';
import { generateRandom } from '@/shared/math';
import { Mock } from 'vitest';
import { when } from 'jest-when';
import { executeMockTick, mockApp } from '../../../test/integration/mock-pixi';

vi.mock('@/shared/math', () => ({
  ...vi.importActual('@/shared/math'),
  generateRandom: vi.fn(),
}));

const mockGenerateRandom = generateRandom as Mock;

describe('<MemberContainer />', () => {
  let props: MemberContainerProps;

  let initialMemberPosition: MemberPosition;

  beforeEach(() => {
    props = {
      member: {
        channelId: '1',
        username: 'username-1',
        photoUrl: 'photo-url-1',
      },
    };

    initialMemberPosition = {
      x: 100,
      y: 200,
      directionRadians: Math.PI / 3,
    };

    when(mockGenerateRandom)
      .calledWith(
        mockApp.screen.left + MEMBER_SPRITE_LENGTH_HALF,
        mockApp.screen.right - MEMBER_SPRITE_LENGTH_HALF
      )
      .mockImplementation(() => initialMemberPosition.x);
    when(mockGenerateRandom)
      .calledWith(
        mockApp.screen.top + MEMBER_SPRITE_LENGTH_HALF,
        mockApp.screen.bottom - MEMBER_SPRITE_LENGTH_HALF
      )
      .mockImplementation(() => initialMemberPosition.y);
    when(mockGenerateRandom)
      .calledWith(0, 2 * Math.PI)
      .mockImplementation(() => initialMemberPosition.directionRadians);
  });

  afterEach(() => {
    mockGenerateRandom.mockReset();
  });

  it('renders member username', () => {
    render(<MemberContainer {...props} />);

    expect(screen.getByText('username-1')).toBeInTheDocument();
  });

  it('renders member avatar', () => {
    render(<MemberContainer {...props} />);

    expect(screen.getByAltText('photo-url-1')).toBeInTheDocument();
  });

  it('initially positions within stage', () => {
    render(<MemberContainer {...props} />);

    const memberContainerData = JSON.parse(
      screen.getByTestId('member-container-1')?.textContent ?? ''
    );

    expect(memberContainerData.x).toBe(100);
    expect(memberContainerData.y).toBe(200);
  });

  it('moves across stage over time', () => {
    render(<MemberContainer {...props} />);

    act(() => executeMockTick(100));

    const memberContainerData = JSON.parse(
      screen.getByTestId('member-container-1')?.textContent ?? ''
    );

    expect(memberContainerData.x).toBe(125);
    expect(memberContainerData.y).toBeCloseTo(243.301);
  });

  it('stays within left wall', () => {
    initialMemberPosition = {
      x: 500,
      y: 250,
      directionRadians: (5 * Math.PI) / 6,
    };
    render(<MemberContainer {...props} />);

    act(() => executeMockTick(5000));

    const memberContainerData = JSON.parse(
      screen.getByTestId('member-container-1')?.textContent ?? ''
    );

    expect(memberContainerData.x).toBe(
      mockApp.screen.left + MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('stays within right wall', () => {
    initialMemberPosition = {
      x: 500,
      y: 250,
      directionRadians: Math.PI / 6,
    };
    render(<MemberContainer {...props} />);

    act(() => executeMockTick(5000));

    const memberContainerData = JSON.parse(
      screen.getByTestId('member-container-1')?.textContent ?? ''
    );

    expect(memberContainerData.x).toBe(
      mockApp.screen.right - MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('stays within top wall', () => {
    initialMemberPosition = {
      x: 500,
      y: 250,
      directionRadians: Math.PI / 3,
    };
    render(<MemberContainer {...props} />);

    act(() => executeMockTick(5000));

    const memberContainerData = JSON.parse(
      screen.getByTestId('member-container-1')?.textContent ?? ''
    );

    expect(memberContainerData.y).toBe(
      mockApp.screen.bottom - MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('stays within bottom wall', () => {
    initialMemberPosition = {
      x: 500,
      y: 250,
      directionRadians: (5 * Math.PI) / 3,
    };
    render(<MemberContainer {...props} />);

    act(() => executeMockTick(5000));

    const memberContainerData = JSON.parse(
      screen.getByTestId('member-container-1')?.textContent ?? ''
    );

    expect(memberContainerData.y).toBe(
      mockApp.screen.top + MEMBER_SPRITE_LENGTH_HALF
    );
  });
});
