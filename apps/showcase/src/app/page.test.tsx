import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Home from './page';
import { mockYouTubeMembers } from '../../test/integration/mock-youtube-member-querier';
import { currentMockApplication } from '../../test/integration/mock-pixi';
import { mockFirebaseInitialData } from '../../test/integration/mock-firebase-admin';
import { generateRandom } from '@/shared/math';
import { Mock } from 'vitest';
import { when } from 'jest-when';
import { MEMBER_SPRITE_LENGTH_HALF } from '@/features/view-members/member-container';
import { NextPageRequest } from '@/shared/http';

vi.mock('@/shared/math', () => ({
  ...vi.importActual('@/shared/math'),
  generateRandom: vi.fn(),
}));
const mockGenerateRandom = generateRandom as Mock;

describe('<Home />', () => {
  let x: number;
  let y: number;
  let directionRadians: number;

  let request: NextPageRequest;

  beforeEach(() => {
    mockYouTubeMembers.data = [
      {
        channelId: '1',
        username: 'username-1',
        photoUrl: 'photo-url-1',
      },
      {
        channelId: '2',
        username: 'username-2',
        photoUrl: 'photo-url-2',
      },
      {
        channelId: '3',
        username: 'username-3',
        photoUrl: 'photo-url-3',
      },
    ];
    mockFirebaseInitialData.data = {
      '/messages/1': { content: 'message-1' },
      '/messages/3': { content: 'message-3' },
    };

    x = 500;
    y = 250;
    directionRadians = Math.PI / 3;

    when(mockGenerateRandom)
      .calledWith(
        currentMockApplication.screen.left + MEMBER_SPRITE_LENGTH_HALF,
        currentMockApplication.screen.right - MEMBER_SPRITE_LENGTH_HALF
      )
      .mockImplementation(() => x);
    when(mockGenerateRandom)
      .calledWith(
        currentMockApplication.screen.top + MEMBER_SPRITE_LENGTH_HALF,
        currentMockApplication.screen.bottom - MEMBER_SPRITE_LENGTH_HALF
      )
      .mockImplementation(() => y);
    when(mockGenerateRandom)
      .calledWith(0, 2 * Math.PI)
      .mockImplementation(() => directionRadians);

    request = {
      searchParams: {},
    };
  });

  it('renders members', async () => {
    render(await Home(request));

    currentMockApplication.render();

    expect(screen.getByText('username-1')).toBeInTheDocument();
    expect(screen.getByText('username-2')).toBeInTheDocument();
    expect(screen.getByText('username-3')).toBeInTheDocument();
    expect(screen.getByText('message-1')).toBeInTheDocument();
    expect(screen.getByText('message-3')).toBeInTheDocument();
    expect(screen.getByAltText('photo-url-1')).toBeInTheDocument();
    expect(screen.getByAltText('photo-url-2')).toBeInTheDocument();
    expect(screen.getByAltText('photo-url-3')).toBeInTheDocument();
  });

  it('moves members over time', async () => {
    render(await Home(request));
    currentMockApplication.render();

    const startMemberContainer = screen.getByText('username-1').parentElement;
    expect(Number(startMemberContainer?.getAttribute('data-x'))).toBeCloseTo(
      500
    );
    expect(Number(startMemberContainer?.getAttribute('data-y'))).toBeCloseTo(
      250
    );

    currentMockApplication.render(100);

    const endMemberContainer = screen.getByText('username-1').parentElement;
    expect(Number(endMemberContainer?.getAttribute('data-x'))).toBeCloseTo(
      537.5
    );
    expect(Number(endMemberContainer?.getAttribute('data-y'))).toBeCloseTo(
      314.951
    );
  });

  it('bounces members off left wall', async () => {
    directionRadians = (5 * Math.PI) / 6;

    render(await Home(request));
    currentMockApplication.render(5000);

    const memberContainer = screen.getByText('username-1').parentElement;
    expect(Number(memberContainer?.getAttribute('data-x'))).toBeCloseTo(
      currentMockApplication.screen.left + MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('bounces members off right wall', async () => {
    directionRadians = Math.PI / 6;

    render(await Home(request));
    currentMockApplication.render(5000);

    const memberContainer = screen.getByText('username-1').parentElement;
    expect(Number(memberContainer?.getAttribute('data-x'))).toBeCloseTo(
      currentMockApplication.screen.right - MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('bounces members off top wall', async () => {
    directionRadians = Math.PI / 3;

    render(await Home(request));
    currentMockApplication.render(5000);

    const memberContainer = screen.getByText('username-1').parentElement;
    expect(Number(memberContainer?.getAttribute('data-y'))).toBeCloseTo(
      currentMockApplication.screen.bottom - MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('bounces members off bottom wall', async () => {
    directionRadians = (5 * Math.PI) / 3;

    render(await Home(request));
    currentMockApplication.render(5000);

    const memberContainer = screen.getByText('username-1').parentElement;
    expect(Number(memberContainer?.getAttribute('data-y'))).toBeCloseTo(
      currentMockApplication.screen.top + MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('raises member to top on click', async () => {
    render(await Home(request));
    currentMockApplication.render();

    const memberContainer = screen.getByText('username-1').parentElement;
    await userEvent.click(memberContainer!);
    currentMockApplication.render();

    const updatedMemberContainer = screen.getByText('username-1').parentElement;
    expect(updatedMemberContainer?.getAttribute('data-z')).toBe('2');
  });

  it('scales members on screen resizes', async () => {
    render(await Home(request));
    currentMockApplication.render();

    const memberContainer = screen.getByText('username-1').parentElement;
    expect(memberContainer?.getAttribute('data-scale-x')).toBe('1');
    expect(memberContainer?.getAttribute('data-scale-y')).toBe('1');

    currentMockApplication.screen.width = 250;
    currentMockApplication.render();

    const updatedMemberContainer = screen.getByText('username-1').parentElement;
    expect(updatedMemberContainer?.getAttribute('data-scale-x')).toBe('0.8');
    expect(updatedMemberContainer?.getAttribute('data-scale-y')).toBe('0.8');
  });
});
