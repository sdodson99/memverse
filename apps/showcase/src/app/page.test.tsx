import { getByTestId, getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Home from './page';
import { mockYouTubeMembers } from '../../test/integration/mock-youtube-member-querier';
import { currentMockApplication } from '../../test/integration/mock-pixi';
import { mockFirebaseData } from '../../test/integration/mock-firebase-admin';
import { generateRandom } from '@/shared/math';
import { Mock } from 'vitest';
import { when } from 'jest-when';
import { MEMBER_SPRITE_LENGTH_HALF } from '@/features/view-members/member-container';
import { NextPageRequest } from '@/shared/http';
import { renderServerComponent } from '../../test/unit/render-server-component';
import { setSession } from '../../test/integration/mock-next-auth';
import { AuthProvider } from '@/features/auth';

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
        photoUrl: 'https://test.com/photo-url-1',
      },
      {
        channelId: '2',
        username: 'username-2',
        photoUrl: 'https://test.com/photo-url-2',
      },
      {
        channelId: '3',
        username: 'username-3',
        photoUrl: 'https://test.com/photo-url-3',
      },
    ];
    mockFirebaseData.data = {
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
    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render();

    expect(screen.getByText('username-1')).toBeInTheDocument();
    expect(screen.getByText('username-2')).toBeInTheDocument();
    expect(screen.getByText('username-3')).toBeInTheDocument();
    expect(screen.getByText('message-1')).toBeInTheDocument();
    expect(screen.getByText('message-3')).toBeInTheDocument();
    expect(
      screen.getByTestId('https://test.com/photo-url-1')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('https://test.com/photo-url-2')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('https://test.com/photo-url-3')
    ).toBeInTheDocument();
  });

  it('moves members over time', async () => {
    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render();

    const startMemberContainer = screen.getByTestId('username-1-container');
    expect(Number(startMemberContainer?.getAttribute('data-x'))).toBeCloseTo(
      500
    );
    expect(Number(startMemberContainer?.getAttribute('data-y'))).toBeCloseTo(
      250
    );

    currentMockApplication.render(100);

    const endMemberContainer = screen.getByTestId('username-1-container');
    expect(Number(endMemberContainer?.getAttribute('data-x'))).toBeCloseTo(
      537.5
    );
    expect(Number(endMemberContainer?.getAttribute('data-y'))).toBeCloseTo(
      314.952
    );
  });

  it('bounces members off left wall', async () => {
    directionRadians = (5 * Math.PI) / 6;

    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render(5000);

    const memberContainer = screen.getByTestId('username-1-container');
    expect(Number(memberContainer?.getAttribute('data-x'))).toBeCloseTo(
      currentMockApplication.screen.left + MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('bounces members off right wall', async () => {
    directionRadians = Math.PI / 6;

    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render(5000);

    const memberContainer = screen.getByTestId('username-1-container');
    expect(Number(memberContainer?.getAttribute('data-x'))).toBeCloseTo(
      currentMockApplication.screen.right - MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('bounces members off top wall', async () => {
    directionRadians = Math.PI / 3;

    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render(5000);

    const memberContainer = screen.getByTestId('username-1-container');
    expect(Number(memberContainer?.getAttribute('data-y'))).toBeCloseTo(
      currentMockApplication.screen.bottom - MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('bounces members off bottom wall', async () => {
    directionRadians = (5 * Math.PI) / 3;

    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render(5000);

    const memberContainer = screen.getByTestId('username-1-container');
    expect(Number(memberContainer?.getAttribute('data-y'))).toBeCloseTo(
      currentMockApplication.screen.top + MEMBER_SPRITE_LENGTH_HALF
    );
  });

  it('raises member to top on click', async () => {
    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render();

    const memberContainer = screen.getByTestId('username-1-container');
    await userEvent.click(memberContainer);
    currentMockApplication.render();

    const updatedMemberContainer = screen.getByTestId('username-1-container');
    expect(updatedMemberContainer?.getAttribute('data-z')).toBe('2');
  });

  it('toggles member username and message visibility on click', async () => {
    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render();

    const initialMemberTextContainer = screen.getByTestId(
      'username-1-text-container'
    );
    expect(initialMemberTextContainer?.getAttribute('data-alpha')).toBe('0');

    await userEvent.click(initialMemberTextContainer);
    currentMockApplication.render();

    const toggledMemberTextContainer = screen.getByTestId(
      'username-1-text-container'
    );
    expect(toggledMemberTextContainer?.getAttribute('data-alpha')).toBe('1');

    await userEvent.click(initialMemberTextContainer);
    currentMockApplication.render();

    const unToggledMemberTextContainer = screen.getByTestId(
      'username-1-text-container'
    );
    expect(unToggledMemberTextContainer?.getAttribute('data-alpha')).toBe('0');
  });

  it('toggles member username and message visibility on hover', async () => {
    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render();

    const initialMemberTextContainer = screen.getByTestId(
      'username-1-text-container'
    );
    expect(initialMemberTextContainer?.getAttribute('data-alpha')).toBe('0');

    await userEvent.hover(initialMemberTextContainer);
    currentMockApplication.render();

    const hoveredMemberTextContainer = screen.getByTestId(
      'username-1-text-container'
    );
    expect(hoveredMemberTextContainer?.getAttribute('data-alpha')).toBe('1');

    await userEvent.unhover(initialMemberTextContainer);
    currentMockApplication.render();

    const unHoveredMemberTextContainer = screen.getByTestId(
      'username-1-text-container'
    );
    expect(unHoveredMemberTextContainer?.getAttribute('data-alpha')).toBe('0');
  });

  it('does not hide member username and message on unhover when active', async () => {
    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render();

    const initialMemberTextContainer = screen.getByTestId(
      'username-1-text-container'
    );
    await userEvent.hover(initialMemberTextContainer);
    await userEvent.click(initialMemberTextContainer);
    currentMockApplication.render();

    const hoveredMemberTextContainer = screen.getByTestId(
      'username-1-text-container'
    );
    expect(hoveredMemberTextContainer?.getAttribute('data-alpha')).toBe('1');

    await userEvent.unhover(initialMemberTextContainer);
    currentMockApplication.render();

    const unHoveredMemberTextContainer = screen.getByTestId(
      'username-1-text-container'
    );
    expect(unHoveredMemberTextContainer?.getAttribute('data-alpha')).toBe('1');
  });

  it('scales members on screen resizes', async () => {
    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    currentMockApplication.render();

    const memberContainer = screen.getByTestId('username-1-container');
    expect(memberContainer?.getAttribute('data-scale-x')).toBe('1');
    expect(memberContainer?.getAttribute('data-scale-y')).toBe('1');

    currentMockApplication.screen.width = 250;
    currentMockApplication.render();

    const updatedMemberContainer = screen.getByTestId('username-1-container');
    expect(updatedMemberContainer?.getAttribute('data-scale-x')).toBe('0.8');
    expect(updatedMemberContainer?.getAttribute('data-scale-y')).toBe('0.8');
  });

  it('updates member message in showcase when user updates message', async () => {
    setSession({ channelId: '1', expires: '' });
    const initialMessage = 'message-1';
    const updatedMessage = 'updated-message-1';

    renderServerComponent(
      <AuthProvider>
        <Home {...request} />
      </AuthProvider>
    );
    await screen.findByTestId('HomePage');

    currentMockApplication.render();
    let initialMessageElement = screen.queryByText(initialMessage);
    let updatedMessageElement = screen.queryByText(updatedMessage);
    expect(initialMessageElement).toBeInTheDocument();
    expect(updatedMessageElement).not.toBeInTheDocument();

    const updateMessageToggleButton = await screen.findByAltText(
      'Update Message'
    );
    await userEvent.click(updateMessageToggleButton);

    const messageInput = await screen.findByLabelText('Message');
    await userEvent.clear(messageInput);
    await userEvent.type(messageInput, updatedMessage);

    const submitButton = await screen.findByText('Update');
    await userEvent.click(submitButton);

    currentMockApplication.render();

    initialMessageElement = screen.queryByText(initialMessage);
    updatedMessageElement = screen.queryByText(updatedMessage);
    expect(initialMessageElement).not.toBeInTheDocument();
    expect(updatedMessageElement).toBeInTheDocument();
  });

  it('does not allow non-members to update their message', async () => {
    setSession({ channelId: 'not-a-member', expires: '' });

    renderServerComponent(
      <AuthProvider>
        <Home {...request} />
      </AuthProvider>
    );
    await screen.findByTestId('HomePage');

    const updateMessageToggleButton = await screen.findByAltText(
      'Update Message'
    );
    await userEvent.click(updateMessageToggleButton);

    const updateMemberMessageForbiddenText = await screen.findByText(
      'You must be a SingletonSean YouTube Member in order to share a message.'
    );

    expect(updateMemberMessageForbiddenText).toBeInTheDocument();
  });

  it('lists members in sheet when view members sheet open', async () => {
    renderServerComponent(<Home {...request} />);
    await screen.findByTestId('HomePage');

    const viewMembersToggleButton = await screen.findByAltText('View Members');
    await userEvent.click(viewMembersToggleButton);

    const sheet = await screen.findByTestId('ViewMembersSheet');

    expect(getByText(sheet, 'username-1')).toBeInTheDocument();
    expect(getByText(sheet, 'username-2')).toBeInTheDocument();
    expect(getByText(sheet, 'username-3')).toBeInTheDocument();
    expect(getByText(sheet, 'message-1')).toBeInTheDocument();
    expect(getByText(sheet, 'message-3')).toBeInTheDocument();
    expect(
      getByTestId(sheet, 'https://test.com/photo-url-1')
    ).toBeInTheDocument();
    expect(
      getByTestId(sheet, 'https://test.com/photo-url-2')
    ).toBeInTheDocument();
    expect(
      getByTestId(sheet, 'https://test.com/photo-url-3')
    ).toBeInTheDocument();
  });
});
