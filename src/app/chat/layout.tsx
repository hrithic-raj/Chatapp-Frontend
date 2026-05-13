"use client";

import ChatSidebar from '@/components/ChatSidebar';
import { usePathname } from "next/navigation";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isChatPage = pathname !== "/chat";
    
    return (
         <div className="flex h-screen bg-[#D8DEEC] w-full p-2 md:p-4 gap-4 overflow-hidden">
            
            {/* SIDEBAR */}
            <div
                className={`
                    ${
                        isChatPage
                            ? "hidden md:flex"
                            : "flex"
                    }
                    w-full md:w-87.5
                    flex-col
                `}
            >
                <ChatSidebar />
            </div>

            {/* CHAT AREA */}
            <main
                className={`
                    flex-1 h-full
                    ${
                        !isChatPage
                            ? "hidden md:flex"
                            : "flex"
                    }
                `}
            >
                {children}
            </main>
        </div>
    );
}
