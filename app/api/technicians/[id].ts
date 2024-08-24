'use client';
import { NextApiRequest, NextApiResponse } from 'next';
import { db, doc, getDoc, updateDoc, deleteDoc } from '../../../firebase';

const technicianDoc = (id: string) => doc(db, 'technicians', id);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    try {
      const docRef = technicianDoc(id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        res.status(200).json({ id, ...docSnap.data() });
      } else {
        res.status(404).json({ error: 'Technician not found' });
      }
    } catch (error) {
      console.error('Failed to fetch technician:', error);
      res.status(500).json({ error: 'Failed to fetch technician' });
    }
  } else if (req.method === 'PUT') {
    try {
      const updatedTechnician = req.body;
      await updateDoc(technicianDoc(id), updatedTechnician);
      res.status(200).json({ id, ...updatedTechnician });
    } catch (error) {
      console.error('Failed to update technician:', error);
      res.status(500).json({ error: 'Failed to update technician' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deleteDoc(technicianDoc(id));
      res.status(204).end();
    } catch (error) {
      console.error('Failed to delete technician:', error);
      res.status(500).json({ error: 'Failed to delete technician' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
