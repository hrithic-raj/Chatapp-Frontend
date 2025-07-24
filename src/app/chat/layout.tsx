import ChatSidebar from '@/components/ChatSidebar';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen gap-4 bg-[#D8DEEC] px-4 py-4 w-full">
            <ChatSidebar />
            <main className="flex-1">{children}</main>
        </div>
    );
}
