import Navbar from "./components/Navbar";
import ChaboxBody from "./components/Chatbox";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-200 flex h-screen items-center justify-center">
      <Navbar />
        <ChaboxBody />
    </div>
  );
}
