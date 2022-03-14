import React from 'react';
import { Member } from '../../../models/member';
import {
  renderHook,
  RenderHookOptions,
  act,
} from '@testing-library/react-hooks';
import {
  useSpaceMembersContext,
  SpaceMembersProvider,
} from '../use-space-members-context';
import { SpaceMember } from '../../../models/space-member';
import { createSpaceMember } from '../../../models/space-member-factory';

jest.mock('../../../models/space-member-factory');
const mockCreateSpaceMember = createSpaceMember as jest.Mock;

describe('useSpaceMembersContext', () => {
  let members: Member[];
  let renderOptions: RenderHookOptions<any>;

  let mockSpaceMemberLoad: jest.Mock;
  let mockSpaceMemberUpdate: jest.Mock;
  let mockSpaceMemberInitializePosition: jest.Mock;
  let mockSpaceMemberPause: jest.Mock;
  let mockSpaceMemberUnpause: jest.Mock;

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

    renderOptions = {
      wrapper: ({ children }) => (
        <SpaceMembersProvider members={members}>
          {children}
        </SpaceMembersProvider>
      ),
    };

    mockSpaceMemberLoad = jest.fn();
    mockSpaceMemberUpdate = jest.fn();
    mockSpaceMemberInitializePosition = jest.fn();
    mockSpaceMemberPause = jest.fn();
    mockSpaceMemberUnpause = jest.fn();

    mockCreateSpaceMember.mockImplementation((m: Member) => {
      const spaceMember = {
        ...m,
        positionInitialized: false,
        paused: false,
        load: mockSpaceMemberLoad,
        update: mockSpaceMemberUpdate,
        pause: () => {
          spaceMember.paused = true;
          mockSpaceMemberPause();
        },
        unpause: () => {
          spaceMember.paused = false;
          mockSpaceMemberUnpause();
        },
        initializePosition: () => {
          spaceMember.positionInitialized = true;
          mockSpaceMemberInitializePosition();
        },
        clone: () => spaceMember,
      };

      return spaceMember;
    });
  });

  afterEach(() => {
    mockCreateSpaceMember.mockReset();
  });

  it('should return mapped space members', () => {
    const { result } = renderHook(
      () => useSpaceMembersContext(),
      renderOptions
    );

    expect(result.current.spaceMembers).toHaveLength(2);
  });

  describe('loadSpaceMember', () => {
    it('should load space member if member exists', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.loadSpaceMember(result.current.spaceMembers[0]);
      });

      expect(mockSpaceMemberLoad).toBeCalledTimes(1);
    });

    it('should abort if space member does not exist', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.loadSpaceMember(new SpaceMember('a', 'a', 'a', 'a'));
      });

      expect(mockSpaceMemberLoad).toBeCalledTimes(0);
    });
  });

  describe('updateSpaceMembers', () => {
    let timeElapsedSeconds: number;
    let bounds: paper.Rectangle;

    beforeEach(() => {
      timeElapsedSeconds = 1;
      bounds = {
        top: 0,
        left: 0,
        bottom: 100,
        right: 100,
      } as paper.Rectangle;
    });

    it('should update each space member', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.updateSpaceMembers(timeElapsedSeconds, bounds);
      });

      expect(mockSpaceMemberUpdate).toBeCalledTimes(2);
    });

    it("should only initialize each space member's position once", () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.updateSpaceMembers(timeElapsedSeconds, bounds);
      });

      act(() => {
        result.current.updateSpaceMembers(timeElapsedSeconds, bounds);
      });

      expect(mockSpaceMemberInitializePosition).toBeCalledTimes(2);
    });
  });

  describe('updateSpaceMemberMessage', () => {
    it('should only update space member message', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.updateSpaceMemberMessage('1', 'new message');
      });

      expect(result.current.spaceMembers[0].message).toBe('new message');
    });
  });

  describe('pauseSpaceMember', () => {
    it('should pause space member when unpaused', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.toggleSpaceMemberPaused(result.current.spaceMembers[0]);
      });

      expect(mockSpaceMemberPause).toBeCalledTimes(1);
    });

    it('should unpause space member when paused', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.toggleSpaceMemberPaused(result.current.spaceMembers[0]);
      });

      act(() => {
        result.current.toggleSpaceMemberPaused(result.current.spaceMembers[0]);
      });

      expect(mockSpaceMemberUnpause).toBeCalledTimes(1);
    });
  });

  describe('setShowSpaceMemberDetails', () => {
    it('should set show username and show message to target value', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.setShowSpaceMemberDetails(
          result.current.spaceMembers[0],
          true
        );
      });

      expect(result.current.spaceMembers[0].showUsername).toBeTruthy();
      expect(result.current.spaceMembers[0].showMessage).toBeTruthy();
    });
  });

  describe('setSpaceMembersSize', () => {
    it('should set space member width and height', () => {
      const size = 10;
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.setSpaceMembersSize(size);
      });

      expect(result.current.spaceMembers[0].width).toBe(size);
      expect(result.current.spaceMembers[0].height).toBe(size);
    });
  });
});
