import { NextRequest, NextResponse } from 'next/server';
import { auth, firestore } from '../../../firebaseAdmin'; // Adjust import based on your setup

// GET /api/user
export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify token using Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const userRef = firestore.collection('users').doc(userId);

    const userDoc = await userRef.get();
    if (userDoc.exists) {
      return NextResponse.json(userDoc.data());
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error handling profile request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/user
export async function PUT(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify token using Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const userRef = firestore.collection('users').doc(userId);

    const updatedData = await request.json();
    const { firstName, lastName, email, phone, address, role } = updatedData;
    await userRef.update({ firstName, lastName, email, phone, address, role });

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error handling profile update:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
