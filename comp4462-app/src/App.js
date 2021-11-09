import logo from './logo.svg';
import './App.css';
import { renderRoutes } from 'react-router-config';
import routes from './routes';


function App() {
  return (
    <div style={{backgroundColor: "green"}}>
    {renderRoutes(routes)}
    </div>
  );
}

export default App;
