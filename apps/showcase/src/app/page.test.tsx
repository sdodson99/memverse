import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

function Test() {
  return <div>hello world!</div>;
}

describe('<Home />', () => {
  it('renders members', () => {
    render(<Test />);

    expect(screen.getByText('hello world!')).toBeInTheDocument();
  });
});
