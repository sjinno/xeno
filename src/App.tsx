import { GameListener } from './components/game';
import { LoungePage, GamePage, JoinPage } from './pages';

function App() {
  return (
    <main className="px-8 py-4">
      <JoinPage />
      <LoungePage />
      <GameListener />
      <GamePage />
    </main>
  );
}

export default App;
