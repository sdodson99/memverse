import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  UpdateMemberMessageForm,
  UpdateMemberMessageFormProps,
} from './update-member-message-form';
import { setSession } from '../../../test/integration/mock-next-auth';
import { Member, MembersProvider } from '@/entities/member';
import userEvent from '@testing-library/user-event';
import { mockFirebaseData } from '../../../test/integration/mock-firebase-admin';

function renderComponent(
  props: UpdateMemberMessageFormProps,
  members: Member[] = []
) {
  render(
    <MembersProvider initialMembers={members}>
      <UpdateMemberMessageForm {...props} />
    </MembersProvider>
  );
}

describe('<UpdateMemberMessageForm />', () => {
  let props: UpdateMemberMessageFormProps;

  let updatedMessage: string;

  beforeEach(() => {
    props = {
      onSuccess: vi.fn(),
      onCancel: vi.fn(),
    };

    updatedMessage = 'updated-message';
  });

  it("pre-fills form with user's current message", async () => {
    setSession({ channelId: '1', expires: '' });

    renderComponent(props, [
      {
        id: '1',
        username: '',
        message: 'message-1',
        photoUrl: '',
      },
    ]);

    const messageInput = screen.getByLabelText<HTMLInputElement>('Message');
    expect(messageInput.value).toBe('message-1');
  });

  it('updates member message in database on successful submit', async () => {
    setSession({ channelId: '1', expires: '' });

    renderComponent(props);

    const messageInput = screen.getByLabelText('Message');
    await userEvent.clear(messageInput);
    await userEvent.type(messageInput, updatedMessage);

    const submitButton = screen.getByText('Update');
    await userEvent.click(submitButton);

    const databaseMessage: any = mockFirebaseData.data?.['/messages/1'];
    expect(databaseMessage?.content).toBe(updatedMessage);
  });

  it('shows submit error on failed submit', async () => {
    // Will throw an auth error on submit.
    setSession(null);

    renderComponent(props);

    const messageInput = screen.getByLabelText('Message');
    await userEvent.clear(messageInput);
    await userEvent.type(messageInput, updatedMessage);

    const submitButton = screen.getByText('Update');
    await userEvent.click(submitButton);

    const submitErrorMessage = screen.getByText(
      'Failed to update message. Please try again!'
    );
    expect(submitErrorMessage).toBeInTheDocument();
  });
});
