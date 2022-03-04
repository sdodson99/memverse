import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ActiveLink from './ActiveLink';
import { useRouter } from 'next/router';

jest.mock('next/router');
const mockUseRouter = useRouter as jest.Mock;

describe('<ActiveLink />', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({});
  });

  afterEach(() => {
    mockUseRouter.mockReset();
  });

  it('should mount', () => {
    render(<ActiveLink href="/">hello world</ActiveLink>);

    const activeLink = screen.getByTestId('ActiveLink');

    expect(activeLink).toBeInTheDocument();
  });

  it('should render with active class name when active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/home' });
    render(
      <ActiveLink href="/home" activeClassName="active">
        hello world
      </ActiveLink>
    );

    const activeLink = screen.getByTestId('ActiveLink');

    expect(activeLink.className).toContain('active');
  });

  it('should not render with active class name when not active', () => {
    mockUseRouter.mockReturnValue({ pathname: '/home' });
    render(
      <ActiveLink
        href="/inactive"
        className="className"
        activeClassName="active"
      >
        hello world
      </ActiveLink>
    );

    const activeLink = screen.getByTestId('ActiveLink');

    expect(activeLink.className).toBe('className');
  });
});
