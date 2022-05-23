import { MutableRefObject } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { SpaceMemberRaster } from '../../../models/space-member-raster';
import { useSpaceMembersContext } from '../use-space-members-context';
import { Subject } from 'rxjs';
import { SpaceMember } from '../../../models/space-member';
import { useHandleSpaceMemberResets } from '../use-handle-space-member-resets';

jest.mock('../use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

jest.mock('../../../models/space-member-raster');
const mockSpaceMemberRaster = SpaceMemberRaster as jest.Mock;

describe('useHandleSpaceMemberResets', () => {
  let spaceMemberRastersRef: MutableRefObject<SpaceMemberRaster[]>;
  let spaceMembersStateRef: MutableRefObject<SpaceMember[]>;
  let onSpaceMembersReset$: Subject<unknown>;

  beforeEach(() => {
    spaceMemberRastersRef = {
      current: [],
    };

    spaceMembersStateRef = {
      current: [
        new SpaceMember('1', 'username1', 'photoUrl1', 'message1'),
        new SpaceMember('2', 'username2', 'photoUrl2', 'message2'),
        new SpaceMember('3', 'username3', 'photoUrl3', 'message3'),
      ],
    };

    onSpaceMembersReset$ = new Subject<unknown>();
    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembersStateRef,
      onSpaceMembersReset$,
    });

    mockSpaceMemberRaster.mockReturnValue({
      update: jest.fn(),
      remove: jest.fn(),
    });
  });

  it('should reset space members on load', () => {
    renderHook(() => useHandleSpaceMemberResets(spaceMemberRastersRef));

    expect(spaceMemberRastersRef.current).toHaveLength(3);
  });

  it('should reset space members when space members reset', () => {
    renderHook(() => useHandleSpaceMemberResets(spaceMemberRastersRef));
    expect(spaceMemberRastersRef.current).toHaveLength(3);

    spaceMembersStateRef.current.pop();
    onSpaceMembersReset$.next(null);

    expect(spaceMemberRastersRef.current).toHaveLength(2);
  });
});
