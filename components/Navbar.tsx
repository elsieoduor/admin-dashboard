'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { auth, db } from '../firebase'; 

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<{ firstName?: string } | null>(null); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        try {
          // Fetch user profile from Firestore
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as { firstName?: string });
          } else {
            console.error('No user profile found in Firestore');
            setUserProfile({}); 
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserProfile({}); 
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-primary">TechAid</h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <div className="flex items-center">
              <span className="ml-2 font-medium mr-3">Hello, {userProfile?.firstName || 'User'}</span>
              <Image
                src={user.photoURL || '/default-profile.jpg'}
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
              />
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#003262] text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="bg-[#003262] text-white px-4 py-2 rounded-lg"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
