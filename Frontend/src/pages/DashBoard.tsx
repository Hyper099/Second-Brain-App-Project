
import Card from "../components/ui/Card";
import DashBoardHeader from "../components/ui/DashBoardHeader";
import SideBar from "../components/ui/Sidebar/SideBar";

const DashBoard = () => {
   return (
      <div className="flex">

         {/* Sidebar */}
         <SideBar />

         {/* Main content */}
         <div className="ml-72 flex-1 px-10 py-8 min-h-screen">
            <DashBoardHeader />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2">
               <Card addedOn={new Date()} title="Football" link="https://x.com/Cristiano/status/1908264645850521752" type="twitter" />
               <Card addedOn={new Date()} title="Ramen" type="youtube" link="https://www.youtube.com/watch?v=WW62RWXMlTc" />
               <Card addedOn={new Date()} title="Ramen" type="youtube" link="https://www.youtube.com/watch?v=WW62RWXMlTc" />
               <Card addedOn={new Date()} title="Ramen" type="youtube" link="https://www.youtube.com/watch?v=WW62RWXMlTc" />
               <Card addedOn={new Date()} title="Ramen" type="youtube" link="https://www.youtube.com/watch?v=WW62RWXMlTc" />
               <Card addedOn={new Date()} title="Ramen" type="youtube" link="https://www.youtube.com/watch?v=WW62RWXMlTc" />
               <Card addedOn={new Date()} title="Ramen" type="youtube" link="https://www.youtube.com/watch?v=lVzb6pmel_E&ab_channel=SheryiansCodingSchool" />
            </div>
         </div>
      </div>
   );
};


export default DashBoard;
