
import Card from "../components/ui/Card";
import DashBoardHeader from "../components/ui/DashBoardHeader";
import SideBar from "../components/ui/SideBar";

const DashBoard = () => {
   return (
      <div className="flex ">

         <SideBar/>

         <div className="flex-4 px-10 py-8 ">

            <DashBoardHeader/>
            
            <div className="grid grid-cols-3 gap-9 p-4">
               <Card addedOn={new Date()} title="Football" link="https://x.com/Cristiano/status/1908264645850521752" type="twitter" />
               <Card addedOn={ new Date()} title="Ramen" type="youtube" link="https://www.youtube.com/watch?v=WW62RWXMlTc&ab_channel=TheDrunkenSommelier" />
            </div>
         </div>
      </div>
   );
}

export default DashBoard;
