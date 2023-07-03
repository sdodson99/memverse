import {
  MembersProvider,
  MembersApplicationBootstrapper,
} from '@/features/view-members';
import { NextPageRequest } from '@/shared/http';
import { createServiceProvider } from './create-service-provider';

export default async function Home(request: NextPageRequest) {
  const { getAllMembersQuery } = createServiceProvider(request);

  const members = await getAllMembersQuery.execute();

  return (
    <div>
      <main>
        <MembersProvider members={members}>
          <MembersApplicationBootstrapper />
        </MembersProvider>
      </main>
    </div>
  );
}
