import { useEffect, useState } from "react";
import API from "../../../api/API";
import { useAuth } from "../../../context/AuthContext";
import Logos from "../../Icons/Logos";
import SideBarItem from "./SideBarItem";

interface UserDetails {
   firstName: string;
}

const SideBar = () => {
   const [user, setUser] = useState<UserDetails | null>(null);
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
               setUser(response.data); // <- correct way to access the data
            } catch (err) {
               console.error("Error fetching user: ", err);
            }
         }
      };

      fetchUser();
   }, []);

   return (
      <div className="flex flex-col justify-between bg-white min-h-screen outline outline-gray-200 rounded-xl p-5 fixed w-72 ">
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
            {user ? (
               <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-semibold text-lg">
                     {user.firstName?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                     <p>
                        <span>Welcome, </span>
                        <span className="text-md font-semibold">{user.firstName}</span> </p>
                  </div>
               </div>
            ) : (
               <p className="text-sm text-gray-400 mb-4">Loading user...</p>
            )}

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
