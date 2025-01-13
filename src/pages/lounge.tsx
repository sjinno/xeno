import { Button } from '@/components/ui/button';
import { updateStatus } from '@/firebase';
import { useGameStore } from '@/stores';
import { useNavigate } from 'react-router';

export const LoungePage = () => {
  const { players, status } = useGameStore();
  const isGameReady = players.length > 1 && status === 'waiting';

  const navigate = useNavigate();

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
      <Button
        disabled={!isGameReady}
        onClick={async () => {
          await updateStatus('ongoing');
          navigate('/game');
        }}
      >
        Play!
      </Button>
    </div>
  );
};
