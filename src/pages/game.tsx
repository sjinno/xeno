import { useState } from 'react';

export const GamePage = () => {
  const [players, setPlayers] = useState<string[]>([]);

  return (
    <div>
      <h2 className="bg-green-100 font-bold">Game Page</h2>
      <div>
        <p className="font-semibold">
          Joined players{players.length > 0 && <span> ({players.length})</span>}
          :
        </p>
        {players.length > 0 ? (
          <ul className="list-disc ml-5">
            {players.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        ) : (
          <p className="text-red-500">Nobody is here yet :(</p>
        )}
      </div>
    </div>
  );
};
