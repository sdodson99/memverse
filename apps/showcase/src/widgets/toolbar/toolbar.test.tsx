import { screen } from '@testing-library/react';
import { Toolbar } from './toolbar';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import {
  getSession,
  setSession,
} from '../../../test/integration/mock-next-auth';
import { renderServerComponent } from '../../../test/unit/render-server-component';
import { AuthProvider } from '@/features/auth';

describe('<Toolbar />', () => {
  let props: Parameters<typeof Toolbar>[0];

  beforeEach(() => {
    props = {
      searchParams: {},
      getServerSession: async () => getSession(),
    };
  });

  it('signs user in when sign in button clicked', async () => {
    const { rerender } = renderServerComponent(
      <AuthProvider>
        <Toolbar {...props} />
      </AuthProvider>
    );

    const signInButton = await screen.findByAltText('Sign In');
    await userEvent.click(signInButton);

    rerender(<Toolbar {...props} />);

    const signOutButton = await screen.findByAltText('Sign Out');
    expect(signOutButton).toBeInTheDocument();
  });

  it('signs user out when sign out button clicked', async () => {
    setSession({ expires: '' });
    const { rerender } = renderServerComponent(
      <AuthProvider>
        <Toolbar {...props} />
      </AuthProvider>
    );

    const signOutButton = await screen.findByAltText('Sign Out');
    await userEvent.click(signOutButton);

    rerender(<Toolbar {...props} />);

    const signInButton = await screen.findByAltText('Sign In');
    expect(signInButton).toBeInTheDocument();
  });
});
