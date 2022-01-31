import paper from 'paper';
import { renderHook } from '@testing-library/react-hooks';
import { useAddMemberRasters } from '../useAddMemberRasters';
import { Member } from '../../../models/member';
import { createMemberRaster } from '../../../models/member-raster-factory';

jest.mock('../../../models/member-raster-factory');
const mockCreateMemberRaster = createMemberRaster as jest.Mock;

describe('useAddMemberRasters', () => {
  let members: Member[];
  let paperScope: paper.PaperScope;

  beforeEach(() => {
    members = [{}, {}, {}] as Member[];

    paperScope = {
      view: {
        bounds: {},
      },
    } as paper.PaperScope;

    mockCreateMemberRaster.mockReturnValue({});
  });

  afterEach(() => {
    mockCreateMemberRaster.mockReset();
  });

  it('should add members to paper view', () => {
    const { result } = renderHook(() =>
      useAddMemberRasters(members, paperScope)
    );

    expect(result.current.memberRasters).toHaveLength(3);
  });

  it('should update members when members have changed', () => {
    const { result, rerender } = renderHook<Member[], any>(
      (mems) => useAddMemberRasters(mems, paperScope),
      {
        initialProps: [],
      }
    );
    expect(result.current.memberRasters).toHaveLength(0);

    rerender(members);

    expect(result.current.memberRasters).toHaveLength(3);
  });

  it('should not update members when members have not changed', () => {
    const { result, rerender } = renderHook<Member[], any>(
      (mems) => useAddMemberRasters(mems, paperScope),
      {
        initialProps: members,
      }
    );

    mockCreateMemberRaster.mockImplementation(() => {
      throw new Error();
    });
    rerender(members);

    expect(result.current.memberRasters).toHaveLength(3);
  });

  it('should not add members to view when paper view not provided', () => {
    const { result } = renderHook(() => useAddMemberRasters(members, null));

    expect(result.current.memberRasters).toHaveLength(0);
  });
});
