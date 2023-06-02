import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { ErrorPage, Home, Overtime, DataOvertime, Request, UpahAneka } from './Pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
        {
            path:'pret',
            element: <div><h1>Pret</h1></div>
        }
    ]
  },
  {
    path: 'overtime',
    element: <Overtime />
  },
  {
    path: 'dataovertime',
    element: <DataOvertime />
  },
  {
    path: 'request',
    element: <Request />
  },
  {
    path: 'upahaneka',
    element: <UpahAneka />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
