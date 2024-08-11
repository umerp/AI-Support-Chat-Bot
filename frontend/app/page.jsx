import Navbar from "./components/Navbar";
import ChatboxHeader from "./components/ChatboxHeader";
import ChaboxBody from "./components/ChaboxBody";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 flex h-screen items-center justify-center">
      <Navbar />
      <div className="flex h-96 w-full max-w-lg flex-col items-center justify-between  border-solid border-2 border-gray-500">
        <ChatboxHeader />
        
        <ChaboxBody />

      </div>
    </div>
  );
}
