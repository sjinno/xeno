import { useEffect, useState } from 'react';
import { GamePage, JoinPage } from './pages';
import { loadPublicGameData } from './firebase';
import { useGameStore } from './stores';

function App() {
  const [error, setError] = useState<string | null>(null);
  const { load } = useGameStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        const data = await loadPublicGameData();
        load(data);
      } catch (error) {
        setError(`Error loading public game data: ${(error as Error).message}`);
      }
    };
    initialize();
  }, []);

  if (error) {
    return (
      <div className="px-8 py-4 text-red-500">
        Something went wrong! Try refreshing the page?
      </div>
    );
  }

  return (
    <main className="px-8 py-4">
      <JoinPage />
      <GamePage />
    </main>
  );
}

export default App;
