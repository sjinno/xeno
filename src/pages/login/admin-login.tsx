import { LoginFormContainer } from '@/components/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/firebase';
import { useGameStore } from '@/stores';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { admin, setAdmin } = useGameStore();

  useEffect(() => {
    console.log('shohei - admin', admin);
  }, [admin]);

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('shohei - user', user);

      // Verify the user is admin
      {
        const idTokenResult = await user.getIdTokenResult();
        console.log('shohei - idTokenResult', idTokenResult);
        const isAdmin = idTokenResult.claims.role === 'admin' || false;
        console.log('Is user admin?', isAdmin);

        if (isAdmin) {
          // Grant access to admin features
          setAdmin(user.uid);
        } else {
          // Restrict access
        }
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginFormContainer>
      <h2 className="font-bold bg-rose-100">Admin Login Form</h2>
      <div>
        <Input
          type="email"
          value={email}
          placeholder="Email"
          className="w-52 mx-auto my-4 focus:bg-yellow-100"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="Password"
          className="w-52 mx-auto my-4 focus:bg-yellow-100"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </LoginFormContainer>
  );
};
