// pages/api/user/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { auth, firestore } from '../../../firebaseAdmin'; // Adjust import based on your setup

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify token using Firebase Admin SDK
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const userRef = firestore.collection('users').doc(userId);

    if (req.method === 'GET') {
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        return res.status(200).json(userDoc.data());
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } else if (req.method === 'PUT') {
      const { firstName, lastName, email, phone, address, role } = req.body;
      await userRef.update({ firstName, lastName, email, phone, address, role });
      return res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling profile request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
