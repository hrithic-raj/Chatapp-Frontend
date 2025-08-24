import { useAuthStore } from "@/store/userStore";
import { useState } from "react";

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { user, updateUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    profilePicture: user?.profilePicture || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex justify-center items-center"
         onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-96 relative" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Profile Picture URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.profilePicture}
              onChange={(e) => setFormData({...formData, profilePicture: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
