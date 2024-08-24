import { NextRequest, NextResponse } from 'next/server';
import { 
  db, 
  collection, 
  getDocs, 
  addDoc, 
  query, 
  where, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc 
} from '../../../firebase';

// GET /api/technicians
export async function GET(request: NextRequest) {
  // Extract query parameters from the URL
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';

  try {
    const techniciansRef = collection(db, 'technicians');
    const q = search
      ? query(techniciansRef, where('name', '>=', search), where('name', '<=', search + '\uf8ff'))
      : techniciansRef;

    const querySnapshot = await getDocs(q);
    const technicians = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(technicians);
  } catch (error) {
    console.error('Failed to fetch technicians:', error);
    return NextResponse.error();
  }
}

// POST /api/technicians
export async function POST(request: NextRequest) {
  try {
    const newTechnician = await request.json();
    const docRef = await addDoc(collection(db, 'technicians'), newTechnician);
    return NextResponse.json({ id: docRef.id, ...newTechnician }, { status: 201 });
  } catch (error) {
    console.error('Failed to add technician:', error);
    return NextResponse.error();
  }
}

// PUT /api/technicians/[id]
export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.error();
  }

  try {
    const updatedTechnician = await request.json();
    await updateDoc(doc(db, 'technicians', id), updatedTechnician);
    return NextResponse.json({ id, ...updatedTechnician });
  } catch (error) {
    console.error('Failed to update technician:', error);
    return NextResponse.error();
  }
}

// DELETE /api/technicians/[id]
export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.error();
  }

  try {
    await deleteDoc(doc(db, 'technicians', id));
    return NextResponse.json({ message: 'Technician deleted successfully' }, { status: 204 });
  } catch (error) {
    console.error('Failed to delete technician:', error);
    return NextResponse.error();
  }
}
