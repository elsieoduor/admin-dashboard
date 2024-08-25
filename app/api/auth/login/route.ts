import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Generate JWT token
    const token = jwt.sign({ uid: userCredential.user.uid }, SECRET_KEY, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  }
}
