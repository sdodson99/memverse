import { render, screen } from '@testing-library/react';
import { Toolbar } from './toolbar';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { setSession } from '../../../test/integration/mock-next-auth';

describe('<Toolbar />', () => {
  it('signs user in when sign in button clicked', async () => {
    const { rerender } = render(await Toolbar());

    const signInButton = screen.getByAltText('Sign In');
    await userEvent.click(signInButton);

    rerender(await Toolbar());

    const signOutButton = screen.getByAltText('Sign Out');
    expect(signOutButton).toBeInTheDocument();
  });

  it('signs user out when sign out button clicked', async () => {
    setSession({ expires: '' });
    const { rerender } = render(await Toolbar());

    const signOutButton = screen.getByAltText('Sign Out');
    await userEvent.click(signOutButton);

    rerender(await Toolbar());

    const signInButton = screen.getByAltText('Sign In');
    expect(signInButton).toBeInTheDocument();
  });
});
