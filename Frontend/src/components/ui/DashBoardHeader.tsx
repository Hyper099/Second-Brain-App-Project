import { ChangeEvent, useState } from "react";
import API from "../../api/API";
import { PlusIcon } from "../Icons/PlusIcon";
import { ShareIcon } from "../Icons/ShareIcon";
import { Button } from "./Button";
import { InputField } from "./InputField";

interface contentData {
   title: string
   link: string
   type: string
}

interface DashBoardHeaderProps {
   onContentModified: () => void
}

const DashBoardHeader = (props:DashBoardHeaderProps) => {

   const [addContentModal, setAddContentModal] = useState(false);
   const [shareContentModal, setShareContentModal] = useState(false);

   const [contentForm, setContentForm] = useState<contentData>({
      title: "",
      link: "",
      type: ""
   });

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setContentForm(prev => ({
         ...prev,
         [name]:name ==="type" ? value.toLowerCase() : value
      }));
   };

   function shareFunction() {
      setShareContentModal(true);
   }

   function openAddContentModal() {
      setAddContentModal(true);
   }

   const closeAddContentModal = () => {
      setAddContentModal(false);
   }

   const addContent = async () => {
      const token = localStorage.getItem("token");
      try {
         await API.post("/content", contentForm, {
            headers: {
               Authorization: token
            }
         
         })
         props.onContentModified();
         setContentForm({ title: "", link: "", type: "" })
         setAddContentModal(false);

      } catch (error) {
         console.error("Error while adding Content :", error);
      }
   }

   return (
      <div className="flex justify-between items-center mb-6">
         <div className="text-2xl font-bold">
            All Notes
         </div>

         <div className="flex gap-4">
            <Button variant="primary" size="md" startIcon={<ShareIcon size="md" />} text="Share Brain" onclick={shareFunction} />
            <Button variant="secondary" size="md" startIcon={<PlusIcon size="md" />} text="Add Content" onclick={openAddContentModal} />
         </div>

         {addContentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-100/50 backdrop-blur-sm">
               <div className="bg-white w-[700px] h-3/4 rounded-2xl shadow-2xl p-10 flex flex-col gap-6">

                  <div className="flex items-center justify-between mb-4">
                     <h2 className="text-xl font-semibold text-gray-800">Add Your Content</h2>
                     <Button
                        variant="primary"
                        size="sm"
                        text="Close"
                        onclick={closeAddContentModal}
                     />
                  </div>

                  <div className="flex flex-col gap-4">
                     <InputField
                        placeholder="Enter Title"
                        size="md"
                        name="title"
                        value={contentForm.title}
                        onChange={handleChange}
                     />
                     <InputField
                        placeholder="Enter Link"
                        size="md"
                        name="link"
                        value={contentForm.link}
                        onChange={handleChange}
                     />
                     <InputField
                        placeholder="Enter Type : (Twitter or Youtube)"
                        size="md"
                        name="type"
                        value={contentForm.type}
                        onChange={handleChange}
                     />
                  </div>

                  <div className="mt-auto flex justify-end">
                     <Button
                        variant="secondary"
                        size="md"
                        text="Add"
                        onclick={addContent}
                     />
                  </div>
               </div>
            </div>
         )}


         {shareContentModal && (
            <div className="modal">
               {/* Modal content for sharing content */}
            </div>
         )}
      </div>
   );
}

export default DashBoardHeader;
