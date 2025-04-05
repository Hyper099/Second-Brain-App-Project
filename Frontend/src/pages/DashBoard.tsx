import { PlusIcon } from "../components/Icons/PlusIcon";
import { ShareIcon } from "../components/Icons/ShareIcon";
import { Button } from "../components/ui/Button";

const DashBoard = () => {

   function shareFunction() {
      alert("Share button clicked");
   }
   function addContent() {
      alert("content add button clicked");
   }


   return (

      <div className="flex">

         <div className="flex-1 bg-amber-800 min-h-screen">

         </div>

         <div className="flex-4">
            <div className="flex justify-between m-8 items-center">
               <div className="text-2xl">
                  All Notes

               </div>

               <div className="flex gap-3">
                  <Button variant="primary" size="md" startIcon={<ShareIcon size="md" />} text="Share Brain" onclick={shareFunction} />
                  <Button variant="secondary" size="md" startIcon={<PlusIcon size="md" />} text="Add Content" onclick={addContent} />
               </div>
            </div>
         </div>
      </div>
      
   );
}

export default DashBoard;
