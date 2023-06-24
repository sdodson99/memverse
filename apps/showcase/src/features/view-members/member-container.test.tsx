import { render, screen, act } from '@testing-library/react';
import {
  MEMBER_SPRITE_LENGTH_HALF,
  MemberContainer,
  MemberContainerProps,
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

  let initialX: number;
  let initialY: number;

  beforeEach(() => {
    props = {
      member: {
        channelId: '1',
        username: 'username-1',
        photoUrl: 'photo-url-1',
      },
    };

    initialX = 100;
    initialY = 200;

    when(mockGenerateRandom)
      .calledWith(
        mockApp.screen.left + MEMBER_SPRITE_LENGTH_HALF,
        mockApp.screen.right - MEMBER_SPRITE_LENGTH_HALF
      )
      .mockReturnValue(initialX);
    when(mockGenerateRandom)
      .calledWith(
        mockApp.screen.top + MEMBER_SPRITE_LENGTH_HALF,
        mockApp.screen.bottom - MEMBER_SPRITE_LENGTH_HALF
      )
      .mockReturnValue(initialY);
    when(mockGenerateRandom)
      .calledWith(0, 2 * Math.PI)
      .mockReturnValue(Math.PI / 3);
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

  it('initially positions member within stage', () => {
    render(<MemberContainer {...props} />);

    const memberContainerData = JSON.parse(
      screen.getByTestId('member-container-1')?.textContent ?? ''
    );

    expect(memberContainerData.x).toBe(100);
    expect(memberContainerData.y).toBe(200);
  });

  it('moves member within stage over time', () => {
    render(<MemberContainer {...props} />);

    act(() => executeMockTick(100));

    const memberContainerData = JSON.parse(
      screen.getByTestId('member-container-1')?.textContent ?? ''
    );

    expect(memberContainerData.x).toBe(125);
    expect(memberContainerData.y).toBeCloseTo(243.301);
  });
});
