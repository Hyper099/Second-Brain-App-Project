import { useState } from "react";
import { PlusIcon } from "../Icons/PlusIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import { Button } from "./Button";
import AddContentModal from "./Modals/addContentModal";
import ShareContentModal from "./Modals/shareContentModal";

interface DashBoardHeaderProps {
   onContentModified: () => void
}

const DashBoardHeader = (props: DashBoardHeaderProps) => {
   const [addContentModal, setAddContentModal] = useState(false);
   const [shareContentModal, setShareContentModal] = useState(false);

   function shareFunction() {
      setShareContentModal(true);
   }

   function openAddContentModal() {
      setAddContentModal(true);
   }

   const closeAddContentModal = () => {
      setAddContentModal(false);
   }

   const closeShareContentModal = () => {
      setShareContentModal(false);
   }

   return (
      <div className="flex justify-between items-center mb-6 px-4">
         <div className="text-[20px] font-bold">
            All Notes
         </div>

         <div className="flex gap-4">
            <Button
               variant="primary"
               size="md"
               startIcon={<ShareIcon size="md" />}
               text="Share Brain"
               onclick={shareFunction}
            />
            <Button
               variant="secondary"
               size="md"
               startIcon={<PlusIcon size="md" />}
               text="Add Content"
               onclick={openAddContentModal}
            />
         </div>

         <AddContentModal
            isOpen={addContentModal}
            onClose={closeAddContentModal}
            onContentModified={props.onContentModified}
         />

         <ShareContentModal
            isOpen={shareContentModal}
            onClose={closeShareContentModal}
         />
      </div>
   );
}

export default DashBoardHeader;