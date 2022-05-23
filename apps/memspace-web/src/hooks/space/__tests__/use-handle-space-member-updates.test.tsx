import { MutableRefObject } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useHandleSpaceMemberUpdates } from '../use-handle-space-member-updates';
import { SpaceMemberRaster } from '../../../models/space-member-raster';
import { useSpaceMembersContext } from '../use-space-members-context';
import { Subject } from 'rxjs';
import { SpaceMember } from '../../../models/space-member';

jest.mock('../use-space-members-context');
const mockUseSpaceMembersContext = useSpaceMembersContext as jest.Mock;

describe('useHandleSpaceMemberUpdates', () => {
  let spaceMemberRastersRef: MutableRefObject<SpaceMemberRaster[]>;
  let spaceMembersStateRef: MutableRefObject<SpaceMember[]>;
  let onSpaceMemberChanged$: Subject<string>;
  let onSpaceMemberUpdated$: Subject<string>;

  let mockSpaceMemberUpdate: jest.Mock;

  beforeEach(() => {
    spaceMemberRastersRef = {
      current: [],
    };

    spaceMembersStateRef = {
      current: [],
    };

    onSpaceMemberChanged$ = new Subject<string>();
    onSpaceMemberUpdated$ = new Subject<string>();
    mockUseSpaceMembersContext.mockReturnValue({
      spaceMembersStateRef,
      onSpaceMemberChanged$,
      onSpaceMemberUpdated$,
    });

    mockSpaceMemberUpdate = jest.fn();
  });

  it('should update member raster when member updated or changed', () => {
    spaceMemberRastersRef.current = [
      {
        id: '1',
        update: mockSpaceMemberUpdate,
      } as unknown as SpaceMemberRaster,
    ];
    const spaceMember = { id: '1' } as unknown as SpaceMember;
    spaceMembersStateRef.current = [spaceMember];
    renderHook(() => useHandleSpaceMemberUpdates(spaceMemberRastersRef));

    onSpaceMemberUpdated$.next('1');

    expect(mockSpaceMemberUpdate).toBeCalledWith(spaceMember);
  });

  it('should not update member raster when member not found', () => {
    spaceMemberRastersRef.current = [
      {
        id: '1',
        update: mockSpaceMemberUpdate,
      } as unknown as SpaceMemberRaster,
    ];
    renderHook(() => useHandleSpaceMemberUpdates(spaceMemberRastersRef));

    onSpaceMemberUpdated$.next('1');

    expect(mockSpaceMemberUpdate).not.toBeCalled();
  });

  it('should not update member raster when member raster not found', () => {
    const spaceMember = { id: '1' } as unknown as SpaceMember;
    spaceMembersStateRef.current = [spaceMember];
    renderHook(() => useHandleSpaceMemberUpdates(spaceMemberRastersRef));

    onSpaceMemberUpdated$.next('1');

    expect(mockSpaceMemberUpdate).not.toBeCalled();
  });
});
