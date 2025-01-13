import { Button } from '@/components/ui/button';
import { updateStatus } from '@/firebase';
import { useGameStore } from '@/stores';
import { useNavigate } from 'react-router';

export const ResultPage = () => {
  const { status } = useGameStore();
  const navigate = useNavigate();

  return (
    <>
      <h2 className="bg-sky-100 font-bold">Result Page</h2>
      <Button
        disabled={status === 'waiting'}
        onClick={async () => {
          await updateStatus('waiting');
          navigate('/lounge');
        }}
      >
        Back to Lounge
      </Button>
    </>
  );
};
