import { GameListener } from './components/game';
import { GamePage, JoinPage } from './pages';

function App() {
  return (
    <main className="px-8 py-4">
      <JoinPage />
      <GamePage />
      <GameListener />
    </main>
  );
}

export default App;
