import MessageInput from "./MessageInput";
import Image from "next/image";

export default function ChatWindow() {
  return (
    <div className="flex-1 flex flex-col justify-between px-4 border rounded-2xl bg-white">
      <div className="flex flex-col space-y-3">
        <div className="h-20 border-b py-2 flex-1 flex items-center space-x-3">
            <Image src="/dp.jpeg" width={50} height={50} className="rounded-full ml-2" alt="" />
            <span className="text-2xl text-black">Jijin kumar</span>
        </div>
        <div className="self-start bg-gray-200 text-black px-4 py-2 rounded-lg">Hey There!</div>
        <div className="self-start bg-gray-200 text-black px-4 py-2 rounded-lg">How are you?</div>
        <div className="self-end bg-purple-600 text-white px-4 py-2 rounded-lg">Hello!</div>
        <div className="self-end bg-purple-600 text-white px-4 py-2 rounded-lg">I am fine!</div>
      </div>
      <MessageInput />
    </div>
  );
}
