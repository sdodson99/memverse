import { Member, MembersProvider } from '@/entities/member';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ViewMembersListingSheetContent } from './view-members-listing-sheet-content';
import userEvent from '@testing-library/user-event';

type RenderProps = {
  members: Member[];
};

function renderComponent({ members }: RenderProps) {
  render(
    <MembersProvider initialMembers={members}>
      <ViewMembersListingSheetContent />
      <div data-rsbs-scroll="true" />
    </MembersProvider>
  );
}

function createMember(id: number) {
  return {
    id: id.toString(),
    username: `username-${id}`,
    message: `message-${id}`,
    photoUrl: `https://test.com/photo-url-${id}`,
  };
}

describe('<ViewMembersListingSheetContent />', () => {
  let members: Member[];

  beforeEach(() => {
    members = [
      createMember(1),
      createMember(2),
      createMember(3),
      createMember(4),
      createMember(5),
    ];
  });

  it('displays members', () => {
    renderComponent({ members });

    expect(screen.getByText('username-1')).toBeInTheDocument();
    expect(screen.getByText('username-2')).toBeInTheDocument();
    expect(screen.getByText('username-3')).toBeInTheDocument();
  });

  it('filters members on search input', async () => {
    renderComponent({ members });

    const searchInput = screen.getByPlaceholderText('Search Members...');
    await userEvent.type(searchInput, '1');

    expect(screen.queryByText('username-1')).toBeInTheDocument();
    expect(screen.queryByText('username-2')).not.toBeInTheDocument();
  });
});
