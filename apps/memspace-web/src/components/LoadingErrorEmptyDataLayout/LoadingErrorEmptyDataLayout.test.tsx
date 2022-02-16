import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoadingErrorEmptyDataLayout from './LoadingErrorEmptyDataLayout';

describe('<LoadingErrorEmptyDataLayout />', () => {
  it('should mount', () => {
    render(<LoadingErrorEmptyDataLayout />);

    const loadingErrorEmptyDataLayout = screen.getByTestId(
      'LoadingErrorEmptyDataLayout'
    );

    expect(loadingErrorEmptyDataLayout).toBeInTheDocument();
  });

  it('should render loading display when loading', () => {
    render(
      <LoadingErrorEmptyDataLayout isLoading={true} loadingDisplay="Loading" />
    );

    const display = screen.getByText('Loading');

    expect(display).toBeInTheDocument();
  });

  it('should render error display when error after loading', () => {
    render(
      <LoadingErrorEmptyDataLayout
        isLoading={false}
        loadingDisplay="Loading"
        hasError={true}
        errorDisplay="Error"
      />
    );

    const display = screen.getByText('Error');

    expect(display).toBeInTheDocument();
  });

  it('should render no data display when no data or error after loading', () => {
    render(
      <LoadingErrorEmptyDataLayout
        isLoading={false}
        loadingDisplay="Loading"
        hasError={false}
        errorDisplay="Error"
        hasData={false}
        noDataDisplay="No data"
      />
    );

    const display = screen.getByText('No data');

    expect(display).toBeInTheDocument();
  });

  it('should render data display when data available and no error after loading', () => {
    render(
      <LoadingErrorEmptyDataLayout
        isLoading={false}
        loadingDisplay="Loading"
        hasError={false}
        errorDisplay="Error"
        dataDisplay="Data"
      />
    );

    const display = screen.getByText('Data');

    expect(display).toBeInTheDocument();
  });
});
