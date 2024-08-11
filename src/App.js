import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Setting from './pages/Setting';
import Home from './pages/Home';

import { KanbanContextProvider } from './context/kanbanContext';

function App() {

  const router = createBrowserRouter([{
    path : '/',
    element : <Index />,
    children : [
      {
        index : true,
        element : <Home />
      },
      {
        path : '/register',
        element : <Register />
      },
      {
        path : '/login',
        element : <Login />
      },
      {
        path : '/setting',
        element : <Setting />
      },
      {
        path : '*',
        element : <NotFound />
      }
    ]
  }])

  return (
    <>
      <KanbanContextProvider>
        <RouterProvider router={router}/>
      </KanbanContextProvider>
    </>
  );
}

export default App;
