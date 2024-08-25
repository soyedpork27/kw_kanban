import './App.css';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Index from './pages/Index';
import NotFound from './pages/NotFound';
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
        path : '/setting',
        element : <Setting />
      },
      {
        path : '*',
        element : <NotFound />
      }
    ]
  }]);


  return (
    <>
      <KanbanContextProvider>
        <RouterProvider router={router}/>
      </KanbanContextProvider>
    </>
  );
}

export default App;
