// pages/api/technicians/index.ts
'use client'
import { NextApiRequest, NextApiResponse } from 'next';
import { db, collection, getDocs, addDoc } from '../../../firebase';

const techniciansCollection = collection(db, 'technicians');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const snapshot = await getDocs(techniciansCollection);
      const technicians = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(technicians);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch technicians' });
    }
  } else if (req.method === 'POST') {
    try {
      const newTechnician = req.body;
      const docRef = await addDoc(techniciansCollection, newTechnician);
      res.status(201).json({ id: docRef.id, ...newTechnician });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add technician' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
