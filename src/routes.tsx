import { BrowserRouter, Route, Routes } from 'react-router';
import { GamePage, JoinPage, LoungePage, ResultPage } from './pages';
import { GameListener } from './components/game';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <GameListener />
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/lounge" element={<LoungePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
