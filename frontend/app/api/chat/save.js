import { NextResponse } from "next/server";
import { db } from "../../../lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  setDoc,
} from "firebase/firestore";

export default async function POST(req) {
  try {
    const { userId, messages } = req.body;

    const userChat = await setDoc(
      doc(db, "chats", userId),
      { messages: arrayUnion(...messages)},
      { merge: true }
    );
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error saving chat history:", error);
    return NextResponse.json(
      { success: false },
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
