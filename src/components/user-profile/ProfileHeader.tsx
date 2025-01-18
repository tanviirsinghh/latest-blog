import { Camera, Edit3 } from "lucide-react";
import { User } from '../../hooks'

export default function ProfileHeader({ user, setIsEditModalOpen }: { user: User; setIsEditModalOpen: (state: boolean) => void }) {
    return (
      <div className="relative">
        <div className="h-80 relative">
          <img src={"user.coverpicture"} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90" />
          <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-900/50 backdrop-blur-sm rounded-lg text-white hover:bg-gray-900/70 transition-colors">
            <Camera size={18} />
            <span>Change Cover</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-20 relative">
            <div className="relative group">
              <img
                src={"user.profilePicture"}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-xl"
              />
              <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-start">
                <div>
                  <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                  <p className="text-cyan-400 font-medium">{user.blogName}</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 px-4 ml-16 py-2 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-medium rounded-lg transition-colors"
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
              </div>
              <p className="mt-2 text-gray-300 max-w-2xl">{"user.bio"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  