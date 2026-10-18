import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import { RouterProvider } from "react-router/dom";
import Profile from "./pages/profile";
import ProjectsPage from "./pages/projects";
import CaseStudy from "./pages/case-study";
import NotFound from "./pages/not-found";

function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Profile /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/projects/:slug", element: <CaseStudy /> },
      { path: "*", element: <NotFound /> },
    ],
  },
], { basename: import.meta.env.BASE_URL });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
