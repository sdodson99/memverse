import { Member } from '../../../models/member';
import { renderHook } from '@testing-library/react-hooks';
import { useSpaceMembers } from '../use-space-members';

describe('useSpaceMembers', () => {
  let members: Member[];

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
  });

  it('should return mapped space members', () => {
    const { result } = renderHook(() => useSpaceMembers(members));

    expect(result.current.spaceMembers).toHaveLength(2);
  });
});
