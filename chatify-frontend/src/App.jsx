import './index.css';
import AppRoutes from './utils/Routes';
import { Routes, Route } from 'react-router-dom';
import RoomProvider from './utils/RoomProviders';

function App() {
  return (
    <RoomProvider>
      <Routes>
        {AppRoutes.map((r, idx) => (
          <Route key={idx} path={r.path} element={r.element} />
        ))}
      </Routes>
    </RoomProvider>
  );
}

export default App;
