import React from 'react';

interface LoadingStateProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: string) => React.ReactNode;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  loading,
  error,
  children,
  loadingComponent = <p>Loading...</p>,
  errorComponent = (err: string) => <p style={{color: 'red'}}>{err}</p>,
}) => {
  if (loading) return <>{loadingComponent}</>;
  if (error) return <>{errorComponent(error)}</>;
  return <>{children}</>;
};
