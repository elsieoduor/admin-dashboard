import { NextRequest, NextResponse } from 'next/server';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db, collection, addDoc } from '../../../../firebase';
import bcrypt from 'bcryptjs';

const auth = getAuth();
const SALT_ROUNDS=10;

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, address, phoneNumber } = await request.json();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create user in Firebase Authentication
    await createUserWithEmailAndPassword(auth, email, password);

    // Store user data in Firestore
    await addDoc(collection(db, 'users'), {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      phoneNumber,
    });

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Sign-up error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}
