import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const JoinPage = () => {
  return (
    <div className="py-6">
      <h2 className="bg-blue-100 font-bold">Join Page</h2>
      <Input
        placeholder="Enter code"
        className="w-52 mx-auto my-4 focus:bg-yellow-100"
        autoCorrect="off"
      />
      <Button className="block m-auto">Join</Button>
    </div>
  );
};
