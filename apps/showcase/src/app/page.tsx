import {
  MembersProvider,
  MembersApplicationBootstrapper,
} from '@/features/view-members';
import { NextPageRequest } from '@/shared/http';
import { createServiceProvider } from './create-service-provider';
import { Toolbar } from '@/widgets/toolbar';

export default async function Home(request: NextPageRequest) {
  const { getAllMembersQuery } = createServiceProvider(request.searchParams);

  const members = await getAllMembersQuery.execute();

  return (
    <div data-testid="HomePage">
      <main>
        <MembersProvider members={members}>
          <div className="relative flex flex-col">
            <MembersApplicationBootstrapper />
            <div className="absolute bottom-0 self-center rounded-t-xl bg-white bg-opacity-50">
              <Toolbar />
            </div>
          </div>
        </MembersProvider>
      </main>
    </div>
  );
}
