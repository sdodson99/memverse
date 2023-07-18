import { MembersApplicationBootstrapper } from '@/features/view-members';
import { NextPageRequest } from '@/shared/http';
import { Services, withServiceProvider } from './create-service-provider';
import { Toolbar } from '@/widgets/toolbar';
import { MembersProvider } from '@/entities/member';
import { Layout } from '@/widgets/layout';

async function Home(props: NextPageRequest & Services) {
  const members = await props.getAllMembersQuery.execute();

  console.log('Loaded members:', members.length);

  return (
    <Layout fill={false}>
      <div data-testid="HomePage">
        <MembersProvider initialMembers={members}>
          <div className="relative flex flex-col">
            <MembersApplicationBootstrapper />
            <div className="absolute bottom-0 self-center rounded-xl bg-white bg-opacity-50 m-4">
              <Toolbar {...props} />
            </div>
          </div>
        </MembersProvider>
      </div>
    </Layout>
  );
}

export default withServiceProvider(
  (services) =>
    function ServiceProvider(request) {
      return <Home {...request} {...services} />;
    },
  (request: NextPageRequest) => request.searchParams
);
