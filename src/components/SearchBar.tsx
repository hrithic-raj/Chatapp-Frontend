'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import { searchUsers } from '@/services/userService';
import { useChatStore } from '@/store/chatStore';
import { debounce } from 'lodash';
import { createOrGetChat } from '@/services/chatService';
import { useRouter } from 'next/navigation';

interface IUser {
  _id: string;
  name: string;
  profilePicture?: string;
}

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const { setSelectedChat, chats, setChats } = useChatStore();
    const router = useRouter();
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['searchUsers', search],
        queryFn: () => searchUsers(search),
        enabled: !!search,
    });

    const { mutate: createChat } = useMutation({
      mutationFn: createOrGetChat,
      onSuccess: (chat) => {
          setSelectedChat(chat._id);
          router.push(`/chat/${chat._id}`);
          
          if (!chats.some((c) => c._id === chat._id)) {
            setChats([...chats, chat]);
          }
          setSearch('');
      },
  });

    const handleSearch = debounce((e) => setSearch(e.target.value), 300);

    const handleSearchClick = async(userId: string)=>{
      createChat(userId);
      setSearch('');
    }
    return (
        <div className="relative max-h-[30%]">
            <input
                type="text"
                placeholder="Search..."
                className="w-full py-3 rounded-2xl bg-white text-gray-500 placeholder:text-gray-500 pl-5 focus:outline-1 outline-gray-500"
                onChange={handleSearch}
            />
            {isLoading && <p>Loading...</p>}

            {/* Display search results */}
            {users.length > 0 && (
                <div className="absolute w-full mt-2 max-h-[400px] bg-gray-100 rounded-lg shadow-md overflow-auto">
                    {users.map((user: IUser) => (
                        <div
                            key={user._id}
                            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200 text-black"
                            onClick={()=>handleSearchClick(user._id)}
                        >
                          {user.profilePicture && 
                            <Image 
                              src={user.profilePicture} 
                              alt="Profile" 
                              width={40}
                              height={40}
                              className='w-10 rounded-full'
                            />
                          }
                            {user.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
