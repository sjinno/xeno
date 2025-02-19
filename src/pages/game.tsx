import { Button } from '@/components/ui/button';
import { updateStatus } from '@/firebase';
import { useGameStore } from '@/stores';
import { useNavigate } from 'react-router';

export const GamePage = () => {
  const { status } = useGameStore();
  const navigate = useNavigate();

  return (
    <div className="pt-6">
      <h2 className="bg-purple-100 font-bold">Game Page</h2>
      <Button
        disabled={status !== 'ongoing'}
        onClick={async () => {
          await updateStatus('finished');
          navigate('/game/result');
        }}
      >
        End!
      </Button>
    </div>
  );
};
