import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { joinGroup, signInUser } from '@/firebase/auth';
import { useGameStore } from '@/stores';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

interface ValidationError {
  name: string | null;
  code: string | null;
}

export const JoinPage = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<ValidationError>({
    name: null,
    code: null,
  });
  const [loading, setLoading] = useState(false);

  const { players } = useGameStore();
  const isFull = players.length === 4;

  const navigate = useNavigate();

  useEffect(() => {
    if (players.includes(name)) {
      setError((prev) => ({ ...prev, name: `${name} is taken.` }));
    }
  }, [name]);

  const handleJoin = async () => {
    {
      let acted = false;
      if (name.trim().length === 0) {
        acted = true;
        setError((prev) => ({ ...prev, name: 'Name is required!' }));
      }
      if (code.trim().length === 0) {
        acted = true;
        setError((prev) => ({ ...prev, code: 'Code is required!' }));
      }
      if (acted) return;
    }

    setLoading(true);

    try {
      await signInUser();
      await joinGroup(name, code);
      setName('');
      setCode('');
      setError({ name: null, code: null });
      navigate('/lounge');
    } catch (error) {
      console.error(`Failed to join: ${error}`);
      setError((prev) => ({ ...prev, code: (error as Error).message }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6">
      <h2 className="bg-blue-100 font-bold">Join Page</h2>
      <Input
        placeholder="Enter name"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
          setError((prev) => ({ ...prev, name: null }));
        }}
        className="w-52 mx-auto my-4 focus:bg-yellow-100"
        autoCorrect="off"
      />
      {error.name && <p className="text-red-500 text-center">{error.name}</p>}
      <Input
        placeholder="Enter code"
        value={code}
        onChange={(e) => {
          setCode(e.currentTarget.value);
          setError((prev) => ({ ...prev, code: null }));
        }}
        className="w-52 mx-auto my-4 focus:bg-yellow-100"
        autoCorrect="off"
      />
      {error.code && <p className="text-red-500 text-center">{error.code}</p>}
      <Button
        className="block m-auto"
        onClick={handleJoin}
        disabled={
          loading ||
          name.trim().length === 0 ||
          code.trim().length === 0 ||
          error.name !== null ||
          error.code !== null ||
          isFull
        }
      >
        {loading ? 'Joining...' : 'Join'}
      </Button>
      {isFull && (
        <p className="text-green-500 mt-2 text-center">
          Player limit reached. Time to play!
        </p>
      )}
    </div>
  );
};
