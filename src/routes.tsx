import { BrowserRouter, Route, Routes } from 'react-router';
import { GamePage, Home, LoginPage, LoungePage, ResultPage } from './pages';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/guest/login" element={<LoungePage />} />
        {/* NOTE: only admin can create a new game */}
        <Route path="/create" element={<LoginPage />} />
        <Route path="/lounge/:gameId" element={<GamePage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
        <Route path="/results/:gameId" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
