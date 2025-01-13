import { useGameStore } from '@/stores';

export const LoungePage = () => {
  const { players } = useGameStore();

  return (
    <div>
      <h2 className="bg-green-100 font-bold">Lounge Page</h2>
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
