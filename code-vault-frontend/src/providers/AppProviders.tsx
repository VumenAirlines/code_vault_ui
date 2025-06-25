import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode } from 'react';
import { ThemeProvider } from './ThemeProvider';


interface AppProvidersProps {
  children: ReactNode;
  client: QueryClient
}

export const AppProviders = ({ children, client }: AppProvidersProps) => {
  return (
   
    <QueryClientProvider client={client}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
