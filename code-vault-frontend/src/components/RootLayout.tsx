import { Outlet } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <ThemeToggle/> 
      <main className="container mx-auto py-8">
        <Outlet /> 
      </main>
    </div>
  );
};

export default RootLayout;