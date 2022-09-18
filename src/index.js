import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { DinasLuar, ErrorPage, Home, Overtime, Request } from './Pages';

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
    path: 'request',
    element: <Request />
  },
  {
    path: 'dinasluar',
    element: <DinasLuar />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(<RouterProvider router={router} />);
