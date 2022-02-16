import React from 'react';
import styles from './LoadingErrorEmptyDataLayout.module.css';

type LoadingErrorEmptyDataLayoutProps = {
  isLoading?: boolean;
  loadingDisplay?: React.ReactNode;
  hasError?: boolean;
  errorDisplay?: React.ReactNode;
  hasData?: boolean;
  dataDisplay?: React.ReactNode;
  noDataDisplay?: React.ReactNode;
};

const LoadingErrorEmptyDataLayout = ({
  isLoading,
  loadingDisplay,
  hasError,
  errorDisplay,
  hasData = true,
  dataDisplay,
  noDataDisplay,
}: LoadingErrorEmptyDataLayoutProps) => (
  <div
    className={styles.loadingErrorEmptyDataLayout}
    data-testid="LoadingErrorEmptyDataLayout"
  >
    {isLoading && loadingDisplay}

    {!isLoading && (
      <>
        {hasError && errorDisplay}

        {!hasError && (
          <>
            {!hasData && noDataDisplay}

            {hasData && dataDisplay}
          </>
        )}
      </>
    )}
  </div>
);

export default LoadingErrorEmptyDataLayout;
