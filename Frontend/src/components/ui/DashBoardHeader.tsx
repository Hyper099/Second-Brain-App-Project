import { PlusIcon } from "../Icons/PlusIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import { Button } from "./Button";

const DashBoardHeader = () => {

   function shareFunction() {
      alert("Share button clicked");
   }
   function addContent() {
      alert("content add button clicked");
   }
   return (
      <div className="flex justify-between items-center mb-6">
         <div className="text-2xl font-bold">
            All Notes
         </div>

         <div className="flex gap-4">
            <Button variant="primary" size="md" startIcon={<ShareIcon size="md" />} text="Share Brain" onclick={shareFunction} />
            <Button variant="secondary" size="md" startIcon={<PlusIcon size="md" />} text="Add Content" onclick={addContent} />
         </div>
      </div>
   );
}

export default DashBoardHeader;
