import {
  MembersProvider,
  MembersStage,
  getAllMembers,
} from '@/features/view-members';

export default async function Home() {
  const members = await getAllMembers();

  return (
    <div>
      <main>
        <MembersProvider members={members}>
          <MembersStage />
        </MembersProvider>
      </main>
    </div>
  );
}
