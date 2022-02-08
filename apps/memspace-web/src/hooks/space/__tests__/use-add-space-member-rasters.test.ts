import paper from 'paper';
import { renderHook } from '@testing-library/react-hooks';
import { useAddSpaceMemberRasters } from '../use-add-space-member-rasters';
import { createSpaceMemberRaster } from '../../../models/space-member-raster-factory';
import { SpaceMember } from '../../../models/space-member';

jest.mock('../../../models/space-member-raster-factory');
const mockCreateSpaceMemberRaster = createSpaceMemberRaster as jest.Mock;

describe('useAddMemberRasters', () => {
  let members: SpaceMember[];
  let paperScope: paper.PaperScope;

  beforeEach(() => {
    members = [{}, {}, {}] as SpaceMember[];

    paperScope = {
      view: {
        bounds: {},
      },
    } as paper.PaperScope;

    mockCreateSpaceMemberRaster.mockReturnValue({});
  });

  afterEach(() => {
    mockCreateSpaceMemberRaster.mockReset();
  });

  it('should add members to paper view', () => {
    const { result } = renderHook(() =>
      useAddSpaceMemberRasters(members, paperScope)
    );

    expect(result.current.memberRasters).toHaveLength(3);
  });

  it('should update members when members have changed', () => {
    const { result, rerender } = renderHook<SpaceMember[], any>(
      (mems) => useAddSpaceMemberRasters(mems, paperScope),
      {
        initialProps: [],
      }
    );
    expect(result.current.memberRasters).toHaveLength(0);

    rerender(members);

    expect(result.current.memberRasters).toHaveLength(3);
  });

  it('should not update members when members have not changed', () => {
    const { result, rerender } = renderHook<SpaceMember[], any>(
      (mems) => useAddSpaceMemberRasters(mems, paperScope),
      {
        initialProps: members,
      }
    );

    mockCreateSpaceMemberRaster.mockImplementation(() => {
      throw new Error();
    });
    rerender(members);

    expect(result.current.memberRasters).toHaveLength(3);
  });

  it('should not add members to view when paper view not provided', () => {
    const { result } = renderHook(() =>
      useAddSpaceMemberRasters(members, null)
    );

    expect(result.current.memberRasters).toHaveLength(0);
  });
});
