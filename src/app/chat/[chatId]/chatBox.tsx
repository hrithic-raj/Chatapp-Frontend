'use client';

import MessageList from '@/components/MessageList';
import MessageInput from '@/components/MessageInput';

export default function ChatBox() {
    return (
        <div className="flex-1 flex flex-col h-full max-h-full justify-between px-4 border rounded-2xl bg-white overflow-hidden">
            <MessageList />
            <MessageInput />
        </div>
    );
}
