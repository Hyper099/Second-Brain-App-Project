import { useAuth } from "../../context/AuthContext";
import Logos from "../Icons/Logos";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
   const { user, logout } = useAuth();

   // const getUserDetails = (user) => {
   //    const userDetails = await API.get('/user/details')
   // }


   return (
      <div className="flex flex-col justify-between bg-white min-h-screen outline outline-gray-200 rounded-xl p-5 fixed w-64">
         {/* Top Section */}
         <div>
            <div className="flex items-center font-bold gap-3 mb-8">
               <Logos />
               <span className="text-3xl">Second Brain</span>
            </div>

            <div className="flex flex-col gap-5 mx-2">
               <SideBarItem text="Tweets" />
               <SideBarItem text="Videos" />
               <SideBarItem text="Documents" />
               <SideBarItem text="Links" />
               <SideBarItem text="Tags" />
            </div>
         </div>

         {/* Bottom Section */}
         <div className="mt-8 border-t pt-4 px-2">
            <div className="flex items-center gap-3 mb-3">
               <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold text-lg">
                  {user?.id?.charAt(0)?.toUpperCase() || "U"}
               </div>
               <div>
                  <p className="text-sm font-semibold">User ID</p>
                  <p className="text-xs text-gray-500 truncate w-40">{user?.id}</p>
               </div>
            </div>

            <button
               onClick={logout}
               className="w-full text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-3 rounded-lg transition"
            >
               Logout
            </button>
         </div>
      </div>
   );
};

export default SideBar;
