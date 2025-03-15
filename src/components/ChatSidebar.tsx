'use client';
import SearchBar from "./SearchBar";
import ChatList from "./ChatList";

export default function ChatSidebar() {
  return (
    <div className="flex flex-col gap-4 w-80 h-full rounded-2xl">
      <SearchBar />
      <ChatList />
    </div>
  );
}