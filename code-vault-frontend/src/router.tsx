import { createBrowserRouter, Outlet } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import type { QueryClient } from "@tanstack/react-query";
import SnippetsPage from "./pages/AllSnippetsPage";
import {
  snippetDetailLoader,
  snippetsLoader,
} from "./features/snippets/loaders";
import { authRouteLoader, protectedRouteLoader } from "./lib/auth";
import SnippetDetailPage from "./pages/SnippetDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "login",
          element: <LoginPage />,
          loader: authRouteLoader,
        },
        {
          path: "register",
          element: <RegisterPage />,
          loader: authRouteLoader,
        },
        {
          loader: protectedRouteLoader,
          element: <Outlet />,
          children: [
            {
              path: "/",
              index: true,
              element: <HomePage />,
            },
            {
              path: "snippets",
              element: <SnippetsPage />,
              loader: snippetsLoader(queryClient),
            },
            {
              path: "snippets/:id",
              loader: snippetDetailLoader(queryClient),
              element: <SnippetDetailPage />,
            },
            {
              path: "search",

              element: <SearchResultsPage />,
            },
          ],
        },
      ],
    },
  ]);
