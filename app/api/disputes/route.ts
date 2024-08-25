import { NextRequest, NextResponse } from 'next/server';
import { db, collection, getDocs,addDoc, query, where } from '../../../firebase';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
  
    try {
      const disputesRef = collection(db, 'disputes');
      const q = search
        ? query(disputesRef, where('issue', '>=', search), where('issue', '<=', search + '\uf8ff'))
        : disputesRef;
  
      const querySnapshot = await getDocs(q);
      const disputes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return NextResponse.json(disputes);
    } catch (error) {
      console.error('Failed to fetch disputes:', error);
      return NextResponse.error();
    }
  }

export async function POST(request: NextRequest) {
  try {
    const newDispute = await request.json();
    const docRef = await addDoc(collection(db, 'disputes'), newDispute);
    return NextResponse.json({ id: docRef.id, ...newDispute }, { status: 201 });
  } catch (error) {
    console.error('Failed to add dispute:', error);
    return NextResponse.error();
  }
}
