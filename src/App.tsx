import { ToastContainer } from 'react-toastify';
import { UserProvider } from './providers/UserContext';
import Router from './routes';
import { GlobalStyles } from './styles/global';
import 'react-toastify/dist/ReactToastify.css'

const App = () => (
  <>
    <GlobalStyles />
    <ToastContainer position="top-right" autoClose={2000}/>
    <UserProvider>
      <Router />
    </UserProvider>
  </>
);

export default App;
