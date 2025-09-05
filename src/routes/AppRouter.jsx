// AppRouter.jsx
import React from "react";
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OtpVerification from "../pages/OtpVerification";
import HomePage from "../pages/HomePage";
import BookDescription from "../pages/BookDescription";
import MyBooksPage from "../pages/MyBooksPage";
import BorrowedBooksPage from "../pages/BorrowedBooksPage";
import ReturnedBooksPage from "../pages/ReturnedBooksPage";
import AddNewBookPage from "../pages/AddNewBookPage";
import EditBookPage from "../pages/EditBookPage";
import ProtectedRoute from "../pages/ProtectedRoute";
import ErrorPage from "./ErrorPage";

// const LazyLoadedComponent = React.lazy(() =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(import("../pages/LazyLoadedComponent"));
//     }, 2000); // 2 second delay
//   })
// );


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, 
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "books/edit/:bookId", element: <EditBookPage /> },
          { path: "books/create", element: <AddNewBookPage /> },
          { path: "books/owner", element: <MyBooksPage /> },
          { path: "books/borrowed", element: <BorrowedBooksPage /> },
          { path: "books/returned", element: <ReturnedBooksPage /> },
          { path: "books/:id", element: <BookDescription /> },
        ],
      },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "verify/:email", element: <OtpVerification /> },
      // {
      //   path: "lazy",
      //   element: (
      //     <React.Suspense fallback={<div>Loading...</div>}>
      //       <LazyLoadedComponent />
      //     </React.Suspense>
      //   ),
      // },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
