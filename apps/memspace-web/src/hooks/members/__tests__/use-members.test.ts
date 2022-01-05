import { renderHook } from '@testing-library/react-hooks';
import { useMembers } from '../use-members';
import axios from 'axios';
import { waitFor } from '@testing-library/react';
import { when } from 'jest-when';

jest.mock('axios');
const mockAxiosGet = axios.get as jest.Mock;

describe('useMembers', () => {
  beforeEach(() => {
    mockAxiosGet.mockReturnValue({ data: [] });
  });

  afterEach(() => {
    mockAxiosGet.mockReset();
  });

  it('should return members if members request successful', async () => {
    const expectedMembers = [{}];
    when(mockAxiosGet)
      .calledWith(`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/members`)
      .mockReturnValue({ data: expectedMembers });

    const { result } = renderHook(() => useMembers());

    await waitFor(() => {
      expect(result.current.members).toEqual(expectedMembers);
      expect(result.current.loading).toBeFalsy();
      expect(result.current.error).toBeNull();
    });
  });

  it('should return error if members request not successful', async () => {
    const error = new Error();
    when(mockAxiosGet)
      .calledWith(`${process.env.NEXT_PUBLIC_MEMSPACE_SERVER_BASE_URL}/members`)
      .mockImplementation(() => {
        throw error;
      });

    const { result } = renderHook(() => useMembers());

    await waitFor(() => {
      expect(result.current.error).toBe(error);
      expect(result.current.members).toEqual([]);
      expect(result.current.loading).toBeFalsy();
    });
  });

  it('should transition loading states', async () => {
    const { result } = renderHook(() => useMembers());

    expect(result.current.loading).toBeTruthy();
    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });
  });
});
