import {
  MembersProvider,
  MembersApplicationBootstrapper,
  getAllMembers,
} from '@/features/view-members';

export default async function Home() {
  const members = await getAllMembers();

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
