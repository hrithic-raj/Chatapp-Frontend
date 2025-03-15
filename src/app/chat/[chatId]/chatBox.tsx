'use client';

import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';

export default function ChatBox() {
    return (
        <div className="flex-1 flex flex-col h-full justify-between px-4 border rounded-2xl bg-white">
            <MessageList />
            <MessageInput />
        </div>
    );
}
