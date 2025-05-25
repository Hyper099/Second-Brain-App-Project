import { useEffect, useState } from "react";
import API from "../../../api/API";
import { useAuth } from "../../../context/AuthContext";
import Logos from "../../Icons/Logos";
import LogoutIcon from "../../Icons/LogoutIcon";
import SideBarItem from "./SideBarItem";

interface UserDetails {
   firstName: string;
}

const SideBar = () => {
   const [user, setUser] = useState<UserDetails | null>(null);
   const [isCollapsed, setIsCollapsed] = useState(false);
   const { logout } = useAuth();

   useEffect(() => {
      const fetchUser = async () => {
         const token = localStorage.getItem("token");

         if (token) {
            try {
               const response = await API.get("/user/details", {
                  headers: {
                     Authorization: token
                  }
               });
               setUser(response.data);
            } catch (err) {
               console.error("Error fetching user: ", err);
            }
         }
      };

      fetchUser();
   }, []);

   // Auto-collapse on mobile
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 768) {
            setIsCollapsed(true);
         } else {
            setIsCollapsed(false);
         }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <>
         {/* Mobile Overlay */}
         {!isCollapsed && window.innerWidth < 768 && (
            <div
               className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
               onClick={() => setIsCollapsed(true)}
            />
         )}

         <div
            data-sidebar
            className={`
               fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out 
               ${isCollapsed ? 'w-20' : 'w-70'}
               bg-white border-r border-gray-200 shadow-lg
            `}
         >
            {/* Toggle Button */}
            <button
               onClick={() => setIsCollapsed(!isCollapsed)}
               className="hidden md:flex absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-300 rounded-full items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-md cursor-pointer"
            >
               <svg
                  className={`w-3 h-3 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
               >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
               onClick={() => setIsCollapsed(!isCollapsed)}
               className="md:hidden fixed top-4 right-4 z-60 p-2 bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer"
            >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
            </button>

            <div className="flex flex-col h-full">
               {/* Top Section */}
               <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                        <Logos />
                     </div>
                     {!isCollapsed && (
                        <div className="min-w-0">
                           <h1 className="text-lg font-bold text-gray-900 truncate">
                              Second Brain
                           </h1>
                        </div>
                     )}
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                  <SideBarItem text="Tweets" isCollapsed={isCollapsed} />
                  <SideBarItem text="YouTube Videos" isCollapsed={isCollapsed} />
                  <SideBarItem text="Documents" isCollapsed={isCollapsed} />
                  <SideBarItem text="Links" isCollapsed={isCollapsed} />
                  <SideBarItem text="Tags" isCollapsed={isCollapsed} />
               </div>

               <div className="p-4 border-t border-gray-100 space-y-3">
                  {user ? (
                     <div className="flex items-center gap-3 group">
                        <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                           <span className="text-white font-semibold text-sm">
                              {user.firstName?.charAt(0).toUpperCase()}
                           </span>
                        </div>
                        {!isCollapsed && (
                           <div className="min-w-0 flex-1">
                              <p className="text-sm text-gray-500 font-medium ">
                                 Welcome!, 
                                 <span className="text-base font-semibold text-gray-900 truncate"> {user.firstName}</span></p>
                           </div>
                        )}
                     </div>
                  ) : (
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex-shrink-0 bg-gray-200 rounded-full animate-pulse" />
                        {!isCollapsed && (
                           <div className="flex-1">
                              <div className="h-3 bg-gray-200 rounded animate-pulse mb-1" />
                              <div className="h-2 bg-gray-200 rounded animate-pulse w-2/3" />
                           </div>
                        )}
                     </div>
                  )}

                  {/* Logout Button */}
                  <button
                     onClick={logout}
                     className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-gray-700 hover:text-red-600 hover:bg-red-50
                        transition-all duration-200 group cursor-pointer
                     ${isCollapsed ? 'justify-center' : 'justify-start'}
                     `}
                     title={isCollapsed ? 'Logout' : undefined}
                  >
                     <LogoutIcon />
                     {!isCollapsed && (
                        <span className="font-medium">Logout</span>
                     )}
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default SideBar;