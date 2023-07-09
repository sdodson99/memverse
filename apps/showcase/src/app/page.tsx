import { MembersApplicationBootstrapper } from '@/features/view-members';
import { NextPageRequest } from '@/shared/http';
import { createServiceProvider } from './create-service-provider';
import { Toolbar } from '@/widgets/toolbar';
import { MembersProvider } from '@/entities/member';
import { Layout } from '@/widgets/layout';

export default async function Home(request: NextPageRequest) {
  const { getAllMembersQuery } = createServiceProvider(request.searchParams);

  const members = await getAllMembersQuery.execute();

  console.log('Loaded members:', members.length);

  return (
    <Layout fill={false}>
      <div data-testid="HomePage">
        <MembersProvider initialMembers={members}>
          <div className="relative flex flex-col">
            <MembersApplicationBootstrapper />
            <div className="absolute bottom-0 self-center rounded-t-xl bg-white bg-opacity-50">
              <Toolbar {...request} />
            </div>
          </div>
        </MembersProvider>
      </div>
    </Layout>
  );
}
