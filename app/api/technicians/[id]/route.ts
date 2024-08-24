import { NextRequest, NextResponse } from 'next/server';
import { 
  db, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc 
} from '../../../../firebase';

// GET /api/technicians/[id]
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.error();
  }

  try {
    const docSnap = await getDoc(doc(db, 'technicians', id));
    if (docSnap.exists()) {
      return NextResponse.json({ id, ...docSnap.data() });
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error('Failed to fetch technician:', error);
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
