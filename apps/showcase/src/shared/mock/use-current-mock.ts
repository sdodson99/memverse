import { useSearchParams } from 'next/navigation';
import { IsProductionClient } from '../configuration';

export function useCurrentMock() {
  const searchParams = useSearchParams();

  // Disable mocking in production.
  if (IsProductionClient()) {
    return {
      mock: undefined,
      mockChannelId: undefined,
    };
  }

  return {
    mock: searchParams.get('mock'),
    mockChannelId: searchParams.get('mockChannelId'),
  };
}
