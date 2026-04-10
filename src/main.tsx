import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import Routes from './routes/Routes'
import { ToastContainer } from 'react-toastify'
import {persistStore, type Persistor} from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react'
import ReduxStore from './redux/ReduxStore'
import { Provider } from 'react-redux'
let persistor: Persistor = persistStore(ReduxStore)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ReduxStore}>
        <PersistGate loading={null} persistor={persistor}>
            <RouterProvider  router={Routes}/>
            <ToastContainer />
        </PersistGate>
     </Provider>
  </StrictMode>,
)
