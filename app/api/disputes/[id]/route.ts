import { NextRequest, NextResponse } from 'next/server';
import { db, doc, getDoc, updateDoc } from '../../../../firebase';

// GET /api/disputes/[id]
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop();

  if (!id) {
    return NextResponse.error();
  }

  try {
    const docSnap = await getDoc(doc(db, 'disputes', id));
    if (docSnap.exists()) {
      return NextResponse.json({ id, ...docSnap.data() });
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error('Failed to fetch dispute:', error);
    return NextResponse.error();
  }
}

// PUT /api/disputes/[id]
export async function PUT(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
  
    if (!id) {
      return NextResponse.error();
    }
  
    try {
      const updatedData = await request.json();
      await updateDoc(doc(db, 'disputes', id), updatedData);
      return NextResponse.json({ id, ...updatedData });
    } catch (error) {
      console.error('Failed to update dispute status:', error);
      return NextResponse.error();
    }
  }
  


