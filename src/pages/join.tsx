import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { joinGroup, signInUser } from '@/firebase/auth';
import { useGameStore } from '@/stores';
import { useState } from 'react';

export const JoinPage = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { join } = useGameStore();

  const handleJoin = async () => {
    if (!name.trim() || !code.trim()) {
      setError('Name and code are required!');
      return;
    }

    setLoading(true);
    try {
      await signInUser(name);
      await joinGroup(code);
      join(name);
      setName('');
      setCode('');
      setError(null);
    } catch (error) {
      console.error(`Failed to join: ${error}`);
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
        onChange={(e) => setName(e.currentTarget.value)}
        className="w-52 mx-auto my-4 focus:bg-yellow-100"
        autoCorrect="off"
      />
      <Input
        placeholder="Enter code"
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
        className="w-52 mx-auto my-4 focus:bg-yellow-100"
        autoCorrect="off"
      />
      <Button className="block m-auto" onClick={handleJoin} disabled={loading}>
        {loading ? 'Joining...' : 'Join'}
      </Button>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};
