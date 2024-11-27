import './App.css';
import Header from './Components/Header';
import GoogleMap from './Components/GoogleMap';
import NotFound from './Pages/not-found/NotFound';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RideSolicitation from './Pages/ride-solicitation/RideSolicitation';
import Homepage from './Pages/homepage/Homepage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={ < Homepage /> } />
          <Route path="/ride-solicitation" element={ < RideSolicitation /> } />
          <Route path="/ride-options" element={ < GoogleMap /> } />
          <Route path="/history-rides" element={ < GoogleMap /> } />
          <Route path="*" element={ <NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
