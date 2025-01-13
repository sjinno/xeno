import { GameListener } from './components/game';
import { LoungePage, JoinPage } from './pages';

function App() {
  return (
    <main className="px-8 py-4">
      <JoinPage />
      <LoungePage />
      <GameListener />
    </main>
  );
}

export default App;
