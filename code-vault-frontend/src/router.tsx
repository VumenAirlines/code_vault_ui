import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import HomePage from './pages/HomePage'; 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import type { QueryClient } from '@tanstack/react-query';
import SnippetsPage from './pages/AllSnippetsPage';
import { snippetDetailLoader, snippetsLoader } from './features/snippets/loaders';
import { protectedRouteLoader } from './lib/auth';
import SnippetDetailPage from './pages/SnippetDetailPage';

export const createRouter = (queryClient:QueryClient)=>createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true, 
        element: <HomePage />,
      },
      {
        path: 'login', 
        element: <LoginPage />,
      },
      {
        path:'register',
        element:<RegisterPage/>
      },
     {
      loader:protectedRouteLoader,
      element:<Outlet/>,
      children:[
        {
          path:'snippets',
          element: <SnippetsPage/>,
          loader:snippetsLoader(queryClient)
        },
        {
          path: 'snippets/:id',
          loader:snippetDetailLoader(queryClient),
          element:<SnippetDetailPage/>,
        }
      ]
     }
      
    ],
  },
]);