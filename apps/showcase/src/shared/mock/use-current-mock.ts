import { useSearchParams } from 'next/navigation';
import { isProductionClient } from '../configuration';

export function useCurrentMock() {
  const searchParams = useSearchParams();

  // Disable mocking in production.
  if (isProductionClient()) {
    return {
      mock: undefined,
      mockChannelId: undefined,
    };
  }

  return {
    mock: searchParams.get('mock') ?? undefined,
    mockChannelId: searchParams.get('mockChannelId') ?? undefined,
  };
}
