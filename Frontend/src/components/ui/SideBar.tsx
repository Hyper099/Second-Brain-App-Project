import Logos from "../Icons/Logos";
import SideBarItem from "./SideBarItem";

const SideBar = () => {
   return (
      <div className="flex-1 bg-white min-h-screen outline outline-gray-200 rounded-xl p-5 fixed">
         <div className="flex justify-items-start font-bold gap-3 " >
            <Logos />
            <span className="text-3xl">
               Second Brain
            </span>
         </div>

         <div className="flex flex-col gap-5 mt-18 mx-7">
            <SideBarItem text="Tweets" />
            <SideBarItem text="Videos" />
            <SideBarItem text="Documents" />
            <SideBarItem text="Links" />
            <SideBarItem text="Tags" />
         </div>
      </div>
   );
}

export default SideBar;
