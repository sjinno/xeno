import { useEffect } from 'react';
import { useGameStore } from '@/stores';

export const GameListener = () => {
  const { players, status, subscribeToPublicData, unsubscribeFromPublicData } =
    useGameStore();

  useEffect(() => {
    // Subscribe to the public document when the component mounts
    subscribeToPublicData();

    // Cleanup by unsubscribing when the component unmounts
    return () => unsubscribeFromPublicData();
  }, [subscribeToPublicData, unsubscribeFromPublicData]);

  return (
    <div className="pt-6">
      <h2 className="bg-rose-100 font-bold">Public Game Data</h2>
      {players.length > 0 ? (
        <>
          <pre>
            <span className="font-semibold">Players:</span> {players.toString()}
          </pre>
          <pre>
            <span className="font-semibold">Status:</span> {status}
          </pre>
        </>
      ) : (
        <p>No data available or document does not exist.</p>
      )}
    </div>
  );
};
