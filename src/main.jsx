import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Routes.jsx'
import queryClient from './client/queryClient.js'
import { QueryClientProvider } from '@tanstack/react-query'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
