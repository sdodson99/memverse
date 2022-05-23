import { atom, useRecoilState } from 'recoil';

const paperScopeState = atom<paper.PaperScope | null>({
  key: 'PaperScope',
  default: null,
  dangerouslyAllowMutability: true, // Need to allow mutability to let paper execute updates.
});

export const usePaperScope = () => useRecoilState(paperScopeState);
