import { ChangeEvent, useState } from "react";
import API from "../../../api/API";
import TwitterIcon from "../../Icons/TwitterIcon";
import YouTubeIcon from "../../Icons/YouTubeIcon";
import { Button } from "../Button";
import { InputField } from "../InputField";

interface contentData {
   title: string
   link: string
   type: string
}

interface AddContentModalProps {
   isOpen: boolean
   onClose: () => void
   onContentModified: () => void
}

const AddContentModal = ({ isOpen, onClose, onContentModified }: AddContentModalProps) => {
   const [contentForm, setContentForm] = useState<contentData>({
      title: "",
      link: "",
      type: ""
   });
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setContentForm(prev => ({
         ...prev,
         [name]: value
      }));
   };

   const handleDropdownSelect = (platform: string) => {
      setContentForm(prev => ({
         ...prev,
         type: platform
      }));
      setDropdownOpen(false);
   };

   const addContent = async () => {
      const token = localStorage.getItem("token");
      try {
         await API.post("/content", contentForm, {
            headers: {
               Authorization: token
            }
         })
         onContentModified();
         setContentForm({ title: "", link: "", type: "" })
         onClose();

      } catch (error) {
         console.error("Error while adding Content :", error);
      }
   }

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
         <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
               <h2 className="text-lg font-semibold text-gray-800">Add Your Content</h2>
               <Button text="X" variant="primary" size="sm" onclick={onClose}/>
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

               {/* Custom Dropdown */}
               <div className="relative">
                  <button
                     type="button"
                     onClick={() => setDropdownOpen(!dropdownOpen)}
                     className="w-full text-base px-3 py-2 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-left flex items-center justify-between"
                  >
                     <span className={contentForm.type ? "text-gray-900" : "text-gray-400"}>
                        {contentForm.type ? (contentForm.type === 'twitter' ? 'Twitter' : 'YouTube') : 'Select Platform'}
                     </span>
                     <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                  </button>

                  {dropdownOpen && (
                     <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <button
                           type="button"
                           onClick={() => handleDropdownSelect('twitter')}
                           className="w-full px-3 py-2 text-left hover:bg-blue-50 transition-colors flex items-center gap-2"
                        >
                           <TwitterIcon/>
                           Twitter
                        </button>
                        <button
                           type="button"
                           onClick={() => handleDropdownSelect('youtube')}
                           className="w-full px-3 py-2 text-left hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                           <YouTubeIcon/>
                           YouTube
                        </button>
                     </div>
                  )}
               </div>
            </div>

            <div className="flex gap-2 pt-2">
               <Button
                  variant="primary"
                  size="md"
                  text="Cancel"
                  onclick={onClose}
               />
               <Button
                  variant="secondary"
                  size="md"
                  text="Add Content"
                  onclick={addContent}
               />
            </div>
         </div>
      </div>
   );
};

export default AddContentModal;