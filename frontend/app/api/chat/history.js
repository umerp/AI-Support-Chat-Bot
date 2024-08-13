import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function GET(req) {
  try {
    const { userId } = req.query;
    const userDoc = doc(db, 'chats', userId);
    const userChat = await getDoc(userDoc);

    if (userChat.exists()) {
        return NextResponse.json({ success: true, messages: userChat.data().messages }, { status: 200 });
    } else {
        return NextResponse.json({ ssuccess: false, error: 'Chat history not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error retrieving chat history:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
