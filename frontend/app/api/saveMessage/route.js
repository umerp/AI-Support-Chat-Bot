import { getServerSession } from "next-auth/next";
import { options } from "../auth/[...nextauth]/options";
import { db } from '../../firebase';
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession({ req, options });

  if (!session) {
    return NextResponse.json({ success: false, error: 'User not authenticated' }, { status: 401 });
  }

  // Ensure that session.user.email is defined
  if (!session.user || !session.user.email) {
    console.error("Error: User email is undefined or null");
    return NextResponse.json({ success: false, error: 'User email is undefined' }, { status: 400 });
  }

  const { message } = await req.json();

  try {
    const userEmail = session.user.email;
    console.log("User email:", userEmail);  // Logging for debugging

    const userChatRef = doc(db, "chats", userEmail);

    // Ensure that the 'message' object is well-formed
    if (!message || typeof message !== 'object') {
      console.error("Error: Invalid message format");
      return NextResponse.json({ success: false, error: "Invalid message format" }, { status: 400 });
    }

    await setDoc(userChatRef, { messages: arrayUnion(message) }, { merge: true });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving chat history:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
