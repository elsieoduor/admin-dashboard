'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from '../../firebase'; // Adjust path as necessary
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User:', userCredential.user); // Log user object
      
      // Store the token in localStorage
      const token = await userCredential.user.getIdToken(); // Fetch the token
      localStorage.setItem('authToken', token); // Store token in localStorage
      
      router.push('/'); // Redirect to dashboard after successful login
    } catch (error) {
      // Check if the error is an instance of AuthError and has a code property
      if (error && typeof (error as AuthError).code === 'string') {
        const authError = error as AuthError;
        switch (authError.code) {
          case 'auth/invalid-email':
            setError('Invalid email address.');
            break;
          case 'auth/user-not-found':
            setError('No user found with this email.');
            break;
          case 'auth/wrong-password':
            setError('Incorrect password.');
            break;
          default:
            setError('Failed to log in. Please try again.');
        }
      } else {
        setError('Failed to log in. Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <p>Dont have an account? <span><Link href={'/signup'} className='text-itallic'>Signup</Link></span></p>

        </form>
      </div>
    </div>
  );
};

export default Login;
