import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from 'react-router-dom';
import GeneralContext from "./Context/Context.jsx"

const queryClient = new QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <GeneralContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GeneralContext>
  </QueryClientProvider>,
)
