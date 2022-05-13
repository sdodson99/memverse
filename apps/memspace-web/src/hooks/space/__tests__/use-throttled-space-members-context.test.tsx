import React from 'react';
import {
  act,
  renderHook,
  WrapperComponent,
} from '@testing-library/react-hooks';
import {
  ThrottledSpaceMembersProvider,
  useThrottledSpaceMembersContext,
} from '../use-throttled-space-members-context';
import { RecoilRoot } from 'recoil';
import * as useSpaceMembersContextModule from '../use-space-members-context';
import { Member } from '../../../models/member';
import paper from 'paper';
import { waitFor } from '@testing-library/react';

const { SpaceMembersProvider } = useSpaceMembersContextModule;

const useSpaceMembersContextSpy = jest.spyOn(
  useSpaceMembersContextModule,
  'useSpaceMembersContext'
);

describe('useThrottledSpaceMembersContext', () => {
  let wrapper: WrapperComponent<unknown>;

  beforeEach(() => {
    const members: Member[] = [
      {
        id: '1',
        username: 'user1',
        message: 'message1',
        photoUrl: 'photoUrl1',
      },
    ];

    wrapper = function Wrapper({ children }) {
      return (
        <RecoilRoot>
          <SpaceMembersProvider members={members}>
            <ThrottledSpaceMembersProvider>
              {children}
            </ThrottledSpaceMembersProvider>
          </SpaceMembersProvider>
        </RecoilRoot>
      );
    };
  });

  it('should return space members', () => {
    const { result } = renderHook(() => useThrottledSpaceMembersContext(), {
      wrapper,
    });

    expect(result.current.spaceMembers).toHaveLength(1);
  });

  it('should throttle space member updates', () => {
    const { result } = renderHook(() => useThrottledSpaceMembersContext(), {
      wrapper,
    });

    act(() => {
      result.current.updateSpaceMembers(1, new paper.Rectangle(0, 0, 100, 100));
    });

    act(() => {
      result.current.updateSpaceMembers(1, new paper.Rectangle(0, 0, 100, 100));
    });

    const throttledSpaceMembers = () => result.current.spaceMembers;
    const realTimeSpaceMembers = () =>
      useSpaceMembersContextSpy.mock.results.slice(-1)[0].value
        .spaceMembersStateRef.current;

    expect(throttledSpaceMembers()).not.toEqual(realTimeSpaceMembers());

    waitFor(() => {
      expect(throttledSpaceMembers()).toEqual(realTimeSpaceMembers());
    });
  });
});
