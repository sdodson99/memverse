import { screen } from '@testing-library/react';
import { Toolbar } from './toolbar';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setSession } from '../../../test/integration/mock-next-auth';
import { renderServerComponent } from '../../../test/unit/render-server-component';

describe('<Toolbar />', () => {
  it('signs user in when sign in button clicked', async () => {
    const { rerender } = renderServerComponent(<Toolbar />);

    const signInButton = await screen.findByAltText('Sign In');
    await userEvent.click(signInButton);

    rerender(<Toolbar />);

    const signOutButton = await screen.findByAltText('Sign Out');
    expect(signOutButton).toBeInTheDocument();
  });

  it('signs user out when sign out button clicked', async () => {
    setSession({ expires: '' });
    const { rerender } = renderServerComponent(<Toolbar />);

    const signOutButton = await screen.findByAltText('Sign Out');
    await userEvent.click(signOutButton);

    rerender(<Toolbar />);

    const signInButton = await screen.findByAltText('Sign In');
    expect(signInButton).toBeInTheDocument();
  });
});
