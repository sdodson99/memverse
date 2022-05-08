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
  let renderOptions: RenderHookOptions<unknown>;

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

    mockCreateSpaceMember.mockImplementation(
      (m: Member) => new SpaceMember(m.id, m.username, m.photoUrl, m.message)
    );
  });

  afterEach(() => {
    mockCreateSpaceMember.mockReset();
  });

  it('should return mapped space members', () => {
    const { result } = renderHook(
      () => useSpaceMembersContext(),
      renderOptions
    );

    expect(result.current.spaceMembersStateRef.current).toHaveLength(2);
  });

  describe('loadSpaceMember', () => {
    it('should load space member if member exists', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.loadSpaceMember(
          result.current.spaceMembersStateRef.current[0]
        );
      });

      expect(
        result.current.spaceMembersStateRef.current[0].loaded
      ).toBeTruthy();
    });

    it('should abort if space member does not exist', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.loadSpaceMember(new SpaceMember('a', 'a', 'a', 'a'));
      });

      expect(result.current.spaceMembersStateRef.current[0].loaded).toBeFalsy();
      expect(result.current.spaceMembersStateRef.current[1].loaded).toBeFalsy();
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

      expect(result.current.spaceMembersStateRef.current[0].x).not.toBe(0);
      expect(result.current.spaceMembersStateRef.current[0].y).not.toBe(0);
      expect(result.current.spaceMembersStateRef.current[1].x).not.toBe(0);
      expect(result.current.spaceMembersStateRef.current[1].y).not.toBe(0);
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

      expect(
        result.current.spaceMembersStateRef.current[0].positionInitialized
      ).toBeTruthy();
      expect(
        result.current.spaceMembersStateRef.current[1].positionInitialized
      ).toBeTruthy();
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

      expect(result.current.spaceMembersStateRef.current[0].message).toBe(
        'new message'
      );
    });
  });

  describe('toggleSpaceMemberPaused', () => {
    it('should pause space member when unpaused', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.toggleSpaceMemberPaused(
          result.current.spaceMembersStateRef.current[0]
        );
      });

      expect(
        result.current.spaceMembersStateRef.current[0].paused
      ).toBeTruthy();
    });

    it('should unpause space member when paused', () => {
      const { result } = renderHook(
        () => useSpaceMembersContext(),
        renderOptions
      );

      act(() => {
        result.current.toggleSpaceMemberPaused(
          result.current.spaceMembersStateRef.current[0]
        );
      });

      act(() => {
        result.current.toggleSpaceMemberPaused(
          result.current.spaceMembersStateRef.current[0]
        );
      });

      expect(result.current.spaceMembersStateRef.current[0].paused).toBeFalsy();
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
          result.current.spaceMembersStateRef.current[0],
          true
        );
      });

      expect(
        result.current.spaceMembersStateRef.current[0].showUsername
      ).toBeTruthy();
      expect(
        result.current.spaceMembersStateRef.current[0].showMessage
      ).toBeTruthy();
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

      expect(result.current.spaceMembersStateRef.current[0].width).toBe(size);
      expect(result.current.spaceMembersStateRef.current[0].height).toBe(size);
    });
  });
});
