import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Layout from "./Layout";
import Homepage from "./features/pages/Home/Homepage";
import ListofRoom from "./features/pages/RoomList/ListofRoom";
import RoomDetail from "./features/pages/RoomDetail/RoomDetail";
import LandlordProfile from "./features/pages/Landlord/LandlordProfile";
import GuestaProfile from "./features/pages/Guest/GuestsProfile";
import LandlordCrud from "./features/pages/Landlord/LandlordCrud";
import Login from "./features/pages/Login/Login";
import Signup from "./features/pages/SignUp/Signup";
import AigeneratedDes from "./features/pages/Landlord/AigeneratedDes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/room", element: <ListofRoom /> },
      { path: "/guest", element: <GuestaProfile /> },
      { path: "/landlord", element: <LandlordProfile /> },
      { path: "/roomDetail/:id", element: <RoomDetail /> },
      { path: "/landlordCrud", element: <LandlordCrud /> },
      { path: "/generatedPage", element: <AigeneratedDes /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}
