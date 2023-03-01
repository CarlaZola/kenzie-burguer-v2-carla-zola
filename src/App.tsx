import { UserProvider } from './providers/UserContext';
import { RoutesMain } from './routes/routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <GlobalStyles />
    <UserProvider>
      <RoutesMain />
    </UserProvider>
  </>
);

export default App;
